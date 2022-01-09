const Web3 = require('web3');
const ganache = require('ganache-cli');
const web3 = new Web3(ganache.provider());

const assert = require('assert');
const CampaignHub = require('../build/CampaignHub.json');


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

});