import React from "react";
import Layout from "../components/Layout";
import { Container, Typography } from "@mui/material";

class newCampaign extends React.Component{
    render() {
        return (
            <Layout>
                <Container>
                    <Typography variant='h5' component='div' align='center' sx={{ padding: '20px 30px 0 30px', color: 'gray' }} >
                        Create New Campaign
                    </Typography>
                </Container>
            </Layout>
        );
    }
}

export default newCampaign;