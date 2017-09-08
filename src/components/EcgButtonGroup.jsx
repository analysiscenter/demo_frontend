import React from 'react';
import { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { Icon } from 'react-fa'
import { EcgPatientPage }  from './EcgPatientPage.jsx'

export default class EcgButtonGroup extends Component { 
    render() {
        return (
            <div>                
                <Grid fluid>
                    <Row>
                        <Col xs={4}>
                            <Link to="/ecg/1">
                                <Row>
                                    <Icon name='heartbeat' />
                                </Row>
                                <Row>
                                    Patient 1
                                </Row>
                            </Link>
                        </Col>
                        <Col xs={4}>
                            <Link to="/ecg/2">
                                <Row>
                                    <Icon name='heartbeat' />
                                </Row>
                                <Row>
                                    Patient 2
                                </Row>
                            </Link>
                        </Col>
                        <Col xs={4}>
                            <Link to="/ecg/3">
                                <Row>
                                    <Icon name='heartbeat' />
                                </Row>
                                <Row>
                                    Patient 3
                                </Row>
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4}>
                            <Link to="/ecg/4">
                                <Row>
                                    <Icon name='heartbeat' />
                                </Row>
                                <Row>
                                    Patient 4
                                </Row>
                            </Link>
                        </Col>
                        <Col xs={4}>
                            <Link to="/ecg/5">
                                <Row>
                                    <Icon name='heartbeat' />
                                </Row>
                                <Row>
                                    Patient 5
                                </Row>
                            </Link>
                        </Col>
                        <Col xs={4}>
                            <Link to="/ecg/6">
                                <Row>
                                    <Icon name='heartbeat' />
                                </Row>
                                <Row>
                                    Patient 6
                                </Row>
                            </Link>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}