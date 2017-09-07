import React from 'react';
import { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { LinkButton } from './Common.jsx'

import { observable } from 'mobx'; 

import ecgStore from './Stores.jsx'

@observer
export class ActionButton extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            isRunning: false
        }; 
    }

    render() {
        let isRunning = this.state.isRunning;
        if (ecgStore.isProcessed) {
            isRunning = false;
        }
        return (
            <Button bsStyle="primary"
                    disabled={isRunning}
                    onClick={!ecgStore.isProcessed ? this.handleClick : null}>
                {isRunning ? 'Analysis is in progress...' : 'Run analysis'}
            </Button>
        );
    }

    handleClick() {
        this.setState({isRunning: true});
        ecgStore.getReport();
    }
}

@observer
export class EcgPatientInfoTable extends Component {
    render() {
        var patientInfo = [{
            id: ecgStore.pid,
            name: ecgStore.name,
            fs: ecgStore.frequency
            }
        ];
        return (
            <div>
                <BootstrapTable data={patientInfo} striped condensed hover>
                    <TableHeaderColumn isKey dataField='id'>Patient ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name'>Patient Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='fs'>Signal sample rate</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

@observer
export class EcgPatientResultsTable extends Component {
    render() {
        var patientInfo = [{
            af_prob: ecgStore.af_prob,
            heart_rate: ecgStore.heart_rate
            }
        ];
        return (
            <div>
                <BootstrapTable data={patientInfo} striped condensed hover>
                    <TableHeaderColumn isKey dataField='af_prob'>AF probability</TableHeaderColumn>
                    <TableHeaderColumn dataField='heart_rate'>Heart rate</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export class BasicEcgSignalPlot extends Component {
    componentDidMount() {
        console.time('make_plot');
        MakePlot(this.props.signal, this.props.fs, this.props.annotation, 'plot');
        console.timeEnd('make_plot');
    }
    
    componentWillReceiveProps(nextProps) {
        console.time('make_plot');
        MakePlot(nextProps.signal, nextProps.fs, nextProps.annotation, 'plot');
        console.timeEnd('make_plot');
    }
    
    render() {
        return (
            <div id="plot"></div>
        )
    }
}

@observer
export class CTPatientPage extends Component {
    constructor(props) {
        super(props);
        ecgStore.getSignal(props.match.params.pid);
        this.state = {
            pid: props.match.params.pid
        };      
    }
       
    render() {
        return (
            <div className='page main'>
                <div>
                    <h1>ECG signal analysis</h1>
                </div>  
                
                <EcgPatientInfoTable />
                
                <ActionButton title={'Run ECG analysis'} className={'actionButton'}/>
 
                <BasicEcgSignalPlot signal={ecgStore.signal} 
                                    fs={ecgStore.frequency} 
                                    annotation={ecgStore.annotation} />
                
                <EcgPatientResultsTable />
            
                <LinkButton title={'Choose new patient'} path={'/ecg'} className='backButton'/>
            
                <LinkButton title={'Home'} path={'/'} className='homeButton'/>
            </div>
        );
    }
}

function MakePlot(signal, fs, annotation, div_id) {
    if (signal === null) {
        var pdata = [{
            y: [1,2,3,4,5],
            type: 'scatter'
        }];
        Plotly.newPlot(div_id, pdata);
        return 
    }
    
	var pdata = [{
        x: Array.from(Array(signal.length).keys()).map(function(x) { return x / fs; }),
        y: signal.slice(),
        type: 'scatter'
	}];
    
    var shapes = [];
    if (annotation !== null) {
        var colors = ['red', 'orange', 'blue'];
        var names = ['QRS segment', 'P wave', 'T wave']
        for (var k = 0; k < 3; k++) { 
            var interval = annotation[k].slice()
            var begin = interval[0];
            var end = interval[1];
            for (var i = 0; i < begin.length; i++) {
                shapes.push({
                    type: 'rect',
                    xref: 'x',
                    yref: 'paper',
                    x0: begin[i] / fs,
                    y0: 0,
                    x1: end[i] / fs,
                    y1: 1,
                    fillcolor: colors[k],
                    name: names[k],
                    opacity: 0.2,
                    line: { 
                        width: 0
                    }
                })
            }
        }
    }
    
    var layout = {
		title: 'ECG signal',
		xaxis: {
			title: 'Time (s)'
		},
		yaxis: {
			title: 'Amplitude (mV)'
		},
        shapes: shapes,
        showlegend: true
	};  
	
	Plotly.newPlot(div_id, pdata, layout);
}
