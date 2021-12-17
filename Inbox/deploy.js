const hdWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new hdWalletProvider(
    'lawn trap weapon volume practice swift version length lab reflect nose flag',
    'https://rinkeby.infura.io/v3/3ed112ee6c4d42a09e485ddb5eec5fa1'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy using account: ', accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi.! This is just an initial value.'] })
        .send({ gas: '1000000', from: accounts[0] });
    console.log('Contract has been deployed to: ', result.options.address);
    provider.engine.stop();
};
deploy();
