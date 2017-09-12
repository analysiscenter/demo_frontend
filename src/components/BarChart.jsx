import React from 'react'
import { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import { inject, observer } from 'mobx-react'


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
}


@inject("ecg_store")
@observer
export default class EcgBarChart extends Component {
    render() {
        const item = this.props.ecg_store.items.get(this.props.pid)

        let data = {
            labels: ['QRS segment', 'T wave', 'P wave'],
            datasets: [
                {
                    data: [item.qrs_t, item.t_wave, item.p_wave],
                    backgroundColor: ['rgba(255,19,12,0.2)', 'rgba(255,19,132,0.2)', 'rgba(55,99,192,0.2)']
                }
            ],
        }

        return (
            <div className='bar-chart'>
                <Bar data={data} options={options}/>
            </div>
        );
    }
}
