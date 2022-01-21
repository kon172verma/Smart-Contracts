import React from 'react';
import Layout from '../components/Layout';
import CampaignCard from '../components/CampaignCard';
import { Container, Typography } from '@mui/material';

import web3 from '../web3';
import instance from '../instance';
import Campaign from '../build/Campaign.json';

class Home extends React.Component{
    static async getInitialProps() {
        const addresses = await instance.methods.getCampaigns().call();
        const campaigns = await Promise.all(addresses.map(async(address) => {
            const contract = await new web3.eth.Contract(Campaign.abi, address);
            return {[address]: await contract.methods.summarize().call()};
        }));
        return { campaigns };
    }
    render() {
        return (
            <Layout>
                <Container>
                    <Typography variant='h5' component='div' align='center' sx={{padding:'20px 30px 0 30px', color:'gray'}} >
                        Current Campaigns
                    </Typography>
                    {Object.keys(this.props.campaigns).map((index) => {
                        return (
                            <CampaignCard campaign={this.props.campaigns[index]} key={index}/>
                        )
                    })}
                </Container>
            </Layout>
        );
    }
}

export default Home;