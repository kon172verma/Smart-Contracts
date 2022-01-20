import React from 'react';
import Layout from '../components/Layout';
import CampaignCard from '../components/CampaignCard';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

class Home extends React.Component{
    // static async getInitialProps() {
        
    // }
    render() {
        return (
            <Layout>
                <Container>
                    <Typography variant='h5' component='div' align='center' sx={{padding:'15px', color:'gray'}} >
                        Current Campaigns
                    </Typography>
                    <CampaignCard/>
                    <CampaignCard/>
                    <CampaignCard/>
                </Container>
            </Layout>
        );
    }
}

export default Home;