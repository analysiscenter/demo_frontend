import React from 'react'
import { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { Icon } from 'react-fa'

export default class ECGPage extends Component {
  render() {
    return (
    <div className="page ecg">
        <Grid fluid>
        <Row>
            <Col xs={12}>
            <h2>ECG</h2>
            </Col>
        </Row>
        </Grid>
    </div>
    )
  }
}
