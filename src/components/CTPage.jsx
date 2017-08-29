import React from 'react'
import { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { Icon } from 'react-fa'

export default class CTPage extends Component {
  render() {
    return (
    <div className="page ct">
        <Grid fluid>
        <Row>
            <Col xs={12}>
            <h2>CT</h2>
            </Col>
        </Row>
        </Grid>
    </div>
    )
  }
}
