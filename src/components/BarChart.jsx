import React from 'react';
import { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { inject, observer } from 'mobx-react';

const options = {
    legend: { display: false },
    title: { display: false },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
                fontSize: 18
            }
        }],
        xAxes: [{
            ticks: {
                fontSize: 18
            }
        }]
    },
    maintainAspectRatio: false,
    responsive: true
};

@inject("ecg_store")
@observer
export default class BarChart extends Component {
    render() {
        let item = this.props.ecg_store.items.get(this.props.pid);
        if (item.inference !== null) {
            var qrs_t = item.inference.qrs_interval;
            var t_wave = item.inference.qt_interval;
            var p_wave = item.inference.pq_interval;
        }
        else {
            var qrs_t = null;
            var t_wave = null;
            var p_wave = null;
        }
        
        let data = {
            labels: ['QRS segment', 'T wave', 'P wave'],
            datasets: [
                {
                    data: [qrs_t, t_wave, p_wave],
                    backgroundColor: ['rgba(255,19,12,0.2)', 'rgba(255,19,132,0.2)', 'rgba(55,99,192,0.2)']
                }
            ],
        };
        return (
            <div className='page item barChart'>            
                <Bar data={data} options={options}/>
            </div>
        );
    }
}
