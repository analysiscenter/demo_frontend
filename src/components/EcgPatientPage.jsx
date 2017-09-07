import React from 'react';
import { Component } from 'react';
import { observer } from 'mobx-react';
import { Grid, Row, Col } from 'react-bootstrap'
import { Icon } from 'react-fa'
import { Link } from 'react-router-dom';

import ActionButton from './ActionButton.jsx';
import LoadSpinner from './LoadSpinner.jsx'
import EcgPatientInfoTable from './EcgPatientInfoTable.jsx'
import EcgSignalPlot from './EcgSignalPlot.jsx';
import EcgPatientResultCharts from './EcgPatientResultCharts.jsx';

import ecgStore from './Stores.jsx';

@observer
export class EcgPatientPage extends Component {
    constructor(props) {
        super(props);
        ecgStore.getSignal(props.match.params.pid);
        this.state = {
            pid: props.match.params.pid
        };      
    }

    render() {
        if(ecgStore.signal)
            return this.renderPage()
        else
            return this.renderLoading()
    }
    
    renderLoading() {
        return (
            <div className='page main Big centered'>
                <LoadSpinner />
            </div>
        );
        
    }
    
    renderPage() {
        return (
            <div className='page main'>
                <div>                
                    <Grid fluid>
                        <Row>
                            <Col xs={1}>
                                <Link to="/ecg/"><Icon name='arrow-left' className='small'></Icon></Link>
                            </Col>
                            <Col xs={1}>
                                <Link to="/"><Icon name='home' className='small'></Icon></Link>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            
                <div>
                    <h1>ECG signal analysis</h1>
                </div>  
                
                <EcgPatientInfoTable />
 
                <EcgSignalPlot signal={ecgStore.signal} 
                               fs={ecgStore.frequency} 
                               annotation={ecgStore.annotation} />
                
                <ActionButton title={'Run ECG analysis'} className={'actionButton'}/>
                
                <EcgPatientResultCharts />
            
            </div>
        );
    }
}
