import React from 'react'
import { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import { inject, observer } from 'mobx-react'


const options = {
    legend: { display: false },
    title: { display: false },
    font: {
           family: 'Roboto Condensed',
           weight: 100,
           size: 12,
           color: '#999999'
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
                fontSize: 12
            },
            scaleLabel: {
                display: true,
                labelString: 'Average length (sec)'
            }
        }],
        xAxes: [{
            ticks: {
                fontSize: 12
            }
        }]
    },
    maintainAspectRatio: false,
    responsive: true,

    events: false,
    tooltips: { enabled: false },
    animation: {
        duration: 1,
        onComplete: function () {
            var chartInstance = this.chart,
                ctx = chartInstance.ctx;
            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
            ctx.fillStyle = "#999999";
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';

            this.data.datasets.forEach(function (dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function (bar, index) {
                    var data = dataset.data[index];
                    ctx.fillText(data, bar._model.x, bar._model.y - 5);
                });
            });
        }
    }
}


@inject("ecg_store")
@observer
export default class EcgSegmentsBarChart extends Component {
    render() {
        const item = this.props.ecg_store.get(this.props.pid)

        let data = {
            labels: ['QRS', 'QT', 'PQ'],
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