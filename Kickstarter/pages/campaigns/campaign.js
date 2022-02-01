import React from 'react';
import Layout from '../../components/Layout';
import CardTypography from '../../components/CardTypography';
import AddSharpIcon from '@mui/icons-material/AddSharp';

import { Container, Typography, Box, Button, ButtonGroup, TextField, LinearProgress } from '@mui/material';
import { Accordion, AccordionDetails, AccordionSummary, Alert } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import web3 from '../../web3';
import campaignContract from '../../build/Campaign.json';

class Campaign extends React.Component{
    static async getInitialProps(props) {
        const address = props.query.address;
        const contract = await new web3.eth.Contract(campaignContract.abi, address);
        const data = await contract.methods.summarize().call();
        const owner = data[0];
        const title = data[1];
        const description = data[2];
        const balance = web3.utils.fromWei(data[3]);
        const approvalAmount = web3.utils.fromWei(data[4]);
        const minVotingPercentage = data[5];
        const contributorsCount = data[6];
        const approversCount = data[7];
        const requestsCount = await contract.methods.requestsCount().call();
        const requests = await Promise.all(
            Object.keys([...Array(requestsCount)]).map(async(requestId) => {
                return { [requestId]: await contract.methods.requests(requestId).call() };
            })
        )
        return {
            address, owner, title, description, balance, approvalAmount,
            minVotingPercentage, contributorsCount, approversCount, requestsCount, requests
        };
    }
    state = {
        contract: undefined,
        login: false,
        account: '',
        loading: false,
        errorMessage: '',
        successMessage: '',
        currentContribution: 0,
        approver: false,
        tempContribution: '',
        requestTitle: '',
        requestDescription: '',
        requestAmount: '',
        requestAddress: '',
        expanded: '0'
    }

    checkLogin = async () => {
        const accounts = await web3.eth.getAccounts();
        if(this.state.account != accounts[0]){
            if (accounts[0]) {
                this.setState({ login: true, account: accounts[0] });
                await this.getUserData();
            } else {
                this.setState({ login: false, account: '' });
            }
        }
    }
    getUserData = async () => {
        const accounts = await web3.eth.getAccounts();
        const contract = await new web3.eth.Contract(campaignContract.abi, this.props.address);
        const currentContribution = web3.utils.fromWei(await contract.methods.contributors(accounts[0]).call());
        const approver = await contract.methods.approvers(accounts[0]).call();
        this.setState({ contract, currentContribution, approver });
    }

    makeContribution = async () => {
        try {
            this.setState({ loading: true, errorMessage: '', successMessage: '' });
            await this.state.contract.methods.contribute().send({
                from: this.state.account,
                value: web3.utils.toWei(this.state.tempContribution)
            })
            await this.getUserData();
            this.setState({ loading: false, successMessage: 'Thank you for your contribution.!', errorMessage: '' });
        } catch (error) {
            this.setState({ loading: false, successMessage: '', errorMessage: error.message });
        }
    }
    toggleApprover = async () => {
        try {
            this.setState({ loading: true, errorMessage: '', successMessage: '' });
            if(this.state.approver){
                await this.state.contract.methods.revokeApprover().send({ from: this.state.account });
                await this.getUserData();
                this.setState({
                    loading: false, approver: false,
                    successMessage: 'Your approver status has been revoked.!', errorMessage: ''
                });
            } else {
                await this.state.contract.methods.becomeApprover().send({ from: this.state.account });
                await this.getUserData();
                this.setState({
                    loading: false, approver: true,
                    successMessage: 'Congrats, You are now an approver.!', errorMessage: ''
                });
            }
        } catch (error) {
            this.setState({ loading: false, successMessage: '', errorMessage: error.message });
        }
    }
    addRequest = async () => {
        try {
            this.setState({ loading: true, errorMessage: '', successMessage: '' });
            await this.state.contract.methods.addRequest(this.state.requestTitle, this.state.requestDescription,
                web3.utils.toWei(this.state.requestAmount), this.state.requestAddress).send({ from: this.state.account });
            await this.getUserData();
            this.setState({
                loading: false, requestTitle: '', requestDescription: '', requestAmount: '',
                requestAddress: '', successMessage: 'Successfully added a new request.!', errorMessage: ''
            });
        } catch (error) {
            this.setState({ loading: false, successMessage: '', errorMessage: error.message });
        }
    }
    approveRequest = async (requestId, value) => {
        try {
            this.setState({ loading: true, errorMessage: '', successMessage: '' });
            await this.state.contract.methods.approveRequest(requestId, value).send({ from: this.state.account });
            await this.getUserData();
            this.setState({
                loading: false, successMessage: 'Your vote has been successfully registered.!', errorMessage: ''
            });
        } catch (error) {
            this.setState({ loading: false, successMessage: '', errorMessage: error.message });
        }
    }
    finalizeRequest = async (requestId) => {
        try {
            this.setState({ loading: true, errorMessage: '', successMessage: '' });
            await this.state.contract.methods.finalizeRequest(requestId).send({ from: this.state.account });
            await this.getUserData();
            this.setState({
                loading: false, successMessage: 'Successfully finalized the request.!', errorMessage: ''
            });
        } catch (error) {
            this.setState({ loading: false, successMessage: '', errorMessage: error.message });
        }
    }

    render() {
        this.checkLogin();
        return (
            <Layout>
                { this.state.loading ? <LinearProgress color="inherit"/> : <></> }
                <Container>
                    <Typography variant='h5' align='center' sx={{ mt:2, padding: '20px 30px 0 30px' }}>{ this.props.title }</Typography>
                    <Typography variant='subtitle1' align='center' color='text.secondary' sx={{ m:2, mb:0 }}>{ this.props.description }</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', ml: 2, mr: 2 }}>
                        <Box sx={{width:'max-content', maxWidth:'20%', height:'max-content', p:2, mt:4, mr:2, border:'1px dashed gray'}}>
                            <Typography variant='h6' color='text.secondary' sx={{ pb: 1 }}>Campaign Details</Typography>
                            <CardTypography value='subtitle2' title='Money Raised:' text={ this.props.balance + ' ETH' }/>
                            <CardTypography value='subtitle2' title='Contributors:' text={ this.props.contributorsCount }/>
                            <CardTypography value='subtitle2' title='Approvers:' text={ this. props.approversCount }/>
                            <CardTypography value='subtitle2' title='Approval Amount:' text={ this.props.approvalAmount+' ETH' }/>
                            <CardTypography value='subtitle2' title='Requests:' text={ this.props.requestsCount } />
                            <CardTypography value='subtitle2' title='Request Voting Percentage:' text={ this.props.minVotingPercentage } />
                            <Typography variant='h6' color='text.secondary' sx={{ mt: 3 }}>Make Contribution</Typography>
                            <Typography variant='subtitle2' align='center' color='text.secondary' sx={{ mt:2, mb:2, ml:1, mr:1 }}>
                                {
                                    this.state.login ?
                                    ( this.state.currentContribution > 0 ?
                                    'You have already contributed ' + this.state.currentContribution + ' ETH, but you can always contribute more...' : ''
                                    ) : 'Login to contribute' 
                                }
                            </Typography>
                            <TextField
                                label='Amount in ETH'
                                fullWidth
                                sx={{mb:1}}
                                size='small'
                                value={this.state.tempContribution}
                                onChange={(event) => {
                                    this.setState({tempContribution: event.target.value})
                                }}
                                disabled={ !this.state.login || this.state.loading }
                            />
                            <Button variant='contained' disabled={!this.state.login || this.state.loading }
                                sx={{ width: '100%' }} onClick={this.makeContribution}>
                                Contribute
                            </Button>
                            <Typography variant='h6' color='text.secondary' sx={{ mt: 3 }}>Approver Status</Typography>
                            <Typography variant='subtitle2' align='center' color='text.secondary' sx={{ m: 2 }}>
                                {
                                    this.state.login ? (
                                        this.state.approver ? 'Already an approver' : (
                                            this.state.currentContribution < this.props.approvalAmount ?
                                            'Not enough contribution' :
                                            'Enough contribution'
                                        )
                                    ) : 'Login to view'
                                }
                            </Typography>
                            <Button variant='contained' sx={{ width: '100%' }} onClick={this.toggleApprover}
                                disabled={!this.state.login || this.state.loading || this.state.currentContribution < this.props.approvalAmount}>
                                {this.state.approver ? 'Revoke Approver Rights' : 'Become Approver'}
                            </Button>
                        </Box>
                        <Box sx={{ mt: 4, maxWidth: '75%' }}>
                            <Typography variant='subtitle2' align='right' color='#1565c0' sx={{ mr: 1 }}>
                                Contract Address: {this.props.address}
                            </Typography>
                            <Typography variant='subtitle2' align='right' color='#1565c0' sx={{ mr: 1 }}>
                                Owner: {this.props.owner}
                            </Typography>
                            {
                                !!this.state.errorMessage ?
                                <Alert severity="error" sx={{ mt:2, mb:1 }}>{this.state.errorMessage}</Alert> :
                                <></>
                            }{
                                !!this.state.successMessage ?
                                <Alert severity="success" sx={{ mt:2, mb:1 }}>{this.state.successMessage}</Alert> :
                                <></>
                            }
                            <Typography variant='h6' align='left' color='text.secondary' sx={{ p: 1 }}>
                                Requests for Approval
                            </Typography>
                            {   
                                Object.keys(this.props.requests).map((i) => {
                                    const request = this.props.requests[i]['0'];
                                    return (
                                        <Accordion expanded={this.state.expanded === i} key={i}
                                            onChange={(event) => {
                                                this.setState({ expanded: (this.state.expanded === event.target.key ? 'false' : i) })
                                            }}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1bh-content"
                                                id="panel1bh-header">
                                                <Typography>{request.requestTitle}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{ ml: 1, mr: 1 }}>
                                                <Typography color='text.secondary' sx={{ mb: 2 }}>{request.requestDescription}</Typography>
                                                <Box sx={{ml:1}}>
                                                    <CardTypography value='subtitle2' title='Transfer amount:' text={web3.utils.fromWei(request.value) + ' ETH'} />
                                                    <CardTypography value='subtitle2' title="Recepient's Address:" text={request.recepient} />
                                                    <CardTypography value='subtitle2' title='Voted by:' text={request.votesCount+'/'+this.props.approversCount} />
                                                    <CardTypography value='subtitle2' title="Approval Percentage:"
                                                        text={(parseInt(request.yesCount) || parseInt(request.noCount) ?
                                                            parseInt(request.yesCount) / (parseInt(request.yesCount)+parseInt(request.noCount)) * 100 : '0')+' %'} />
                                                </Box>
                                                <Typography color='text.secondary' sx={{ mt: 2, mb: 1 }}>Voting Status</Typography>
                                                <Box sx={{ml:1}}>
                                                    <Typography variant='subtitle2'>{
                                                        this.state.login ? (
                                                            this.state.approver ? (
                                                                'You can cast your vote here'
                                                            ) : 'You must be an approver to cast a vote'
                                                        ) : 'Login to view status or cast vote'
                                                    }</Typography>
                                                    {
                                                        this.state.login ?
                                                        <ButtonGroup size="small" variant="contained" disabled={!this.state.approver || this.state.loading} sx={{mt:1}} >
                                                            <Button onClick={async () => { await this.approveRequest(i, 1) }}>Approve</Button>
                                                            <Button onClick={async () => { await this.approveRequest(i, 2) }}>Reject</Button>
                                                            <Button onClick={async () => { await this.approveRequest(i, 3) }}>Don't care</Button>
                                                        </ButtonGroup> : <></>
                                                    }
                                                </Box>
                                                <Typography color='text.secondary' sx={{ mt: 2, mb: 1 }}>Request Status</Typography>
                                                <Box sx={{ml:1}}>
                                                    <Typography variant='subtitle2'>{request.complete ? 'Finalized' : 'Ongoing'}</Typography>
                                                    {
                                                        this.state.account === this.props.owner ?
                                                        <Button variant='contained' size='small' disabled={this.state.loading}
                                                            sx={{mt:1, mb:1}} onClick={async()=>{await this.finalizeRequest(i)}}>
                                                            Finalize Request
                                                        </Button> : <></>
                                                    }
                                                </Box>
                                            </AccordionDetails>
                                        </Accordion>
                                    )
                                })
                            }
                            {
                                this.state.account === this.props.owner ?
                                <Accordion expanded={this.state.expanded === 'addNewRequest'} key={'addNewRequest'}
                                    onChange={(event) => {
                                        this.setState({ expanded: (this.state.expanded === event.target.key ? 'false' : 'addNewRequest') })
                                    }}>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header">
                                        <Typography color='#1565c0' >
                                            <AddSharpIcon sx={{ mb: -0.75 }} />
                                            &nbsp;Add new Request
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ ml: 1, mr: 1 }}>
                                        <TextField
                                            label='Title' fullWidth size='small' disabled={this.state.loading}
                                            value={this.state.requestTitle}
                                            onChange={(event) => {
                                                this.setState({requestTitle: event.target.value})
                                            }}
                                        />
                                        <TextField
                                            label='Description' fullWidth multiline sx={{ mt: 2 }} rows={3} size='small'
                                            disabled={this.state.loading} value={this.state.requestDescription}
                                            onChange={(event) => {
                                                this.setState({requestDescription: event.target.value})
                                            }}
                                        />
                                        <TextField
                                            label='Amount in ETH' fullWidth sx={{ mt: 2 }} size='small'
                                            disabled={this.state.loading} value={this.state.requestAmount}
                                            onChange={(event) => {
                                                this.setState({requestAmount: event.target.value})
                                            }}
                                        />
                                        <TextField
                                            label="Recepient's Address" fullWidth sx={{ mt: 2 }} size='small'
                                            disabled={this.state.loading} value={this.state.requestAddress}
                                            onChange={(event) => {
                                                this.setState({requestAddress: event.target.value})
                                            }}
                                        />
                                            <Button variant='outlined' size='large' disabled={this.state.loading}
                                                sx={{ mt: 3, mb: 2 }} onClick={this.addRequest}>
                                                Add Request
                                            </Button>
                                    </AccordionDetails>
                                </Accordion> : <></>
                            }
                        </Box>
                    </Box>
                </Container>
            </Layout>
        );
    }
}

export default Campaign;