import React from 'react';
import { Navbar, Container, Col, Row, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import assert from 'assert';
import web3 from '../Ethereum/web3';
import instance from '../Ethereum/instance';

class ERC20Hub extends React.Component{

    state = {
        tokenName: '',
        tokenSymbol: '',
        tokenDecimals: '',
        tokenTotalSupply: '',
        errorMessage: '',
        success: false,
        address: '',
        loading: false
    };

    createERC20Token = async () => {
        this.setState({ loading: true, errorMessage: '', success: false });
        try {
            const accounts = await web3.eth.getAccounts();
            assert( await instance.methods.createERC20Token(
                this.state.tokenName, this.state.tokenSymbol, this.state.tokenDecimals, this.state.tokenTotalSupply
            ).send({ from: accounts[0], gas: 1000000 }));
            const tokens = await instance.methods.viewERC20Tokens().call();
            const address = tokens[tokens.length - 1];
            this.setState({ success: true, address: address });
        } catch (error) {
            this.setState({ errorMessage: error.message });
        }
        this.setState({ loading: false });
    }

    render() {

        return (
            <>
                <Navbar collapseOnSelect expand='lg' bg='primary' variant='dark'>
                    <Navbar.Brand className='m-auto' href='/'>
                        &sdot;&sdot;&sdot; Crypto Maniacs &sdot;&sdot;&sdot;
                    </Navbar.Brand>
                </Navbar>
                <Container style={{paddingTop: 30, paddingBottom: 30, textAlign:'center'}}>
                    <h5 className='m-auto' style={{ color: 'grey' }}>Your one stop solution to create an ERC-20 Token</h5>
                </Container>
                <Container style={{ paddingTop: 30, paddingBottom: 30 }}>
                    <Row>
                        <Col lg={6} className='px-5' style={{ borderRight: '1px solid grey' }}>
                            <Container style={{paddingBottom: 30, textAlign:'center', backgroundColor:'#fff'}}>
                                <h6 className='m-auto' style={{ color: 'text-primary' }}>What you need (bole to Requirements BHEEDU LOG)</h6>
                            </Container>
                            <p style={{color: 'grey'}}>
                                1. You need to have MetaMask extension installed for your browser. <br/>
                                Click <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en'>here</a> to get the Chrome extension.
                            </p>
                            <p style={{ color: 'grey' }}>
                                2. You need to have a MetaMask account. Create if you don't have one.
                            </p>
                            <p style={{ color: 'grey' }}>
                                3. Switch to a test network (preferably: Rinkeby).<br />
                                Click on your Metamask extension, then click on Ethereum Mainnet, and choose Rinkeby.
                            </p>
                            <p style={{ color: 'grey' }}>
                                4. You should have some Ethereum in your wallet. 0.01 ETH should be fine.<br />
                                Click <a href='https://faucets.chain.link/rinkeby'>here</a> to get some free ether for your Rinkeby test network.
                            </p>
                            <p style={{ color: 'grey' }}>
                                5. Enter deatils for your crypto, and click CREATE & DEPLOY. <br />
                                WooHoo.. We'll take care of the rest.!
                            </p>
                        </Col>
                        <Col lg={6} className='px-5'>
                            <Container style={{paddingBottom: 20, textAlign:'center'}}>
                                <h6 className='m-auto' style={{ color: 'text' }}>Create your own ERC-20 Token</h6>
                            </Container>
                            <Form>
                                <Form.Group className='mb-3'>
                                    <Form.Text className='text-dark'>Token Name</Form.Text>
                                    <Form.Control
                                        placeholder="Think of a name that's amazing"
                                        className='border border-dark'
                                        value={this.state.tokenName}
                                        onChange={(event) => {
                                            this.setState({ tokenName: event.target.value })
                                        }}
                                        disabled={this.state.loading}
                                    />
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Text className='text-dark'>Token Symbol</Form.Text>
                                    <Form.Control
                                        placeholder='Come up with an quirky symbol'
                                        className='border border-dark'
                                        value={this.state.tokenSymbol}
                                        onChange={(event) => {
                                            this.setState({ tokenSymbol: event.target.value })
                                        }}
                                        disabled={this.state.loading}
                                    />
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Text className='text-dark'>Decimals Values</Form.Text>
                                    <Form.Control
                                        placeholder='Partition each token (recommended: 18)'
                                        className='border border-dark'
                                        value={this.state.tokenDecimals}
                                        onChange={(event) => {
                                            this.setState({ tokenDecimals: event.target.value })
                                        }}
                                        disabled={this.state.loading}
                                    />
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Text className='text-dark'>Total Token Supply</Form.Text>
                                    <Form.Control
                                        placeholder='Cap your total limit'
                                        className='border border-dark'
                                        value={this.state.tokenTotalSupply}
                                        onChange={(event) => {
                                            this.setState({ tokenTotalSupply: event.target.value })
                                        }}
                                        disabled={this.state.loading}
                                    />
                                </Form.Group>
                            </Form>
                            <Container style={{textAlign:'center'}}>
                                <Button className='m-3' 
                                    onClick={this.createERC20Token}
                                    disabled={this.state.loading}>
                                    CREATE & DEPLOY
                                </Button>
                            </Container>
                            {
                                !!this.state.errorMessage ?
                                <Alert className='mt-3' variant='danger'>{this.state.errorMessage}</Alert>:<></>
                            }
                            {
                                this.state.success ?
                                <Alert className='mt-3' variant='success' style={{textAlign:'center'}}>
                                    Congrats.! Your ERC-20 Token has been successfully deployed at {this.state.address}.<br />
                                    View on <a href={'https://rinkeby.etherscan.io/address/' + this.state.address}>Rinkeby Etherscan</a>
                                </Alert> : <></>
                            }
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default ERC20Hub;