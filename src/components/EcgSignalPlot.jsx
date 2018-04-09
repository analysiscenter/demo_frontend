import React from 'react'
import { Component } from 'react'

export default class EcgSignalPlot extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isLoaded: false,
            width: 0,
            height: 0,
            id: null
        };
        
        // this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    componentDidMount() {
        console.log("componentDidMount");
        if (this.props.signal !== null) {
            console.log("componentDidMount true");            
            MakeSubplots(this.props.signal,
                         this.props.fs,
                         this.props.signame,
                         this.props.layout_type,
                         this.props.width,
                         this.props.height,
                         this.props.div_id)
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps");
        if (nextProps.signal !== null) {
            if (this.state.id !== nextProps.id) {
                this.setState({id: nextProps.id});
                MakeSubplots(nextProps.signal,
                             nextProps.fs,
                             nextProps.signame,
                             nextProps.layout_type,
                             nextProps.width,
                             nextProps.height,
                             nextProps.div_id)
            }
            else {
                if ((this.state.width !== nextProps.width) || (this.state.height !== nextProps.height)) {
                    this.setState({width: nextProps.width, height: nextProps.height});
                    // var update = {width: nextProps.width, height: nextProps.height};
                    // updatePlot(nextProps.div_id, update)
                    MakeSubplots(nextProps.signal,
                                 nextProps.fs,
                                 nextProps.signame,
                                 nextProps.layout_type,
                                 nextProps.width,
                                 nextProps.height,
                                 nextProps.div_id)
                }
            }
        }
    }
    
    render() {
        return (
            <div>
                <div id={this.props.div_id}></div>
            </div>
        )
    }
}

function updatePlot(div_id, update)
{
    console.log("Relayout", update);
    Plotly.relayout(div_id, update)
}

function MakeSubplots(signal, fs, signame, layout_type, width, height, div_id) {
    var traces = []
    if (layout_type !== "nx1") {
        for (var i = 0; i < signal.length; i++) { 
            var trace = {
                x: Array.from(Array(signal[i].length).keys()).map(function(x) { return x / fs; }),
                y: signal[i].slice(),
                xaxis: 'x' + (i + 1).toString(),
                yaxis: 'y' + (i + 1).toString(),
                type: 'scatter',
                marker: {color: "blue"},
                name: signame[i]
                // mode: 'lines+text',
                // text: ['V1'],
                // textposition: "right+top",
                // textfont: {
                    // family: 'sans serif',
                    // size: 18,
                    // color: 'black'
                // }
            };
            traces.push(trace);
        }
        
        var annotations = [];
        for (var i = 0; i < 12; i++) { 
            var annotation = {
            x: 0.5,
                y: Math.max( ...traces[i].y ),
                xref: traces[i].xaxis,
                yref: traces[i].yaxis,
                text: traces[i].name,
                font: {
                    color: "black",
                    size: 22
                },
                showarrow: false
            }
            annotations.push(annotation);
    }
    }
    else {
        var trace = {
            x: Array.from(Array(signal.length).keys()).map(function(x) { return x / fs; }),
            y: signal.slice(),
            type: 'scatter',
            marker: {color: "blue"},
            name: signame
        };
        traces.push(trace);
    }
    
    if (layout_type === "nx1") {
        var layout = {
            margin: {
               t: 20,
               l: 40,
               r: 30,
            },
            width: 0.65*width,
            height: 0.7*height,
            xaxis: {
                title: 'Время (сек)'
            },
            yaxis: {
                title: 'Амплитуда (мВ)'
            },
            font: {
               family: 'Roboto Condensed',
               weight: 100,
               size: 12,
               color: '#999999'
            }
        };
    }
    
    if (layout_type === "6x2") {
        const mx = 0.02;
        const my = 0.03;
        var layout = {
          showlegend: false,
          width: 0.67*width,
          height: 0.7*height,
          margin: {
            l: 20,
            r: 20,
            b: 0,
            t: 30
          },
          xaxis: {domain: [0, 0.5 - mx]},
          yaxis: {domain: [5./6. + my, 1]},
          xaxis12: {
            domain: [0.5 + mx, 1],
            anchor: 'y12'
          },
          xaxis11: {
            domain: [0.5 + mx, 1],
            anchor: 'y11'
          },
          xaxis10: {
            domain: [0.5 + mx, 1],
            anchor: 'y10'
          },
          xaxis9: {
            domain: [0.5 + mx, 1],
            anchor: 'y9'
          },
          xaxis8: {
            domain: [0.5 + mx, 1],
            anchor: 'y8'
          },
          xaxis7: {
            domain: [0.5 + mx, 1],
            anchor: 'y7'
          },
          xaxis6: {
            domain: [0., 0.5 - mx],
            anchor: 'y6'
          },
          xaxis5: {
            domain: [0., 0.5 - mx],
            anchor: 'y5'
          },
          xaxis4: {
            domain: [0., 0.5 - mx],
            anchor: 'y4'
          },
          xaxis3: {
            domain: [0., 0.5 - mx],
            anchor: 'y3'
          },
          xaxis2: {
              domain: [0., 0.5 - mx],
              anchor: 'y2'
          },
          yaxis2: {
            domain: [4./6. + my, 5./6. - my],
            anchor: 'x2'
          },
          yaxis3: {
            domain: [3./6. + my, 4./6. - my],
            anchor: 'x3'
          },
          yaxis4: {
            domain: [2./6. + my, 3./6. - my],
            anchor: 'x4'
          },
          yaxis5: {
            domain: [1./6. + my, 2./6. - my],
            anchor: 'x5'
          },
          yaxis6: {
            domain: [0, 1./6.- my],
            anchor: 'x6'
          },
          yaxis7: {
            domain: [5./6. + my, 1],
            anchor: 'x7'
          },
          yaxis8: {
            domain: [4./6. + my, 5./6.- my],
            anchor: 'x8'
          },
          yaxis9: {
            domain: [3./6. + my, 4./6. - my],
            anchor: 'x9'
          },
          yaxis10: {
            domain: [2./6. + my, 3./6. - my],
            anchor: 'x10'
          },
          yaxis11: {
            domain: [1./6. + my, 2./6. - my],
            anchor: 'x11'
          },
          yaxis12: {
            domain: [0, 1./6. - my],
            anchor: 'x12'
          },
          annotations: annotations
        };
    }
    
    console.log("CREATE PLOT");
    Plotly.react(div_id, traces, layout);
}

