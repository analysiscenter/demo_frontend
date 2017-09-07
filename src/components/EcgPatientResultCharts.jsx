import React from 'react';
import { Component } from 'react';
import { observer } from 'mobx-react';
import { Icon } from 'react-fa'
import { Grid, Row, Col } from 'react-bootstrap'

import BarChart from './BarChart.jsx'
import ChangingProgressbar from './ChangingProgressbar.jsx'

import ecgStore from './Stores.jsx'

@observer
export default class EcgPatientResultCharts extends Component {
    render() {
        return (
            <div>               
                <Grid fluid>
                    <Row>
                        <Col xs={4}>
                            <Icon name='heartbeat' className='Big'></Icon>
                            <span className='icon-text'>
                                {ecgStore.heart_rate ? ecgStore.heart_rate + ' bpm' : null}
                            </span>
                            <span>Heart beat rate</span>
                        </Col>
                        <Col xs={4}>
                            <ChangingProgressbar percentages={Array.from(Array(ecgStore.af_prob ? Math.round( 100*ecgStore.af_prob ) + 1 : 1).keys())}
                                                 className='barchart'
                                                 textForPercentage={(percentage) => 
                                                 `${percentage}%`
                                                 } />
                            <br />
                            Arrythmia probability
                            
                        </Col>
                        <Col xs={4}>
                            <BarChart />
                            <br />
                            Signal segment length
                        </Col>    
                    </Row>
                </Grid>
            </div>
        );
    }
}
