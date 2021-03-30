import React from 'react' 
import {Container, Col, Row} from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
            <Container fluid>
                <Row className="pt-4">
                    <Col>Copyright &copy; 2021 <a href="https://radnet.com" rel="noreferrer" target="_blank">RadNet</a></Col>
                    <Col></Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer