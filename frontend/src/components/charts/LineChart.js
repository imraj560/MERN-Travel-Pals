// LineChart.js
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { UseAuthContext } from '../../hooks/UseAuthContext';

// Register the necessary components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const LineChart = ({chartdata}) => {

    const { user } = UseAuthContext()
    const [tdata, seTdata] = useState([])

   



  // Data and configuration for the chart
  const data = {
    labels: ['Weights','Calisthenics','Cardio'],
    datasets: [
      {
        label: 'Type Trend',
        data: chartdata,
        fill: false,
        backgroundColor: 'gray',
        borderColor: 'green',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;