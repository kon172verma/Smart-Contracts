import web3 from '../web3';
import instance from '../instance';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Header from '../components/header';
import { Card, Col, Row, Container } from 'react-bootstrap';
import Campaign from '../build/Campaign.json'

class Index extends React.Component{

    static async getInitialProps(){
        const addresses = await instance.methods.getCampaigns().call();
        const campaigns = await Promise.all(addresses.map(async(address) => {
            const contract = await new web3.eth.Contract(Campaign.abi, address);
            const owner = await contract.methods.owner().call();
            const approvalAmount = await contract.methods.approvalAmount().call();
            const votingPercentage = await contract.methods.minVotingPercentage().call();
            const contributorsCount = await contract.methods.contributorsCount().call();
            const approversCount = await contract.methods.approversCount().call();
            return {
                address,
                owner,
                approvalAmount,
                votingPercentage,
                contributorsCount,
                approversCount,
            }
        }))
        return { campaigns };
    }

    render() {
        return (
            <>
                <Header />
                <div style={{marginBottom:'40px'}}/>
                <Container>
                    <Row xs={1} md={2} className="g-4">
                        {this.props.campaigns.map(campaign => {
                            return (
                                <Col key={campaign.address}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>{campaign.address}</Card.Title>
                                            <hr />
                                            <Card.Text>
                                                Owner {campaign.owner}<br />
                                                Approver Amount {campaign.approvalAmount}<br />
                                                Voting % {campaign.votingPercentage}<br />
                                                Contributors {campaign.contributorsCount}<br />
                                                Approvers {campaign.approversCount}<br />
                                            </Card.Text>
                                            <Card.Link href="#">View Campaign</Card.Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
            </>
        );
    }
}

export default Index;