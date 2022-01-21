const Web3 = require('web3');
const ganache = require('ganache-cli');
const web3 = new Web3(ganache.provider());

const assert = require('assert');
const CampaignHub = require('../build/CampaignHub.json');
const Campaign = require('../build/Campaign.json');


describe('Test: CampaignHub Smart Contract', () => {
    
    let accounts, hubContract;
    beforeEach( async() => {
        accounts = await web3.eth.getAccounts();
        hubContract = await new web3.eth.Contract(CampaignHub.abi)
            .deploy({ data: CampaignHub.evm.bytecode.object })
            .send({ from: accounts[0], gas: '3000000' });
    });

    it('Deploying CampaignHub Smart Contract', () => {
        assert.ok(hubContract.options.address);
    });

    it('Deploying new Campaign Contract', async() => {
        let campaignAddress;
        await hubContract.methods.createCampaign('title', 'desc', '100', '80')
            .send({ from: accounts[0], gas: '3000000' });
        [campaignAddress] = await hubContract.methods.getCampaigns().call();
        assert.ok(campaignAddress);
    });

    it('Deploying multiple new Campaign Contracts', async () => {
        for (let i = 0; i < 5; i++)
            await hubContract.methods.createCampaign('title', 'desc', '100', '80')
                .send({ from: accounts[0], gas: '3000000' });
        const campaignAddresses = await hubContract.methods.getCampaigns().call();
        assert.equal(campaignAddresses.length, 5);
        for (let i = 0; i < 5; i++) assert.ok(campaignAddresses[i]);
    });

});


describe('Test: Deployed Campaign Contract', () => {

    let accounts, hubContract, campaignAddress, campaignContract;
    let owner, approvalAmount, minVotingPercentage;
    
    beforeEach(async () => {
        accounts = await web3.eth.getAccounts();
        hubContract = await new web3.eth.Contract(CampaignHub.abi)
            .deploy({ data: CampaignHub.evm.bytecode.object })
            .send({ from: accounts[0], gas: '3000000' });
        owner = accounts[1];
        approvalAmount = 1000;
        minVotingPercentage = 75;
        await hubContract.methods.createCampaign('title', 'desc', approvalAmount, minVotingPercentage)
            .send({ from: owner, gas: '3000000' });
        [campaignAddress] = await hubContract.methods.getCampaigns().call();
        campaignContract = await new web3.eth.Contract(Campaign.abi, campaignAddress);
    });
    
    it('Initial Values Check - Deployed Campaign Contract', async () => {
        const campaignOwner = await campaignContract.methods.owner().call();
        const campaignTitle = await campaignContract.methods.campaignTitle().call();
        const campaignDescription = await campaignContract.methods.campaignDescription().call();
        const campaignApprovalAmount = await campaignContract.methods.approvalAmount().call();
        const campaignVotingPercentage = await campaignContract.methods.minVotingPercentage().call();
        const campaignApproversCount = await campaignContract.methods.approversCount().call();
        const campaignContributorsCount = await campaignContract.methods.contributorsCount().call();
        const campaignRequestsCount = await campaignContract.methods.requestsCount().call();
        assert.equal(campaignOwner, owner);
        assert.equal(campaignTitle, 'title');
        assert.equal(campaignDescription, 'desc');
        assert.equal(campaignApprovalAmount, approvalAmount);
        assert.equal(campaignVotingPercentage, minVotingPercentage);
        assert.equal(campaignApproversCount, 0);
        assert.equal(campaignContributorsCount, 0);
        assert.equal(campaignRequestsCount, 0);
    });

    it('Make Contribution', async () => {
        await campaignContract.methods.contribute().send({ from: accounts[2], value: 10 });
        await campaignContract.methods.contribute().send({ from: accounts[3], value: 100 });
        await campaignContract.methods.contribute().send({ from: accounts[3], value: 200 });
        const contributorsCount = await campaignContract.methods.contributorsCount().call();
        assert.equal(contributorsCount, 2);
        let contribution = await campaignContract.methods.contributors(accounts[2]).call();
        assert.equal(contribution, 10);
        contribution = await campaignContract.methods.contributors(accounts[3]).call();
        assert.equal(contribution, 300);
    });

    it('Become Approver, Contribution >= ApprovalAmount', async () => {
        await campaignContract.methods.contribute().send({ from: accounts[2], value: 1000 });
        await campaignContract.methods.becomeApprover().send({ from: accounts[2] });
        const isApprover = await campaignContract.methods.approvers(accounts[2]).call();
        assert(isApprover);
        const approversCount = await campaignContract.methods.approversCount().call();
        assert.equal(approversCount, 1);
    });

    it('Become Approver, Contribution < ApprovalAmount', async () => {
        await campaignContract.methods.contribute().send({ from: accounts[2], value: 100 });
        try {
            await campaignContract.methods.becomeApprover().send({ from: accounts[2] });
            assert(false);
        } catch (error) {
            assert(error);
            const isApprover = await campaignContract.methods.approvers(accounts[2]).call();
            assert(!isApprover);
            const approversCount = await campaignContract.methods.approversCount().call();
            assert.equal(approversCount, 0);
        }
    });

    it('Revoke Approver, Is an approver', async () => {
        await campaignContract.methods.contribute().send({ from: accounts[2], value: 15000 });
        await campaignContract.methods.becomeApprover().send({ from: accounts[2] });
        let isApprover = await campaignContract.methods.approvers(accounts[2]).call();
        assert(isApprover);
        let approversCount = await campaignContract.methods.approversCount().call();
        assert.equal(approversCount, 1);
        await campaignContract.methods.revokeApprover().send({ from: accounts[2] });
        isApprover = await campaignContract.methods.approvers(accounts[2]).call();
        assert(!isApprover);
        approversCount = await campaignContract.methods.approversCount().call();
        assert.equal(approversCount, 0);
    });

    it('Revoke Approver, Is not an approver', async () => {
        try {
            await campaignContract.methods.revokeApprover().send({ from: accounts[2] });
            assert(false);
        } catch (error) {
            assert(error);
        }
    });

    it('Add Request - Campaign owner', async () => {
        await campaignContract.methods.addRequest('Payment for buying batteries', 'payment', 100, accounts[2]).send({ from: accounts[1], gas: '300000' });
        const requestsCount = await campaignContract.methods.requestsCount().call();
        assert.equal(requestsCount, 1);
        const request = await campaignContract.methods.requests(0).call();
        assert.equal(request.requestTitle, 'Payment for buying batteries');
        assert.equal(request.requestDescription, 'payment');
        assert.equal(request.value, 100);
        assert.equal(request.recepient, accounts[2]);
    });

    it('Add Request - Not campaign owner', async () => {
        try {
            await campaignContract.methods.addRequest('Payment for buying batteries', 'payment', 100, accounts[3]).send({ from: accounts[2], gas: '300000' });
            assert(false);
        } catch (error) {
            assert(error);
        }
        const requestsCount = await campaignContract.methods.requestsCount().call();
        assert.equal(requestsCount, 0);
    });

    it('Approve Request - Approver', async () => {
        await campaignContract.methods.addRequest('Payment for buying batteries', 'payment', 100, accounts[2]).send({ from: accounts[1], gas: '300000' });
        await campaignContract.methods.contribute().send({ from: accounts[3], value: 1000 });
        await campaignContract.methods.becomeApprover().send({ from: accounts[3] });
        await campaignContract.methods.contribute().send({ from: accounts[4], value: 2000 });
        await campaignContract.methods.becomeApprover().send({ from: accounts[4] });
        await campaignContract.methods.contribute().send({ from: accounts[5], value: 3000 });
        await campaignContract.methods.becomeApprover().send({ from: accounts[5] });
        await campaignContract.methods.contribute().send({ from: accounts[6], value: 3000 });
        await campaignContract.methods.becomeApprover().send({ from: accounts[6] });
        await campaignContract.methods.approveRequest(0, 1).send({ from: accounts[3] });
        await campaignContract.methods.approveRequest(0, 1).send({ from: accounts[4] });
        await campaignContract.methods.approveRequest(0, 2).send({ from: accounts[5] });
        await campaignContract.methods.approveRequest(0, 3).send({ from: accounts[6] });
        const request = await campaignContract.methods.requests(0).call();
        assert.equal(request.yesCount, 2);
        assert.equal(request.noCount, 1);
        assert.equal(request.votesCount, 4);
    });

    it('Approve Request - Not Approver', async () => {
        await campaignContract.methods.addRequest('Payment for buying batteries', 'payment', 100, accounts[2]).send({ from: accounts[1], gas: '300000' });
        try {
            await campaignContract.methods.approveRequest(0, 1).send({ from: accounts[3] });
            assert(false);
        } catch (error) {
            assert(error);
        }
    });

    it('Finalize Request - Approver', async () => {
        await campaignContract.methods.addRequest('Payment for buying batteries', 'payment', 100, accounts[2]).send({ from: accounts[1], gas: '300000' });
        await campaignContract.methods.contribute().send({ from: accounts[3], value: 1000 });
        await campaignContract.methods.becomeApprover().send({ from: accounts[3] });
        await campaignContract.methods.contribute().send({ from: accounts[4], value: 2000 });
        await campaignContract.methods.becomeApprover().send({ from: accounts[4] });
        await campaignContract.methods.contribute().send({ from: accounts[5], value: 3000 });
        await campaignContract.methods.becomeApprover().send({ from: accounts[5] });
        await campaignContract.methods.contribute().send({ from: accounts[6], value: 3000 });
        await campaignContract.methods.becomeApprover().send({ from: accounts[6] });
        await campaignContract.methods.approveRequest(0, 1).send({ from: accounts[3] });
        await campaignContract.methods.approveRequest(0, 1).send({ from: accounts[4] });
        await campaignContract.methods.approveRequest(0, 2).send({ from: accounts[5] });
        await campaignContract.methods.finalizeRequest(0).send({ from: accounts[1], gas: '100000' });
        const request = await campaignContract.methods.requests(0).call();
        assert(request.complete);
        try {
            await campaignContract.methods.finalizeRequest(0).send({ from: accounts[1], gas: '100000' });
            assert(false);
        } catch (error) {
            assert(error);
        }
    });

    it('Finalize Request - Not Approver', async () => {
        await campaignContract.methods.addRequest('Payment for buying batteries', 'payment', 100, accounts[2]).send({ from: accounts[1], gas: '300000' });
        try {
            await campaignContract.methods.finalizeRequest(0).send({ from: accounts[2], gas: '100000' });
            assert(false);
        } catch (error) {
            assert(error);
        }
    });
});