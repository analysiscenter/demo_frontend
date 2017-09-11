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
        let heart_rate = this.props.ecg_store.items.get(this.props.pid).heart_rate;
        let af_prob = this.props.ecg_store.items.get(this.props.pid).af_prob;
        return (
            <div>               
                <Grid fluid>
                    <Row className="heart_rate">
                        <Col xs={4}>
                            <Col xs={6}>
                                <Icon name='heartbeat' className="heart_rate icon"></Icon>
                            </Col> 
                            <Col xs={6} className="heart_rate left">
                                <span className="heart_rate value">
                                    {heart_rate ? heart_rate + ' bpm' : '\u2014 bpm'}
                                </span>
                            </Col>
                        </Col>                             
                        <Col xs={4}>
                            <ChangingProgressbar percentages={Array.from(Array(af_prob ? Math.round( 100*af_prob ) + 1 : 1).keys())}
                                            textForPercentage={(percentage) => 
                                            `${percentage}%`
                                            } />
                        </Col>  
                        <Col xs={4}>
                            <BarChart pid={this.props.pid}/>
                        </Col>                                
                    </Row>
                    <Row>
                        <Col xs={4}>
                            <span>Heart beat rate</span>
                        </Col> 
                        <Col xs={4}>
                            <span>Arrythmia probabitily</span>
                        </Col> 
                        <Col xs={4}>
                            <span>Segment length</span>
                        </Col> 
                    </Row>
                </Grid>
            </div>
        );
    }
}
