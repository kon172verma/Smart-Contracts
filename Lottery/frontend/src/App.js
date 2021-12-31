import React from 'react';
import web3 from './lib/web3';
import contract from './lib/contract';

class App extends React.Component {
  state = {
    owner: "",
    participants: []
  }

  async componentDidMount() {
    const owner = await contract.methods.owner().call();
    const participants = await contract.methods.viewParticipants().call();
    this.setState({ owner, participants })
  }

  render() {
    return (
      <>
        <h2>Lottery Contract.!</h2>
        <p>This contract is owned by: {this.state.owner}</p>
        <p>Number of participants competing for the pool amount: {this.state.participants.length}</p>
      </>
    );
  }
}

export default App;