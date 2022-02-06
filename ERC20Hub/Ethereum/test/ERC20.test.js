const Web3 = require('web3');
const ganache = require('ganache-cli');
const web3 = new Web3(ganache.provider());
const assert = require('assert');
const compiledContract = require('../build/ERC20Hub.json');

describe('Test: ERC20', () => {

    let accounts, contract;
    let name, symbol, decimals, totalSupply;

    beforeEach(async () => {
        accounts = await web3.eth.getAccounts();
        [name, symbol, decimals, totalSupply] = ['Konark', 'CON', 18, 3000000];
        contract = await new web3.eth.Contract(compiledContract.contracts.ERC20.abi)
            .deploy({
                data: compiledContract.contracts.ERC20.evm.bytecode.object,
                arguments: [name, symbol, decimals, totalSupply, accounts[0]]
            })
            .send({
                from: accounts[0],
                gas: '3000000'
            });
    });

    it('Checking Initial Values', async () => {
        const tokenName = await contract.methods.name().call();
        const tokenSymbol = await contract.methods.symbol().call();
        const tokenDecimals = await contract.methods.decimals().call();
        const tokenTotalSupply = await contract.methods.totalSupply().call();
        assert.equal(tokenName, name);
        assert.equal(tokenSymbol, symbol);
        assert.equal(tokenDecimals, decimals);
        assert.equal(tokenTotalSupply, totalSupply);
    });

    it('Checking Owner\'s Balance', async () => {
        const balance = await contract.methods.balanceOf(accounts[0]).call();
        assert.equal(balance, totalSupply);
    });

    it('Checking Transfer b/w Accounts', async () => {
        const amount = 1000000;
        await contract.methods.transfer(accounts[1], amount).send({ from: accounts[0] });
        const balanceAccount0 = await contract.methods.balanceOf(accounts[0]).call();
        const balanceAccount1 = await contract.methods.balanceOf(accounts[1]).call();
        assert.equal(balanceAccount0, totalSupply-amount);
        assert.equal(balanceAccount1, amount);
    });

    it('Checking Approval, Allowance', async () => {
        const amount = 1000000;
        await contract.methods.approve(accounts[1], amount).send({ from: accounts[0] });
        const allowed = await contract.methods.allowance(accounts[0], accounts[1]).call();
        assert.equal(allowed, amount);
    });

    it('Checking TransferFrom - when Approved', async () => {
        await contract.methods.approve(accounts[1], 1000000).send({ from: accounts[0] });
        let allowed = await contract.methods.allowance(accounts[0], accounts[1]).call();
        assert.equal(allowed, 1000000);
        await contract.methods.transferFrom(accounts[0], accounts[2], 700000).send({ from: accounts[1] });
        let balance = await contract.methods.balanceOf(accounts[2]).call();
        allowed = await contract.methods.allowance(accounts[0], accounts[1]).call(); 
        assert.equal(allowed, 300000);
        assert.equal(balance, 700000);
        try {
            await contract.methods.transferFrom(accounts[0], accounts[2], 700000).send({ from: accounts[1] });
            assert(false);
        } catch (error) {
            assert(error);
        }
    });

    it('Checking TransferFrom - when not Approved', async () => {
        try {
            await contract.methods.transferFrom(accounts[0], accounts[2], 700000).send({ from: accounts[1] });
            assert(false);
        } catch (error) {
            assert(error);
        }
    });
});

describe('Test: ERC20Hub', () => {

    let accounts, contract;
    beforeEach(async () => {
        accounts = await web3.eth.getAccounts();
        contract = await new web3.eth.Contract(compiledContract.contracts.ERC20Hub.abi)
            .deploy({ data: compiledContract.contracts.ERC20Hub.evm.bytecode.object })
            .send({ from: accounts[0], gas: '3000000' });
    });

    it('Creating new ERC20 Token', async () => {
        const [name, symbol, decimals, totalSupply] = ['Konark', 'CON', 18, 3000000];
        await contract.methods.createERC20Token(name, symbol, decimals, totalSupply)
            .send({ from: accounts[0], gas: '1000000' });
        const tokenAddresses = await contract.methods.viewERC20Tokens().call();
        assert.equal(tokenAddresses.length, 1);
    });

        it('Checking new ERC20 contract', async () => {
        const [name, symbol, decimals, totalSupply] = ['Konark', 'CON', 18, 3000000];
        await contract.methods.createERC20Token(name, symbol, decimals, totalSupply)
            .send({ from: accounts[0], gas: '1000000' });
        const tokenAddresses = await contract.methods.viewERC20Tokens().call();
            
        const tokenContract = await new web3.eth.Contract(compiledContract.contracts.ERC20.abi, tokenAddresses[0]);
        const tokenName = await tokenContract.methods.name().call();
        const tokenSymbol = await tokenContract.methods.symbol().call();
        const tokenDecimals = await tokenContract.methods.decimals().call();
        const tokenTotalSupply = await tokenContract.methods.totalSupply().call();
        const balance = await tokenContract.methods.balanceOf(accounts[0]).call();
        assert.equal(tokenName, name);
        assert.equal(tokenSymbol, symbol);
        assert.equal(tokenDecimals, decimals);
        assert.equal(tokenTotalSupply, totalSupply);
        assert.equal(balance, 3000000);
    });

});