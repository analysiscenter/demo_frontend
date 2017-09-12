import React from 'react'
import { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { Icon } from 'react-fa'
import { inject, observer } from 'mobx-react'

import ActionButton from './ActionButton.jsx';
import LoadSpinner from './LoadSpinner.jsx'
import EcgPatientInfoTable from './EcgPatientInfoTable.jsx'
import EcgSignalPlot from './EcgSignalPlot.jsx';
import EcgPatientResultCharts from './EcgPatientResultCharts.jsx';

@inject("ecg_store")
@observer
export default class ECGItemPage extends Component {
    constructor(props) {
        super(props);
        this.props.ecg_store.getSignal(props.match.params.id);
        this.state = {
            pid: props.match.params.id
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
            <div className='page main loading'>
                <LoadSpinner />
            </div>
        );
        
    }
    
    renderPage() {
        let signal = this.props.ecg_store.items.get(this.state.pid).signal;
        let frequency = this.props.ecg_store.items.get(this.state.pid).frequency;
        if (this.props.ecg_store.items.get(this.state.pid).inference !== null )
        {
            var annotation = [];
            annotation.push(this.props.ecg_store.items.get(this.state.pid).inference.qrs_segments);
            annotation.push(this.props.ecg_store.items.get(this.state.pid).inference.p_segments);
            annotation.push(this.props.ecg_store.items.get(this.state.pid).inference.t_segments);
        }
        else {
            var annotation = null;
        }
        
        return (
            <div className='page item'>                
                <Grid fluid>
                    <Row className='centered'>
                        <ActionButton title={'Run ECG analysis'} pid={this.state.pid} />
                    </Row>
                    
                    <Row>
                        <EcgPatientInfoTable pid={this.state.pid}/>
                    </Row>
                    <Row>
                        <EcgSignalPlot signal={signal} fs={frequency} annotation={annotation} />
                    </Row>
                    
                    <Row className='centered'>
                        <EcgPatientResultCharts pid={this.state.pid}/>
                    </Row>
                </Grid>            
            </div>
        );
    }
}
