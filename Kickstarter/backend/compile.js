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
        outputSelection: { '*': { '*': ["abi", "evm.bytecode.object"] } },
    },
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['campaign.sol'];
fs.ensureDirSync(buildPath);

for (const contract in output) {
    const outputPath = path.resolve(buildPath, contract+'.json');
    fs.writeFileSync(outputPath, JSON.stringify(output[contract], null, 4));
}
