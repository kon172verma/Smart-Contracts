import web3 from 'web3';
import contract from './build/CampaignHub.json';
import address from './build/campaignHubAddress.json';

const instance = new web3.eth.Contract(contract.abi, address.campaignHubAddress);
export default instance;