import web3 from "./web3";
import { abi, address } from './abi/ABI.json';

export default new web3.eth.Contract(abi, address);