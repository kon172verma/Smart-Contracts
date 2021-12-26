const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const { abi, evm } = require('../compile');

let accounts, contract;

describe('Lottery Contract Tests', () => {

    beforeEach( async() => {
        accounts = await web3.eth.getAccounts();
        contract = await new web3.eth.Contract(abi)
            .deploy({data: evm.bytecode.object})
            .send({from: accounts[0], gas: '1000000'});
    });

    it('Contract Deployment', () => {
        assert.ok(contract.options.address);
    });

    it('Single Participant Enters', async () => {
        await contract.methods.participate().send({
            from: accounts[0],
            value: web3.utils.toWei('0.01', 'ether'), 
        });
        const participants = await contract.methods.viewParticipants().call({
            from: accounts[0]
        });
        assert.equal(participants.length, 1);
        assert.equal(participants[0], accounts[0]);
    });

});
