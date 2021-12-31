import React from 'react';
import web3 from './lib/web3';
import contract from './lib/contract';

class App extends React.Component {
  state = {
    owner: "",
    poolAmount: '',
    participants: []
  };

  async componentDidMount() {
    const owner = await contract.methods.owner().call();
    const participants = await contract.methods.viewParticipants().call();
    const poolAmount = web3.utils.fromWei(await web3.eth.getBalance(contract.options.address));
    this.setState({ owner, poolAmount, participants });
  }

  render() {
    return (
      <>
        <h2>Lottery Contract.!</h2>
        <p>This contract is owned by: {this.state.owner}</p>
        <p>Number of participants competing in the lottery: {this.state.participants.length}</p>
        <p>Current pool amount for grab: {this.state.poolAmount} Ether</p>
      </>
    );
  }
}

export default App;