import React from 'react';
import { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { Icon } from 'react-fa'
import { EcgPatientPage }  from './EcgPatientPage.jsx'
import { LinkButton, EmptyPage } from './Common.jsx'

export class EcgPage extends Component {
    render() {
        return (
            <div>
                <Route exact path="/ecg" component={EcgListPage} />
                <Route path="/ecg/:pid" component={EcgPatientPage} />
            </div>
        );
    }
}

export class EcgListPage extends Component {
    render() {
        return (
            <div className="page main">
                <div>
                    <h1>Choose patient</h1>
                </div>    
                <EcgButtonGroup />
                <LinkButton title={'Home'} path={'/'}/>
            </div>
        );
    }
}

export class EcgButtonGroup extends Component { 
    render() {
        return (
            <div>                
                <Grid fluid>
                    <Row>
                        <Col xs={4}>
                            <Link to="/ecg/1"><Icon name='heartbeat' className='big'><br />Patient 1</Icon></Link>
                        </Col>
                        <Col xs={4}>
                            <Link to="/ecg/2"><Icon name='heartbeat' className='big'><br />Patient 2</Icon></Link>
                        </Col>
                        <Col xs={4}>
                            <Link to="/ecg/3"><Icon name='heartbeat' className='big'><br />Patient 3</Icon></Link>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
