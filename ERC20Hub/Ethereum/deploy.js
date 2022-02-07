const fs = require('fs');
const path = require('path');
const contractCode = require('./build/ERC20Hub.json');

const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const provider = new HDWalletProvider(
    'lawn trap weapon volume practice swift version length lab reflect nose flag',
    'https://rinkeby.infura.io/v3/3ed112ee6c4d42a09e485ddb5eec5fa1'
)
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Trying to deploy ERC20Hub contract from account: ', accounts[0]);
    const contract = await new web3.eth.Contract(contractCode.contracts.ERC20Hub.abi)
        .deploy({ data: contractCode.contracts.ERC20Hub.evm.bytecode.object })
        .send({ from: accounts[0], gas: 1000000 });
    console.log('Contract deployed to: ', contract.options.address);
    provider.engine.stop();

    const addressPath = path.resolve(__dirname, 'build', 'ERC20HubAddress.json');
    fs.writeFile(addressPath, JSON.stringify({'address': contract.options.address}, undefined, 4), (err) => {
        if (err) throw err;
    });
}
deploy();