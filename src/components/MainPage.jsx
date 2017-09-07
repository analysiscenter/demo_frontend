import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import { LinkButton } from './Common.jsx'
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Button, Navbar, Nav, NavItem, NavDropdown,MenuItem} from 'react-bootstrap'
import { LinkContainer,IndexLinkContainer } from 'react-router-bootstrap';
import { Icon } from 'react-fa'



export class MainPage extends Component {
    render() {
        return navbarheader
    }
}

const navbarheader = (
            <Navbar>
                <Navbar.Header>
                  <Navbar.Brand>
                    <a href="/">ЦАД</a>
                  </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                  
                      <LinkContainer to="/ecg">
                      <NavItem eventKey={1}>
                        <Icon name='heartbeat'/> ECG
                        </NavItem>
                      </LinkContainer>
                  
                  
                      <LinkContainer to="/ct"><NavItem eventKey={2}>
                        <Icon name='universal-access'/> CT
                      </NavItem></LinkContainer>
                  
                </Nav>
            </Navbar>);

export class MainButtonGroup extends Component {
    render() {
        return (
            <div className="buttonGroup">                
                <Grid fluid>
                    <Row className='row'>
                        <Col xs={6}>
                            <Link to="/ecg"><Icon name='heartbeat' className='big'><br />ECG</Icon></Link>
                        </Col>
                        <Col xs={6}>
                            <Link to="/ct"><Icon name='universal-access' className='big'><br />CT</Icon></Link>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
