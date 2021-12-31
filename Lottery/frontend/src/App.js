import React from 'react';
import web3 from './lib/web3';

class App extends React.Component {
  render() {
    console.log(web3.version);
    return (
      <h2>Lottery Contract.!</h2>
    );
  }
}

export default App;