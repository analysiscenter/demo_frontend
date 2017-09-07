import React from 'react';
import { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { observer } from 'mobx-react';

import ecgStore from './Stores.jsx';

const options = {
    legend: { display: false },
    title: { display: false },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
};

const _data = {
    labels: ['QRS segment', 'T wave', 'P wave'],
    datasets: [
        {
            data: [25, 20, 30],
            backgroundColor: ['rgba(255,19,12,0.2)', 'rgba(255,19,132,0.2)', 'rgba(55,99,192,0.2)']
        }
    ],
};

@observer
export default class BarChart extends Component {
    render() {
        var data = {
            labels: ['QRS segment', 'T wave', 'P wave'],
            datasets: [
                {
                    data: [ecgStore.qrs_t, ecgStore.t_wave, ecgStore.p_wave],
                    backgroundColor: ['rgba(255,19,12,0.2)', 'rgba(255,19,132,0.2)', 'rgba(55,99,192,0.2)']
                }
            ],
        };
        return (
            <div>            
                <Bar data={data} options={options}/>
            </div>
        );
    }
}
