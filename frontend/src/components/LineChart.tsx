import React, {FC} from 'react'
import {Line} from 'react-chartjs-2';
// import { Chart } from 'chart.js/auto';
// import {Chart as ChartJS} from 'chart.js/auto'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  LineElement,
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

const LineChart:FC<props> = ({chartData}) => {
  return <Line data={chartData} />
}

export default LineChart