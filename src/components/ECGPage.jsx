import React from 'react'
import { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { Icon } from 'react-fa'
import { inject, observer } from 'mobx-react'


@inject("ecg_store")
@observer
export default class ECGPage extends Component {
    onClick(id) {
        this.props.ecg_store.getSignal(id)
    }

    render() {
        return (
        <div className="page ecg">
            <Grid fluid>
            <Row>
                <Col xs={12}>
                <h2>ECG</h2>
                    <ul>
                    { this.props.ecg_store.items.values().map( (item) => <li key={item.id} onClick={this.onClick.bind(this, item.id)}>{ item.name } { item.signal === undefined}</li> ) }
                    </ul>
                </Col>
            </Row>
            </Grid>
        </div>
        )
    }
}
