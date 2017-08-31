import React from 'react';
import { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { LinkButton } from './Common.jsx'

import { observable } from 'mobx'; 

import ecgStore from './Stores.jsx'

@observer
export class ActionButton extends Component {
    constructor(props) {
        super(props);
        this.runAnalysis = this.runAnalysis.bind(this);
    }
    
    render() {
        return (
            <div>
                <button onClick={this.runAnalysis}>
                    {this.props.title}
                 </button>
            </div>
        );
    }
    
    runAnalysis() {
        ecgStore.getReport();
    }
}

@observer
export class EcgPatientInfoTable extends Component {
    render() {
        return (
            <div>
                <Grid fluid>
                    <Row>
                        <Col xs={12}>
                            Name
                        </Col>
                        <Col xs={12}>
                             {ecgStore.name}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            Frequency
                        </Col>
                        <Col xs={12}>
                            {ecgStore.frequency}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

@observer
export class EcgPatientResultsTable extends Component {
    render() {
        return (
            <div>
                <Grid fluid>
                    <Row>
                        <Col xs={12}>
                            Риск мерцательной аритмии
                        </Col>
                        <Col xs={12}>
                            {ecgStore.af_prob}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            ЧСС
                        </Col>
                        <Col xs={12}>
                            {ecgStore.heart_rate}
                        </Col>
                    </Row>
                </Grid>
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
export class EcgPatient extends Component {
    constructor(props) {
        super(props);
        ecgStore.getSignal(props.location.query.pid);
        this.state = {
            pid: props.location.query.pid
        };      
    }
       
    render() {
        return (
            <div>
                <div>
                    Ecg patient {this.state.pid}
                </div>  
                
                <div>
                    <EcgPatientInfoTable pid={this.state.pid}/>
                </div>
                
                <div>
                    <ActionButton title={'Run ECG analysis'} />
                </div>  
                            
                <div>
                    <BasicEcgSignalPlot signal={ecgStore.signal} fs={ecgStore.frequency} annotation={ecgStore.annotation}/>
                </div>
                
                <div>
                    <EcgPatientResultsTable name={ecgStore.name}/>
                </div>
                
                <div>
                    <LinkButton title={'Choose new patient'} path={'/ecg'} query={{}}/>
                </div>
                
                <div>
                    <LinkButton title={'Home'} path={'/'} query={{}}/>
                </div>
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
        shapes: shapes
	};  
	
	Plotly.newPlot(div_id, pdata, layout);
}
