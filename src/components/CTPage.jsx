import React from 'react'
import { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { Icon } from 'react-fa'
import { inject, observer } from 'mobx-react'


@inject("ct_store")
@observer
export default class CTPage extends Component {
    onClick(id) {
        this.props.ct_store.getItemData(id)
    }

    renderItem(item) {
        return (
        <Col xs={6} sm={4} md={3} lg={2} key={item.id}>
            <div className="item">
                <Icon name="universal-access"/><br/>
                <span className="name">{item.name}</span>
            </div>
        </Col>
        )
    }

    render() {
        const self = this
        return (
        <div className="page ct">
            <Grid fluid>
            <Row>
                { this.props.ct_store.items.values().map( (item) => self.renderItem(item) ) }
            </Row>
            </Grid>
        </div>
        )
    }
}
