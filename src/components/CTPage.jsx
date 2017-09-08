import React from 'react'
import { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { Icon } from 'react-fa'
import { inject, observer } from 'mobx-react'


@inject("ct_store")
@observer
export default class CTPage extends Component {
    onClick(id) {
        this.props.ct_store.getData(id)
    }

    render() {
        return (
        <div className="page ct">
            <Grid fluid>
            <Row>
                <Col xs={12}>
                <h2>CT</h2>
                    <ul>
                    { this.props.ct_store.items.values().map( (item) => <li key={item.id} onClick={this.onClick.bind(this, item.id)}>{ item.name } { item.data === undefined}</li> ) }
                    </ul>
                </Col>
            </Row>
            </Grid>
        </div>
        )
    }
}
