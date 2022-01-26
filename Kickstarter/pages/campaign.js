import { Container, Typography, Box, Button } from '@mui/material';
import React from 'react';
import Layout from '../components/Layout';
import CardTypography from '../components/CardTypography';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
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
                        <Box sx={{width:'max-content', maxWidth:'25%', height:'max-content', p:2, mt:4, mr:2, border:'1px dashed gray'}}>
                            <Typography variant='h6' color='text.secondary' sx={{ pb: 1 }}>Campaign Details</Typography>
                            <CardTypography value='subtitle1' title='Money Raised:' text='0'/>
                            <CardTypography value='subtitle1' title='Contributors:' text='0'/>
                            <CardTypography value='subtitle1' title='Approvers:' text='0'/>
                            <CardTypography value='subtitle1' title='Approval Amount:' text='1000'/>
                            <CardTypography value='subtitle1' title='Requests:' text='0' />
                            <CardTypography value='subtitle1' title='Request Voting Percentage:' text='75' />
                            <Typography variant='h6' color='text.secondary' sx={{ mt: 3 }}>Approver Status</Typography>
                            <Typography variant='subtitle1' align='center' color='text.secondary' sx={{ m:2 }}>
                                Login to view<br/>
                                Not enough contribution<br/>
                                Enough contribution<br/>
                            </Typography>
                            <Button sx={{ width: '100%' }}>
                                Become Approver<br/>
                                Revoke Approver Rights
                            </Button>
                        </Box>
                        <Box sx={{ mt: 4, maxWidth:'75%' }}>
                            <Typography variant='subtitle1' align='right' color='#1565c0' sx={{ mr:1 }}>
                                Contract Address: 0x7206980B2cD40a98f57AB79902BC0f6385F27ed0
                            </Typography>
                            <Typography variant='subtitle1' align='right' color='#1565c0' sx={{ mr:1 }}>
                                Owner: 0xC611111cBB2Cb882D58A2c25f143A7Bd0F47ee9e
                            </Typography>
                            <Typography variant='h6' align='left' color='text.secondary' sx={{ p: 1 }}>
                                Current Requests
                            </Typography>
                            <Accordion expanded={this.state.expanded === 'panel1'} onChange={this.handleChange}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                                >
                                    <Typography>
                                        Publication Payment
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Payment needs to be made to Rajshree publications. This payment is for printing the first 10,000 copies of the book. As per the vendor it will take 10-12 days for the finished product. 
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={this.state.expanded === 'panel1'} onChange={this.handleChange}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                                >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    General settings
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <Typography>
                                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                    Aliquam eget maximus est, id dignissim quam.
                                </Typography>
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