import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import { Icon } from 'react-fa';

export default class MainButtonGroup extends Component {
    render() {
        return (
            <div>                
                <Grid fluid>
                    <Row>
                        <Col xs={6}>
                            <Link to="/ecg">
                                <Row>
                                    <Icon name='heartbeat' className='main-icon' />
                                </Row>
                                <Row>
                                    ECG
                                </Row>
                            </Link>
                        </Col>
                        <Col xs={6}>
                            <Link to="/ct">
                                <Row>
                                    <Icon name='universal-access' className='main-icon' />
                                </Row>
                                <Row>
                                    CT
                                </Row>
                            </Link>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}