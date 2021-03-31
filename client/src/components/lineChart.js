import React from 'react'
import { Line } from '@reactchartjs/react-chart.js'

// https://code.tutsplus.com/tutorials/getting-started-with-chartjs-scales--cms-28477
const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes: [{
        type: "time",
        time: {
          unit: 'minute',
          unitStepSize: 5,
          round: 'second',
          tooltipFormat: "h:mm:ss a",
          displayFormats: {
            hour: 'MMM D, h:mm A'
          }
        }
      }
    ]
  },
}

// Example from https://github.com/reactchartjs/react-chartjs-2/blob/react16/example/src/charts/Line.js
const LineChart = ({data, title}) => (
  <>
    <div className='header'>
      <h1 className='title'>{title}</h1>
    </div>
    <Line data={data} options={options} />
  </>
)

export default LineChart