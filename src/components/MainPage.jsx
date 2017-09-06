import React from 'react';
import { Component } from 'react';
import { LinkButton } from './Common.jsx'
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { Icon } from 'react-fa'

export class MainPage extends Component {
    render() {
        return (
            <div className="page main">
                <div>
                    <h1>Выберите направление</h1>             
                </div>
                
                <MainButtonGroup />
            </div>
            
        );
    }
}

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
