const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

// beforeEach(() => {
//     web3.eth.getAccounts().then(fetchedAccounts => {
//         console.log(fetchedAccounts);
//     });
// });

let accounts;
const initialMessage = 'Hi.! This is just initial message.'
beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    contract = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode,
            arguments: [initialMessage]
        })
        .send({
            from: accounts[0],
            gas: '1000000'
        });
});

describe('Inbox Smart Contract', () => {

    it('Contract deployed successfully', () => { 
        assert(contract.options.address);
    });

    it('Contract has correct initial message', async() => {
        const message = await contract.methods.message().call();
        assert(message, initialMessage);
    })

    it('Message updated successfully', async () => {
        const message = 'This is the updated message.';
        await contract.methods.setMessage(message).send({ from: accounts[0] });
        const updatedMessage = contract.methods.message().call();
        assert(updatedMessage, message);
    })

});