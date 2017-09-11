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
        let units = this.props.ecg_store.items.get(this.props.pid).units;
        return (
            <div>               
                <Grid fluid>
                    <Row>
                        <Col xs={2}>
                            <span className='page item info-table'>Name: {name}</span>
                        </Col>
                        <Col xs={2}>
                            <span className='page item info-table'>Sample rate (Hz): {frequency}</span>
                        </Col>
                        <Col xs={2}>
                            <span className='page item info-table'>Units: {units}</span>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
