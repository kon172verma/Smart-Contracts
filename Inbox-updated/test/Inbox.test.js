const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const assert = require('assert');

const { abi, evm } = require('../compile');

let accounts, inbox;
const initialMessage = 'Created by: Konark Verma';

beforeEach( async() => {
    accounts = await web3.eth.getAccounts();
    inbox = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object, arguments: [initialMessage] })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox.sol', () => {

    it('Contract deployment', () => {
        assert.ok(inbox.options.address);
    });

    it('Initial Message Update', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, initialMessage);
    });

    it('Message Update', async () => {
        const updateMessage = 'This is a test update message';
        await inbox.methods.setMessage(updateMessage)
            .send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, updateMessage);
    });

});