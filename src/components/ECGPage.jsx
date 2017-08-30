import React from 'react'
import { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { Icon } from 'react-fa'
import { observer } from 'mobx-react'

import ecg_store from '../stores/ecg_store'


@observer
export default class ECGPage extends Component {
  add() {
     ecg_store.add("new item")
  }

  render() {
    return (
    <div className="page ecg">
        <Grid fluid>
        <Row>
            <Col xs={12}>
            <h2>ECG</h2>
                { ecg_store.report }
                <ul>
                { ecg_store.items.map((item, idx) => <li key={ idx }>{ item.item }</li>) }
                </ul>

                <Button bsStyle="primary" onClick={ this.add }>Add</Button>
            </Col>
        </Row>
        </Grid>
    </div>
    )
  }
}
