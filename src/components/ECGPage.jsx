import React from 'react'
import { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { Icon } from 'react-fa'
import { inject, observer } from 'mobx-react'


@inject("ecg_store")
@observer
export default class ECGPage extends Component {
  add() {
     this.props.ecg_store.add("new item")
  }

  render() {
    return (
    <div className="page ecg">
        <Grid fluid>
        <Row>
            <Col xs={12}>
            <h2>ECG</h2>
                { this.props.ecg_store.report }
                <ul>
                { this.props.ecg_store.items.map((item, idx) => <li key={ idx }>{ item.item }</li>) }
                </ul>

                <Button bsStyle="primary" onClick={ this.add }>Add</Button>
            </Col>
        </Row>
        </Grid>
    </div>
    )
  }
}
