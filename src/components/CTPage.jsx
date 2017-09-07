import React from 'react'
import { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { Icon } from 'react-fa'
import { observer, inject } from 'mobx-react'


@inject("ct_store")
@observer
export default class CTPage extends Component {
  add() {
     this.props.ct_store.add("new item")
  }

  render() {
    return (
    <div className="page ct">
        <Grid fluid>
        <Row>
            <Col xs={12}>
            <h2>CT</h2>
                { this.props.ct_store.report }
                <ul>
                { this.props.ct_store.items.map((item, idx) => <li key={ idx }>{ item.item }</li>) }
                </ul>

                <Button bsStyle="primary" onClick={ this.add.bind(this) }>Add</Button>
            </Col>
        </Row>
        </Grid>
    </div>
    )
  }
}
