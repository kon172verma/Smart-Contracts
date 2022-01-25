import { Container, Typography, Grid } from '@mui/material';
import React from 'react';
import Layout from '../components/Layout';

class Campaign extends React.Component{
    render() {
        return (
            <Layout>
                <Container>
                    <Typography variant='h5' align='center' sx={{ mt:2, padding: '20px 30px 0 30px' }} >
                        JOY: A healthy conversation about race
                    </Typography>
                    <Typography variant='subtitle1' align='center' color='text.secondary' sx={{ m:2 }}>
                        This is a book about a little girl who asks her dad about race. They talk about its origins and how her Blackness can be joyful. This is a book about a little girl who asks her dad about race. They talk about its origins and how her Blackness can be joyful. This is a book about a little girl who asks her dad about race. They talk about its origins and how her Blackness can be joyful.
                    </Typography>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 5, sm: 5, md: 5 }} sx={{p:3}}>
                        <Grid item xs={6}>Owner:  0xC611111cBB2Cb882D58A2c25f143A7Bd0F47ee9e</Grid>
                        <Grid item xs={6}>Money Raised:  0</Grid>
                        <Grid item xs={6}>Contributors:  0</Grid>
                        <Grid item xs={6}>Approvers:  0</Grid>
                        <Grid item xs={6}>Approval Amount:  2000</Grid>
                        <Grid item xs={6}>Request Voting Percentage:  75</Grid>
                        <Grid item xs={6}>Contract Address:  0x7206980B2cD40a98f57AB79902BC0f6385F27ed0</Grid>
                        <Grid item xs={6}>Approvers:  0</Grid>
                    </Grid>
                </Container>
            </Layout>
        );
    }
}

export default Campaign;