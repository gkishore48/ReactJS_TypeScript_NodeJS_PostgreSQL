import React,{FC} from 'react'
import {Pie} from 'react-chartjs-2'
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
// import { Chart } from 'react-chartjs-2'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
const PieChart:FC<props> = ({chartData}) => {
  return <Pie data={chartData} options={{maintainAspectRatio: false,}} />
}

export default PieChart