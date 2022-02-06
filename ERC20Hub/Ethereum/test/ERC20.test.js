const Web3 = require('web3');
const ganache = require('ganache-cli');
const web3 = new Web3(ganache.provider());
const assert = require('assert');

describe('Test: ERC20',()=>{

    beforeEach(async()=>{
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
    });

    it('Printing some bullshit',()=>{
        console.log('Some bullshit.!');
    });

});