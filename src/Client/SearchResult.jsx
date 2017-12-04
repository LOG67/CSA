import React, { Component } from 'react'
import Chart from 'chart.js'
import moment from 'moment'

export default class SearchResult extends Component {
    componentDidMount() {
        drawChart(this.props.result.quotes)
    }

    render() {
        return (
            <canvas id="chart" />
        )
    }
}

function drawChart(quotes) {
    let ctx = document.getElementById("chart")
    let options = generateChartOptions()
    let labels = quotes.map(q => moment(q.date).format('MMM D'))
    let openQuotesData = quotes.map(q => q.open)
    let closeQuotesData = quotes.map(q => q.close)
    let config = {
        type: 'line',
        options,
        data: {
            labels,
            datasets: [
                {
                    label: "Opening Quotes",
                    backgroundColor: 'rgba(255,99,132,1)',
                    borderColor: 'rgba(255,99,132,1)',
                    fill: false,
                    data: openQuotesData,
                },
                {
                    label: "Closing Quotes",
                    backgroundColor: 'rgba(54, 162, 235, 1)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    fill: false,
                    data: closeQuotesData,
                },
            ],
        },
    }
    new Chart(ctx, config)
}

function generateChartOptions() {
    return {
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
}
