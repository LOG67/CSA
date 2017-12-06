import React, { Component } from 'react'
import { Line, Radar } from 'react-chartjs-2'
import moment from 'moment'

export default class SearchResult extends Component {
    render() {
        if (_.isEmpty(this.props.result)) {
            return (<div />)
        }
        let { quotes, tones } = this.props.result
        let lineChart = generateLineChart(quotes)
        let radarChart = generateRadarChart(tones)
        return (
                <div className="container-fluid">
                    <div className="row">
                        {radarChart}
                    </div>
                    <div className="row">
                        {lineChart}
                    </div>
                </div>

        )
    }
}

function generateRadarChart(tones) {
    let data = {
        labels: tones.map(t => t.tone_name),
        datasets: [
            {
                label: 'Sentiments',
                backgroundColor: 'rgba(67, 249, 119, 0.5)',
                borderColor: 'rgba(40, 200, 100, 1)',
                fill: true,
                data: tones.map(t => t.score),
            }
        ],
    }
    return <Radar
        options={{ responsive: true }}
        labels={tones.map(t => t.tone_name)}
        data= {data}
    />
}

function generateLineChart(quotes) {
    let options = {
        responsive: true,
        title:{
            display:true,
            text:'Stock Quotes'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Date(day)'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Quote'
                }
            }]
        }
    }
    let labels = quotes.map(q => moment(q.date).format('MMM D'))
    let openQuotesData = quotes.map(q => q.open)
    let closeQuotesData = quotes.map(q => q.close)
    let data = {
        labels,
        datasets: [
            {
                label: 'Opening Quotes',
                backgroundColor: 'rgba(255,99,132,1)',
                borderColor: 'rgba(255,99,132,1)',
                fill: false,
                data: openQuotesData,
            },
            {
                label: 'Closing Quotes',
                backgroundColor: 'rgba(54, 162, 235, 1)',
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: false,
                data: closeQuotesData,
            },
        ],
    }

    return <Line
                options={options}
                labels={labels}
                data={data}
            />

}
