import React from 'react';
import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, Row, Col } from 'react-bootstrap'

@inject("ecg_store")
@observer
export default class EcgPatientInfoTable extends Component {
    render() {
        let frequency = this.props.ecg_store.items.get(this.props.pid).frequency;
        let name = this.props.ecg_store.items.get(this.props.pid).name;
        return (
            <div>               
                <Grid fluid>
                    <Row>
                        <Col xs={2}>
                            Name: {name}
                        </Col>
                        <Col xs={2}>
                            Sample rate (Hz): {frequency}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
