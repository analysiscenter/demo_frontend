import React from 'react'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { Icon } from 'react-fa'
import { inject, observer } from 'mobx-react'


@inject("ecg_store")
@observer
export default class ECGPage extends Component {
   renderItem(item) {
        return (
        <Col xs={6} sm={4} md={3} lg={2} key={item.id}>
            <div className="item">
            <Link to={this.props.match.path + "/" + item.id}>
                <div>
                    <Icon name="heartbeat"/><br/>
                    <span className="name">{item.name}</span>
                </div>
            </Link>
            </div>
        </Col>
        )
    }

    render() {
        const self = this
        return (
        <div className="page ecg">
            <Grid fluid>
            <Row>
                { this.props.ecg_store.items.values().map( item => self.renderItem(item) ) }
            </Row>
            </Grid>
        </div>
        )
    }
}