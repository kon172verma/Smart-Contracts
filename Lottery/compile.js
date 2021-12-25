const fs = require('fs');
const path = require('path');
const solc = require('solc');

const contractPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const contractCode = fs.readFileSync(contractPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'Lottery.sol': {
            content: contractCode,
        },
    },
    settings: {
    outputSelection: {
        '*': {
        '*': ['*'],
        },
    },
    },
};

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Lottery.sol'].Lottery;