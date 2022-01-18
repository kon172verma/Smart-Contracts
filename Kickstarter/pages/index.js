import React from 'react';
import web3 from '../web3';
import instance from '../instance';

class Index extends React.Component{

    static async getInitialProps(){
        const campaigns = await instance.methods.getCampaigns().call();
        return { campaigns };
    }

    render() {
        return (
            <>
                <p>Hello, this is the test page for now.</p>
                <p>Web3 version: {web3.version}</p>
                <p>List of all the running campaigns: {this.props.campaigns} </p>
            </>
        );
    }
}

export default Index;