import React from 'react';
import web3 from './lib/web3';
import contract from './lib/contract';

class App extends React.Component{
  state = {
    owner: '',
    participants: [],
    poolAmount: '-',
    value: '0',
    message: '',
  }

  async componentDidMount() {
    const owner = await contract.methods.owner().call();
    const participants = await contract.methods.viewParticipants().call();
    const poolAmount = web3.utils.fromWei(await web3.eth.getBalance(contract.options.address));
    this.setState({ owner, participants, poolAmount });
  }

  onSubmit = async(event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({message: 'Entering you to the contract...'})
    await contract.methods.participate().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    })
    this.setState({value:'0', message: 'You have successfully entered.!'})
  };

  pickWinner = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({message: 'Picking winner...'})
    await contract.methods.pickWinner().send({
      from: accounts[0]
    });
    this.setState({message: 'Winner has been picked!'})
  }

  render() {
    return (
      <>
        <h2>Smart Ethereum Lottery Contract</h2>
        <p>This contract is owned by: {this.state.owner}</p>
        <p>Number of participants competing in the lottery: {this.state.participants.length}</p>
        <p>Current pool amount for grab: {this.state.poolAmount} Ether</p>
        <hr />

        <form onSubmit={this.onSubmit}>
          <h3>Wanna try your luck?</h3>
          <label>Enter Lottery </label>
          <br/>
          <input
            value={this.state.value}
            onChange={(event) => {
              this.setState({ value: event.target.value })
            }}
          />
          <button type='submit'>Enter</button>
        </form>

        <hr />
        <h3>Time to pick winner?</h3>
        <button onClick={this.pickWinner}>Pick Winner</button>

        <hr />
        <p>{this.state.message}</p>

      </>
    )
  }
}

export default App;