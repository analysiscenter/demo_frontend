import React from 'react';
import { Component } from 'react';
import { observer } from 'mobx-react';
import { Grid, Row, Col } from 'react-bootstrap'

import ecgStore from './Stores.jsx'

@observer
export default class EcgPatientInfoTable extends Component {
    render() {
        return (
            <div>               
                <Grid fluid>
                    <Row>
                        <Col xs={2}>
                            Name: {ecgStore.name}
                        </Col>
                        <Col xs={2}>
                            Sample rate (Hz): {ecgStore.frequency}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
