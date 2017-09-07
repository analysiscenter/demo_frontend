import React from 'react';
import { Component } from 'react';
import { LinkButton } from './Common.jsx'
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Icon } from 'react-fa';

import BarChart from './BarChart.jsx'
import ChangingProgressbar from './ChangingProgressbar.jsx'


export class MainPage extends Component {
    render() {
        
        return (
            <div className="page main">
                <div>
                    <h1>Выберите направление</h1>             
                </div>
                
                <MainButtonGroup />
                
                <Grid fluid>
                    <Row>
                        <Col xs={4}>
                            <Icon name='heartbeat' className='Big'></Icon>
                            <span className='icon-text'>75 bpm</span>
                            <br />
                            Heart beat rate
                        </Col>
                        <Col xs={4}>
                            <ChangingProgressbar percentages={Array.from(Array(61).keys())}
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
                            Signal segment rate
                        </Col>    
                    </Row>
                </Grid>
                
            
            
            </div>
            
        );
    }
}

export class MainButtonGroup extends Component {
    render() {
        return (
            <div className="buttonGroup">                
                <Grid fluid>
                    <Row className='row'>
                        <Col xs={6}>
                            <Link to="/ecg"><Icon name='heartbeat' className='big'><br />ECG</Icon></Link>
                        </Col>
                        <Col xs={6}>
                            <Link to="/ct"><Icon name='universal-access' className='big'><br />CT</Icon></Link>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
