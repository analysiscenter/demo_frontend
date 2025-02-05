import React from 'react'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { Icon } from 'react-fa'

export default class MainPage extends Component {
  render() {
    return (
    <div className="page main">
        <Grid fluid>
        <Row>
            <Col xs={6}>
                <Link to="/ecg"><Icon name='heartbeat' className='big' /></Link>
            </Col>
            <Col xs={6}>
                <Link to="/ct"><Icon name='universal-access' className='big' /></Link>
            </Col>
        </Row>
        </Grid>
    </div>
    )
  }
}
