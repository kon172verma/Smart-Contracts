const fs = require('fs-extra');
const path = require('path');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const contractPath = path.resolve(__dirname, 'contracts', 'campaign.sol');
const contractCode = fs.readFileSync(contractPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'campaign.sol': {
            content: contractCode,
        },
    },
    settings: {
        outputSelection: { '*': { '*': ['*'] } },
    },
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['campaign.sol'];
console.log(output);
fs.ensureDirSync(buildPath);


