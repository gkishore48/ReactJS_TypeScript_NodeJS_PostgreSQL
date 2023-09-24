import React, {FC} from "react";
import { Bar } from "react-chartjs-2";
// import { Chart } from 'chart.js/auto'
// import { Chart as ChartJS } from "chart.js/auto";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)
type props ={
  chartData :  {
    labels: string[];
    datasets: {
        label: string;
        data: string[];
        backgroundColor: string[];
        borderColor: string;
        borderWidth: number;
    }[]
  }
}

const BarChart:FC<props> = ({ chartData }) => {
  return <Bar data={chartData} />;
}

export default BarChart;