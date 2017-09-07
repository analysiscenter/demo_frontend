import React from 'react';
import { Component } from 'react';

import ecgStore from './Stores.jsx'

export default class EcgSignalPlot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
    }
    
    componentDidMount() {
        if (this.props.signal) {
            MakePlot(this.props.signal, this.props.fs, this.props.annotation, 'plot');
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.signal) {
            MakePlot(nextProps.signal, nextProps.fs, nextProps.annotation, 'plot');
        }
    }
    
    render() {
        return (
            <div>
                <div id="plot"></div>
            </div>
        )
    }
}

function MakePlot(signal, fs, annotation, div_id) {
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
