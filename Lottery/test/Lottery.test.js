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

    it('Contract Owner equals Deployer', async () => {
        const owner = await contract.methods.owner().call();
        assert.equal(owner, accounts[0]);
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

    it('Multiple Participants Enter', async () => {
        for (let i = 0; i < 4; i++) {
            await contract.methods.participate().send({
                from: accounts[i],
                value: web3.utils.toWei('0.02', 'ether')
            });
        }
        const participants = await contract.methods.viewParticipants().call();
        assert.equal(participants.length, 4);
        for (let i = 0; i < participants.length; i++) {
            assert.equal(participants[i],accounts[i]);
        }
    });

    // it('Pool Amount equals Participated Amount', async () => {
    //     let amount = 0;
    //     for (let i = 0; i < 5; i++){
    //         value = (Math.floor(Math.random() * 1000) + 1) / 100;
    //         amount += value;
    //         console.log(value, amount);
    //         contract.methods.participate().send({
    //             from: accounts[i],
    //             value: web3.utils.toWei(value.toString(), 'ether')
    //         })
    //     }
    //     const poolAmount = contract.methods.viewBalance().call();
    //     assert.equal(amount, web3.utils.fromWei(poolAmount,'ether'));
    // });

    it('Participation Amount not enough', async () => {
        try{
            await contracts.methods.participate().send({
                from: accounts[0],
                value: web3.utils.toWei('0.001', 'ether')
            });
            assert(false);
        } catch(error) {
            assert(error);
        }
    });

    it('Only manager can Pick Winner', async () => {
        try {
            await contracts.methods.pickWinner().send({
                from: accounts[1]
            });
            assert(false);
        } catch(error) {
            assert(error);
        }
    });

    it('Send Pool Amount to Winner', async () => {
        const initialBalance = await web3.eth.getBalance(accounts[1]);
        await contract.methods.participate().send({
            from: accounts[1],
            value: web3.utils.toWei('1', 'ether')
        });
        await contract.methods.pickWinner().send({
            from: accounts[0]
        });
        const updatedBalance = await web3.eth.getBalance(accounts[1]);
        assert(initialBalance - updatedBalance < web3.utils.toWei('0.1', 'ether'));
    });

});
