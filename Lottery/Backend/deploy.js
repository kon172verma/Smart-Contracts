const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const provider = new HDWalletProvider(
    'lawn trap weapon volume practice swift version length lab reflect nose flag',
    'https://rinkeby.infura.io/v3/3ed112ee6c4d42a09e485ddb5eec5fa1'
);
const web3 = new Web3(provider);

const { abi, evm } = require('./compile');
const fs = require('fs');
const path = require('path');

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy using account: ', accounts[0]);
    const contract = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object })
        .send({ from: accounts[0], gas: '1000000' });
    console.log('Contract has been deployed to: ', contract.options.address);
    provider.engine.stop();
}

deploy();

const ABIpath = path.resolve(__dirname, 'abi', 'ABI.json');
console.log('Writing ABI to: ', ABIpath);
fs.writeFile(ABIpath, JSON.stringify(abi, undefined, 4), (err) => {
    if (err) throw err;
});
