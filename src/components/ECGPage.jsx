import React from 'react'
import { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { Icon } from 'react-fa'
import { inject, observer } from 'mobx-react'


@inject("ecg_store")
@observer
export default class ECGPage extends Component {
  render() {
    return (
    <div className="page ecg">
        <Grid fluid>
        <Row>
            <Col xs={12}>
            <h2>ECG</h2>
                <ul>
                { this.props.ecg_store.items.values().map( (item) => <li key={item.id}>{ item.name }</li> ) }
                </ul>
            </Col>
        </Row>
        </Grid>
    </div>
    )
  }
}
