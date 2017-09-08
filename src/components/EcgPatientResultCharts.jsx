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
                    <Row>
                        <Col xs={4}>
                            <Row>
                                <Col xs={6}>
                                    <Icon name='heartbeat'></Icon>
                                </Col> 
                                <Col xs={6}>
                                    {heart_rate ? heart_rate + ' bpm' : null}
                                </Col>                                
                            </Row>
                            <Row>
                                Heart beat rate
                            </Row>
                        </Col>
                        <Col xs={4}>
                            <Row>
                                <ChangingProgressbar percentages={Array.from(Array(af_prob ? Math.round( 100*af_prob ) + 1 : 1).keys())}
                                                    textForPercentage={(percentage) => 
                                                    `${percentage}%`
                                                    } />
                            </Row>
                            <Row>
                                Arrythmia probability
                            </Row>
                            
                        </Col>
                        <Col xs={4}>
                            <Row>
                                <BarChart pid={this.props.pid}/>
                            </Row>
                            <Row>
                                Signal segment length
                            </Row>
                        </Col>    
                    </Row>
                </Grid>
            </div>
        );
    }
}
