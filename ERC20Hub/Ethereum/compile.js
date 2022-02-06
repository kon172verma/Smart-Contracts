const fs = require('fs-extra');
const path = require('path');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const contractPath = path.resolve(__dirname, 'contracts', 'ERC20Hub.sol');
const contractCode = fs.readFileSync(contractPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'ERC20Hub': {
            content: contractCode,
        },
    },
    settings: {
        outputSelection: { '*': { '*': ['abi', 'evm.bytecode.object'] } },
    },
};

// console.log(input);

const output = JSON.parse(solc.compile(JSON.stringify(input)))
fs.ensureDirSync(buildPath);

console.log(output);

// for(const contract in output){
//     console.log(contract);
// }