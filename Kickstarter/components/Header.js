import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Container } from "react-bootstrap";

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark" >
            <Container className="justify-content-center">
                <Navbar.Brand href="#home"> &sdot;&sdot;&sdot;&nbsp;&nbsp;KICK STARTER&nbsp;&nbsp;&sdot;&sdot;&sdot;</Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default Header;