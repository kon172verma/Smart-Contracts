import React from 'react';
import web3 from '../web3';

class Index extends React.Component{
    render() {
        return (
            <>Hello, this is the test page for now. Web3 version: {web3.version} </>
        );
    }
}

export default Index;