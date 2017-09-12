import React from 'react';
import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Icon } from 'react-fa'
import { Grid, Row, Col } from 'react-bootstrap'

import BarChart from './BarChart.jsx'
import ChangingProgressbar from './ChangingProgressbar.jsx'

@inject("ecg_store")
@observer
export default class EcgPatientResultCharts extends Component {
    render() {
        const item = this.props.ecg_store.items.get(this.props.pid)

        return (
            <div className="heart">
                <Col xs={3}>
                    <h3>Heart beat rate</h3>
                    <div className="heart-rate">
                        <Icon name='heartbeat' />
                        { Math.round(item.heart_rate) + ' bpm' }
                    </div>
                </Col>
                <Col xs={3}>
                    <h3>AF probabitily</h3>
                    <ChangingProgressbar percentages={Array.from(Array(item.af_prob ? Math.round( 100 * item.af_prob ) + 1 : 1).keys())}
                                    textForPercentage={(percentage) => `${percentage}%`} interval = {1000 / Math.round( 100 * item.af_prob )} />
                </Col>
                <Col xs={6}>
                    <h3>Segments length</h3>
                    <BarChart pid={this.props.pid}/>
                </Col>
            </div>
        )
    }
}
