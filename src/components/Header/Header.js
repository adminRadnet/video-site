import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const Header = ({text, darkMode, setDarkMode}) => (
    <header>
        <Container fluid>
            <Row className="pt-2">
                <Col sm="1" className={`text-left`}>
                    <Link to="/"><img className={`logo`} src={`${darkMode ? `https://cdnwest.radnet.com/brand/logo-web-white.svg`: `https://cdnwest.radnet.com/brand/logo-radnet.svg`}`} alt={text} /></Link>
                    <p style={{fontSize:`0.4rem`}} className={`text-right pt-0 mt-0 logo-secondary`}>Videos</p>
                </Col>
                <Col sm="7" className="pl-4 pt-4">
                    <ul className="list-inline">
                        <li className="list-inline-item"><Link to="/browse">Browse</Link></li>
                        <li className="list-inline-item"><Link to="/about">About</Link></li>
                    </ul>
                </Col>
                <Col sm="3">
                    <input className="search form-control" type="text" name="Search" placeholder="Search" />
                </Col>
                <Col sm="1" className="text-right">
                <span className="toggle" onClick={()=>setDarkMode(!darkMode)}>
                  <span className={`switch ${darkMode ? 'on' : '' }`}></span>
                </span>
                </Col>
            </Row>
        </Container>
    </header>
)
export default Header

Header.propTypes = {
    text: PropTypes.string,
    darkMode: PropTypes.bool
}