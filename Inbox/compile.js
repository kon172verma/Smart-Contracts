// Importing the required libraries.
const path = require('path');
const fs = require('fs');
const solc = require('solc');

// Fetching the raw source code for our contract.
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

// console.log(solc.compile(source, 1));

// Exporting the compiled information for our contract.
module.exports = solc.compile(source, 1).contracts[':Inbox'];