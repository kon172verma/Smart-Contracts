import web3 from './web3';
import contractCode from './build/ERC20Hub.json';
import contractAddress from './build/ERC20HubAddress.json';

const instance = new web3.eth.Contract(contractCode.contracts.ERC20Hub.abi, contractAddress.address);
export default instance;