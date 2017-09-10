import React from 'react'
import { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { Icon } from 'react-fa'
import { inject, observer } from 'mobx-react'


@inject("ct_store")
@observer
export default class CTItemPage extends Component {
    render() {
        const self = this
        const item = this.props.ct_store.items.get(this.props.match.params.id)
        return (
        <div className="page ct item">
            <Grid fluid>
            <Row>
                <Col xs={12}>
                    <h2>Patient {this.props.match.params.id}</h2>
                </Col>
            </Row>
            </Grid>
        </div>
        )
    }
}
