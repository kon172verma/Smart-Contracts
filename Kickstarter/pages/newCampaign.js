import * as React from 'react';
import { Container, Typography, Button, TextField, InputAdornment, Box, Alert , CircularProgress } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import Layout from '../components/Layout';
import web3 from '../web3';
import instance from '../instance';

class newCampaign extends React.Component{
    state = {
        title: '',
        description: '',
        approvalAmount: '',
        votingPercentage: '',
        loading: false,
        errorMessage: '',
        successMessage: ''
    };

    createCampaign = async () => {
        this.setState({ loading: true, errorMessage: '', successMessage:'' });
        try {
            const accounts = await web3.eth.getAccounts();
            await instance.methods.createCampaign(
                this.state.title, this.state.description,
                this.state.approvalAmount, this.state.votingPercentage
            ).send({ from: accounts[0] });
            const message = 'New campaign: "' + this.state.title + '" created successfully';
            this.setState({ successMessage: message, title:'', description:'', approvalAmount:'', votingPercentage:'' });
        } catch (error) {
            this.setState({ errorMessage: error.message });
        }
        this.setState({ loading: false });
    }

    render() {
        makeStyles((theme) =>
            createStyles({
                selectAdornment: {
                    marginRight: theme.spacing(3),
                }
            })
        );
        return (
            <Layout>
                <Container>
                    <Typography variant='h5' component='div' align='center' sx={{padding:'20px 30px 0 30px', mt:2, color:'gray'}} >
                        Create new Campaign
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', mt:1 }} justifyContent="center">
                        <TextField
                            id='title' label='Title'
                            fullWidth
                            sx={{ m: 1, mt:3 }}
                            value={this.state.title}
                            onChange={(event) => {
                                this.setState({title: event.target.value, errorMessage: '', successMessage:''})
                            }}
                            disabled = {this.state.loading}
                        />
                        <TextField
                            id='description'
                            label='Description'
                            fullWidth multiline
                            rows={4}
                            sx={{ m: 1 }}
                            value={this.state.description}
                            onChange={(event) => {
                                this.setState({description: event.target.value, errorMessage: '', successMessage:''})
                            }}
                            disabled = {this.state.loading}
                        />
                        <TextField
                            label='Approval Amount'
                            id='approvalAmount'
                            fullWidth
                            sx={{ m: 1, mt: 2 }}
                            InputProps={{
                                startAdornment: <InputAdornment position='start'></InputAdornment>,
                                endAdornment: <InputAdornment position='start'>ETH</InputAdornment>
                            }}
                            value={this.state.approvalAmount}
                            onChange={(event) => {
                                this.setState({approvalAmount: event.target.value, errorMessage: '', successMessage:''})
                            }}
                            disabled = {this.state.loading}
                        />
                        <TextField
                            label='Minimum Voting Percentage'
                            id='votingPercentage'
                            fullWidth
                            sx={{ m: 1, mt: 2 }}
                            InputProps={{
                                startAdornment: <InputAdornment position='start'></InputAdornment>,
                                endAdornment: <InputAdornment position='start'>%</InputAdornment>
                            }}
                            value={this.state.votingPercentage}
                            onChange={(event) => {
                                this.setState({votingPercentage: event.target.value, errorMessage: '', successMessage:''})
                            }}
                            disabled = {this.state.loading}
                        />
                        {
                            this.state.loading ?
                            <CircularProgress sx={{ mt: 3 }} /> :
                                <Button
                                    variant="contained"
                                    size='large'
                                    sx={{ m: 1, mt: 3, mb: 3 }}
                                    onClick={this.createCampaign}
                                >
                                Create Campaign
                            </Button>
                        }
                        {
                            !!this.state.errorMessage ?
                                <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{this.state.errorMessage}</Alert> :
                                <></>
                        }{
                            !!this.state.successMessage ?
                            <Alert severity="success" sx={{ mt:2, width:'100%' }}>{this.state.successMessage}</Alert> :
                            <></>
                        }
                    </Box>
                </Container>
            </Layout>
        );
    }
}

export default newCampaign;