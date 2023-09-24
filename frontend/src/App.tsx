import React, { useState, useEffect, useRef, FC } from "react";
import "./App.css";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import Sidebar from "./components/Sidebar";
import PieChart from "./components/PieChart";
import Datatable from "./components/Datatable";
import Axios from "axios"; 
import {useNavigate} from 'react-router-dom';

type ITableData = {
  model_name: string;
  model_type: string;
  name: string;
  sales: Number;
  year: Number;
}[]


const App:FC = () => {
  const [salesData, setSalesData] = useState<ITableData>([]);
  const data = React.useMemo<ITableData>(() => salesData, [salesData]); 
  const [loading, setLoading] = useState(false);
  type totalDataType = {
    sum: string;
    year: string;
    };
    
  const [totalData, setTotalData] = useState<totalDataType[]>([]);
  const initialized = useRef(false);
  const columns = React.useMemo(() => [
    {
      Header: "OEM",
      accessor: "name",
    },
    {
      Header: "Model",
      accessor: "model_name",
    },
    {
      Header: "Vechile Type",
      accessor: "model_type",
    },
    {
      Header: "Cars sold",
      accessor: "sales",
    },
    {
      Header: "Year",
      accessor: "year",
    },
  ], []);
  const initialState = {
    pageSize: 5,
    pageIndex: 0
  };
  const graphData = {
    labels: totalData.map((records) => records.year),
    datasets: [
      {
        label: "Cars sold",
        data: totalData.map((records) => records.sum),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };
  const filterHandler =(values) => {
    Axios.get(`/api/cars/filter`,
    {
      params: {
        oem: values.oem,
        vechileType: values.vehicleType,
      },
    }
    ).then((response) =>
    {
        setSalesData(response.data);
    }).catch((err) => {
      console.warn(err);
    });
    Axios.get(`/api/cars/sales/filter`,
    {
      params: {
        oem: values.oem,
        vechileType: values.vehicleType,
      },
    }
    ).then((response) =>
    {
        setTotalData(response.data);
    }).catch((err) => {
      console.warn(err);
    });
  } 
  const navigate = useNavigate();
  function onLogoutClicked(event){
    navigate("/Login");
  }
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      setLoading(true);
      Axios.get("/api/cars").then((response) =>  
      {
          setSalesData(response.data);
          setLoading(false);
      }).catch((err) => {
        console.warn(err)
        setLoading(false);
      });
    }
  }, []);
  useEffect(() => { 
    Axios.get("/api/cars/sales").then((response) =>  
    {
      setTotalData(response.data);
    }).catch(err => console.warn(err));
  }, []);

  return (
    <>
    { loading   ? ( <p>Loading...</p>) : 
    (
    <div className="App">
      <div style={{backgroundColor: "#49627a", margin:0, padding:"22px", color: "white"}} >
        <h3 style={{margin: 0, textAlign:"right"}}>Welcome {localStorage.getItem("name")}
        </h3>
        <a href="#"  onClick={onLogoutClicked} style={{float:"right",color:"wheat"}}>Logout</a>
      </div>
      <Sidebar filterHandler={filterHandler} />
      <div style={{ width: 350, float: "left", padding:5, margin:5 }}>
        <h3>Bar chart</h3>
        <BarChart chartData={graphData} />
      </div>
      <div style={{ width: 350, float: "left", padding:5, margin:5 }}>
      <h3>Line chart</h3>
        <LineChart chartData={graphData} />
      </div> 
      <div style={{ width: 350, height: 200, float: "left", padding:5, margin:5 }}>
      <h3>Pie chart</h3>
        <PieChart chartData={graphData} />
      </div>
      <div style ={{float: "left", padding:"30px", margin:10}}>
      <h3>Car sales details</h3>
      <Datatable data={data} columns={columns} initialState={initialState} />
      </div>
    </div>
    )};
    </>
  )
}

export default App;
