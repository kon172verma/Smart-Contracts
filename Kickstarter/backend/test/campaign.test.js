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
        await hubContract.methods.createCampaign('100', '80')
            .send({ from: accounts[0], gas: '3000000' });
        [campaignAddress] = await hubContract.methods.getCampaigns().call();
        assert.ok(campaignAddress);
    });

    it('Deploying multiple new Campaign Contracts', async () => {
        for (let i = 0; i < 5; i++)
            await hubContract.methods.createCampaign('100', '80')
                .send({ from: accounts[0], gas: '3000000' });
        const campaignAddresses = await hubContract.methods.getCampaigns().call();
        assert.equal(campaignAddresses.length, 5);
        for (let i = 0; i < 5; i++) assert.ok(campaignAddresses[i]);
    });

});


describe('Test: Deployed Campaign Contract', () => {

    let accounts, hubContract, campaignAddress, campaignContract;
    let owner, approvalAmount, minVotingPercentage;
    
    beforeEach( async () => {
        accounts = await web3.eth.getAccounts();
        hubContract = await new web3.eth.Contract(CampaignHub.abi)
            .deploy({ data: CampaignHub.evm.bytecode.object })
            .send({ from: accounts[0], gas: '3000000' });
        owner = accounts[1];
        approvalAmount = '1000';
        minVotingPercentage = '75';
        await hubContract.methods.createCampaign(approvalAmount, minVotingPercentage)
            .send({ from: owner, gas: '3000000' });
        [campaignAddress] = await hubContract.methods.getCampaigns().call();
        campaignContract = await new web3.eth.Contract(Campaign.abi, campaignAddress);
    });
    
    it('Initial Values Check - Deployed Campaign Contract', async () => {
        const campaignOwner = await campaignContract.methods.owner().call();
        const campaignApprovalAmount = await campaignContract.methods.approvalAmount().call();
        const campaignVotingPercentage = await campaignContract.methods.minVotingPercentage().call();
        const campaignApproversCount = await campaignContract.methods.approversCount().call();
        const campaignContributorsCount = await campaignContract.methods.contributorsCount().call();
        const campaignRequestsCount = await campaignContract.methods.requestsCount().call();
        assert.equal(campaignOwner, owner);
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

    it.only('Become Approver', async() => {
        await campaignContract.methods.contribute().send({ from: accounts[2], value: '1500' });
        const contribution = await campaignContract.methods.contributors(accounts[2]).call();
        console.log(approvalAmount, contribution);
        await campaignContract.methods.becomeApprover().call();
        const isApprover = await campaignContract.methods.approvers(accounts[2]).call();
        console.log(isApprover);
        assert(isApprover);
        const approversCount = await campaignContract.methods.approversCount().call();
        assert.equal(approversCount, 1);
        
    });

    // it('Revoke Approver', () => {
        
    // });

});