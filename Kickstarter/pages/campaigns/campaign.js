import React from 'react';
import Layout from '../../components/Layout';
import CardTypography from '../../components/CardTypography';
import AddSharpIcon from '@mui/icons-material/AddSharp';

import { Container, Typography, Box, Button, ButtonGroup, TextField, Paper } from '@mui/material';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

class Campaign extends React.Component{
    state = {
        expanded: false
    }
    handleChange = () => {
        this.state.expanded ?
        this.setState({ expanded: false }) :
        this.setState({ expanded: 'panel1' });
    };
    render() {
        return (
            <Layout>
                <Container>
                    <Typography variant='h5' align='center' sx={{ mt:2, padding: '20px 30px 0 30px' }}>
                        JOY: A healthy conversation about race
                    </Typography>
                    <Typography variant='subtitle1' align='center' color='text.secondary' sx={{ m:2 }}>
                        This is a book about a little girl who asks her dad about race. They talk about its origins and how her Blackness can be joyful. This is a book about a little girl who asks her dad about race. They talk about its origins and how her Blackness can be joyful. This is a book about a little girl who asks her dad about race. They talk about its origins and how her Blackness can be joyful.
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', ml: 2, mr: 2 }}>
                        <Box sx={{width:'max-content', maxWidth:'20%', height:'max-content', p:2, mt:4, mr:2, border:'1px dashed gray'}}>
                            <Typography variant='h6' color='text.secondary' sx={{ pb: 1 }}>Campaign Details</Typography>
                            <CardTypography value='subtitle2' title='Money Raised:' text='0'/>
                            <CardTypography value='subtitle2' title='Contributors:' text='0'/>
                            <CardTypography value='subtitle2' title='Approvers:' text='0'/>
                            <CardTypography value='subtitle2' title='Approval Amount:' text='1000'/>
                            <CardTypography value='subtitle2' title='Requests:' text='0' />
                            <CardTypography value='subtitle2' title='Request Voting Percentage:' text='75' />

                            <Typography variant='h6' color='text.secondary' sx={{ mt: 3 }}>Make Contribution</Typography>
                            <Typography variant='subtitle2' align='center' color='text.secondary' sx={{ mt:2, mb:2, ml:1, mr:1 }}>
                                Login to view<br />
                                You have already contributed 1000 Wei, but you can always contribute more...
                            </Typography>
                            <TextField
                                label='Amount'
                                fullWidth
                                sx={{mb:1}}
                                size = 'small'
                                // value={this.state.title}
                                // onChange={(event) => {
                                //     this.setState({title: event.target.value, errorMessage: '', successMessage:''})
                                // }}
                                // disabled = {this.state.loading}
                            />
                            <Button variant='outlined' sx={{ width: '100%' }}>
                                Contribute
                            </Button>


                            <Typography variant='h6' color='text.secondary' sx={{ mt: 3 }}>Approver Status</Typography>
                            <Typography variant='subtitle2' align='center' color='text.secondary' sx={{ m:2 }}>
                                Login to view<br/>
                                Not enough contribution<br/>
                                Enough contribution<br/>
                            </Typography>
                            <Button variant='outlined' sx={{ width: '100%' }}>
                                Become Approver<br/>
                                Revoke Approver Rights
                            </Button>
                            
                        </Box>
                        <Box sx={{ mt: 4, maxWidth:'75%' }}>
                            <Typography variant='subtitle2' align='right' color='#1565c0' sx={{ mr:1 }}>
                                Contract Address: 0x7206980B2cD40a98f57AB79902BC0f6385F27ed0
                            </Typography>
                            <Typography variant='subtitle2' align='right' color='#1565c0' sx={{ mr:1 }}>
                                Owner: 0xC611111cBB2Cb882D58A2c25f143A7Bd0F47ee9e
                            </Typography>
                            <Typography variant='h6' align='left' color='text.secondary' sx={{ p: 1 }}>
                                Requests for Approval
                            </Typography>
                            <Accordion expanded={this.state.expanded === 'panel1'} onChange={this.handleChange}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header">
                                    <Typography>
                                        Publication Payment
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ml:1, mr:1}}>
                                    <Typography color='text.secondary' sx={{mb:2}}>
                                        Payment needs to be made to Rajshree publications. This payment is for printing the first 10,000 copies of the book. As per the vendor it will take 10-12 days for the finished product. 
                                    </Typography>
                                    <CardTypography value='subtitle2' title='Transfer amount:' text='1000'/>
                                    <CardTypography value='subtitle2' title="Recepient's Address:" text='0xC611111cBB2Cb882D58A2c25f143A7Bd0F47ee9e'/>
                                    <CardTypography value='subtitle2' title='Voted by:' text='47/132'/>
                                    <CardTypography value='subtitle2' title="Approval Percentage:" text='67%'/>
                                    <Typography color='text.secondary' sx={{mt:2, mb:1}}>Voting Status</Typography>
                                    <Typography variant='subtitle2'>
                                        Login to view status or cast vote<br/>
                                        You have already voted for this request. Your vote: Approve<br/>
                                        You have already voted for this request. Your vote: Reject<br/>
                                        You have already voted for this request. Your vote: Don't care<br/>
                                        You can vote here
                                    </Typography>
                                    <ButtonGroup size="small" variant="outlined" aria-label="outlined button group">
                                        <Button>Approve</Button>
                                        <Button>Reject</Button>
                                        <Button>Don't care</Button>
                                    </ButtonGroup>
                                    <Typography color='text.secondary' sx={{mt:2, mb:1}}>Request Status</Typography>
                                    <Typography variant='subtitle2'>
                                        Ongoing<br/>
                                        Finalized<br/>
                                    </Typography>
                                    <Button>Finalize Request</Button>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion expanded={this.state.expanded === 'panel1'} onChange={this.handleChange}>
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
                                        label='Title'
                                        fullWidth
                                        size = 'small'
                                        // value={this.state.title}
                                        // onChange={(event) => {
                                        //     this.setState({title: event.target.value, errorMessage: '', successMessage:''})
                                        // }}
                                        // disabled = {this.state.loading}
                                    />
                                    <TextField
                                        label='Description'
                                        fullWidth multiline
                                        sx={{ mt: 2 }}
                                        rows={3}
                                        size = 'small'
                                        // value={this.state.title}
                                        // onChange={(event) => {
                                        //     this.setState({title: event.target.value, errorMessage: '', successMessage:''})
                                        // }}
                                        // disabled = {this.state.loading}
                                    />
                                    <TextField
                                        label='Amount in ETH'
                                        fullWidth
                                        sx={{ mt: 2 }}
                                        size = 'small'
                                        // value={this.state.title}
                                        // onChange={(event) => {
                                        //     this.setState({title: event.target.value, errorMessage: '', successMessage:''})
                                        // }}
                                        // disabled = {this.state.loading}
                                    />
                                    <TextField
                                        label="Recepient's Address"
                                        fullWidth
                                        sx={{ mt: 2 }}
                                        size = 'small'
                                        // value={this.state.title}
                                        // onChange={(event) => {
                                        //     this.setState({title: event.target.value, errorMessage: '', successMessage:''})
                                        // }}
                                        // disabled = {this.state.loading}
                                    />
                                    <Button variant='outlined' size='large' sx={{ mt:3, mb:2 }}>Add Request</Button>
                                </AccordionDetails>
                            </Accordion>


                                

                        </Box>
                    </Box>
                </Container>
            </Layout>
        );
    }
}

export default Campaign;