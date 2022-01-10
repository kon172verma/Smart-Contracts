const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const provider = new HDWalletProvider(
    'lawn trap weapon volume practice swift version length lab reflect nose flag',
    'https://rinkeby.infura.io/v3/3ed112ee6c4d42a09e485ddb5eec5fa1'
);
const web3 = new Web3(provider);

const campaignHub = require('./build/CampaignHub.json');

const fs = require('fs');
const path = require('path');

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Trying to deploy CampaignHub contract from account: ', accounts[0]);
    const contract = await new web3.eth.Contract(campaignHub.abi)
        .deploy({ data: campaignHub.evm.bytecode.object })
        .send({ from: accounts[0], gas: '3000000' });
    console.log('Contract deployed to: ', contract.options.address);
    provider.engine.stop();

    const addressPath = path.resolve(__dirname, 'build', 'campaignHubAddress.json');
    fs.writeFile(addressPath, JSON.stringify({'campaignHubAddress': contract.options.address}, undefined, 4), (err) => {
        if (err) throw err;
    });
}

deploy();