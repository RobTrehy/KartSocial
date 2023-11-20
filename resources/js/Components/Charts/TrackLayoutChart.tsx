import {
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import React from 'react';

interface Props {
  chartData: ChartData;
  title: string;
}
interface ChartData {
  labels: string[];
  data: Array<any>;
}

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
);

const buildData = ({ data, labels }: ChartData) => ({
  labels: labels,
  datasets: [
    {
      label: '',
      data: data,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 1)',
      pointBackgroundColor: 'rgba(255, 255, 255, 1)',
      tension: 0.4,
    },
  ],
});

const TrackLayoutChart = ({ chartData, title }: Props) => {
  if (chartData.data.length === 0) {
    return (
      <div className="w-full flex flex-col">
        <h2 className="text-xl font-bold">{title}</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-48 h-48 my-2 mx-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
          />
        </svg>
        No Laps Recorded!
      </div>
    );
  }

  const data = buildData(chartData);

  const options = {
    interaction: {
      intersect: false,
      mode: 'nearest',
      axis: 'xy',
    },
    plugins: {
      title: {
        display: true,
        text: title,
        color: '#FFFFFF',
        font: {
          size: '20',
          family: 'Figtree',
        },
        padding: {
          top: 0,
          bottom: 5,
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          color: 'rgba(255, 255, 255, 1)',
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 1)',
        },
        grid: {
          circular: true,
          borderColor: 'rgba(255, 255, 255, .2)',
          color: 'rgba(255, 255, 255, .2)',
          borderDash: [5, 5],
        },
      },
    },
    layout: {
      padding: {
        right: 10,
      },
    },
  };

  return (
    <div className="w-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default TrackLayoutChart;
