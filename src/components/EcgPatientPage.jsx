import React from 'react';
import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, Row, Col } from 'react-bootstrap'
import { Icon } from 'react-fa'
import { Link } from 'react-router-dom';

import ActionButton from './ActionButton.jsx';
import LoadSpinner from './LoadSpinner.jsx'
import EcgPatientInfoTable from './EcgPatientInfoTable.jsx'
import EcgSignalPlot from './EcgSignalPlot.jsx';
import EcgPatientResultCharts from './EcgPatientResultCharts.jsx';

@inject("ecg_store")
@observer
export default class EcgPatientPage extends Component {
    constructor(props) {
        super(props);
        this.props.ecg_store.getSignal(props.match.params.pid);
        this.state = {
            pid: props.match.params.pid
        };      
    }

    render() {
        if(this.props.ecg_store.items.get(this.state.pid).signal === null)
            return this.renderLoading()
        else
            return this.renderPage()
    }
    
    renderLoading() {
        return (
            <div className='page main Big centered'>
                <LoadSpinner />
            </div>
        );
        
    }
    
    renderPage() {
        let signal = this.props.ecg_store.items.get(this.state.pid).signal;
        let frequency = this.props.ecg_store.items.get(this.state.pid).frequency;
        let annotation = this.props.ecg_store.items.get(this.state.pid).annotation;
        
        return (
            <div className='page main'>                
                <Grid fluid>
                    <Row>
                        <Col xs={1}>
                            <Link to="/ecg/"><Icon name='arrow-left'></Icon></Link>
                        </Col>
                        <Col xs={1}>
                            <Link to="/"><Icon name='home'></Icon></Link>
                        </Col>
                    </Row>
                    <Row>
                        <h1>ECG signal analysis</h1>
                    </Row>
                    <Row>
                        <EcgPatientInfoTable pid={this.state.pid}/>
                    </Row>
                    <Row>
                        <EcgSignalPlot signal={signal} fs={frequency} annotation={annotation} />
                    </Row>
                    <Row>
                        <ActionButton title={'Run ECG analysis'} pid={this.state.pid} />
                    </Row>
                    <Row>
                        <EcgPatientResultCharts pid={this.state.pid}/>
                    </Row>
                </Grid>            
            </div>
        );
    }
}
