import React from 'react';
import { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { Icon } from 'react-fa'

import EcgPatientPage from './EcgPatientPage.jsx'
import EcgButtonGroup from './EcgButtonGroup.jsx'

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
            <div className='page main'>                
                <Grid fluid>
                    <Row>
                        <Col xs={1}>
                            <Link to="/"><Icon name='home' /></Link>
                        </Col>
                    </Row>
                    <Row>
                        <h1>Choose patient</h1>
                    </Row>
                    <Row>
                        <EcgButtonGroup />
                    </Row>
                </Grid>
            </div>
        );
    }
}
