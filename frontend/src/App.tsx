import React, { useState, useEffect, useRef, FC } from "react";
import "./App.css";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import Sidebar from "./components/Sidebar";
import PieChart from "./components/PieChart";
import Datatable from "./components/Datatable";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

type ITableData = {
  model_name: string;
  model_type: string;
  name: string;
  sales: Number;
  year: Number;
  inventory: Number;
  serviced_vechiles: Number;
}[]


const App: FC = () => {
  const [salesData, setSalesData] = useState<ITableData>([]);
  const data = React.useMemo<ITableData>(() => salesData, [salesData]);
  const [loading, setLoading] = useState(false);
  type ITotalDataType = {
    sum: string;
    year: string;
  };
  type ITotalInventoryDataType = {
    sum: string;
    year: string;
  };
  type ITotalServicedVechilesDataType = {
    sum: string;
    year: string;
  };
  const [totalSalesData, setTotalSalesData] = useState<ITotalDataType[]>([]);
  const [totalInventoryData, setTotalInventoryData] = useState<ITotalInventoryDataType[]>([]);
  const [totalServiceData, setTotalServiceData] = useState<ITotalServicedVechilesDataType[]>([]);
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
      Header: "Year",
      accessor: "year",
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
      Header: "Inventory",
      accessor: "inventory",
    },
    {
      Header: "Serviced Cars",
      accessor: "serviced_vechiles",
    },
  ], []);
  const initialState = {
    pageSize: 5,
    pageIndex: 0
  };
  const pieChartData = {
    labels: totalSalesData.map((records) => records.year),
    datasets: [
      {
        label: "Cars sold",
        data: totalSalesData.map((records) => records.sum),
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
  const barChartData = {
    labels: totalInventoryData.map((records) => records.year),
    datasets: [
      {
        label: "No. of cars in Inventory",
        data: totalInventoryData.map((records) => records.sum),
        backgroundColor: [
          "wheat",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };
  const lineChartData = {
    labels: totalServiceData.map((records) => records.year),
    datasets: [
      {
        label: "No. of cars serviced",
        data: totalServiceData.map((records) => records.sum),
        backgroundColor: ["#50AF95"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };
  const filterHandler = (values) => {
    Axios.get(`/api/cars/filter`,
      {
        params: {
          oem: values.oem,
          vechileType: values.vehicleType,
        },
      }
    ).then((response) => {
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
    ).then((response) => {
      setTotalSalesData(response.data);
    }).catch((err) => {
      console.warn(err);
    });
    Axios.get(`/api/cars/serviced_vechiles/filter`,
      {
        params: {
          oem: values.oem,
          vechileType: values.vehicleType,
        },
      }
    ).then((response) => {
      setTotalServiceData(response.data);
    }).catch((err) => {
      console.warn(err);
    });
    Axios.get(`/api/cars/inventory/filter`,
      {
        params: {
          oem: values.oem,
          vechileType: values.vehicleType,
        },
      }
    ).then((response) => {
      setTotalInventoryData(response.data);
    }).catch((err) => {
      console.warn(err);
    });
  }
  const navigate = useNavigate();
  function onLogoutClicked(event) {
    navigate("/Login");
  }
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      setLoading(true);
      Axios.get("/api/cars").then((response) => {
        setSalesData(response.data);
        setLoading(false);
      }).catch((err) => {
        console.warn(err)
        setLoading(false);
      });
    }
  }, []);
  useEffect(() => {
    Axios.get("/api/cars/sales").then((response) => {
      setTotalSalesData(response.data);
    }).catch(err => console.warn(err));
  }, []);
  useEffect(() => {
    Axios.get("/api/cars/inventory").then((response) => {
      setTotalInventoryData(response.data);
    }).catch(err => console.warn(err));
  }, []);
  useEffect(() => {
    Axios.get("/api/cars/serviced_vechiles").then((response) => {
      setTotalServiceData(response.data);
    }).catch(err => console.warn(err));
  }, []);
  return (
    <>
      {loading ? (<p>Loading...</p>) :
        (
          <div className="App">
            <div style={{ backgroundColor: "#49627a", margin: 0, padding: "22px", color: "white" }} >
              <h3 style={{ margin: 0, textAlign: "right" }}>Welcome {localStorage.getItem("name")}
              </h3>
              <a href="#" onClick={onLogoutClicked} style={{ float: "right", color: "wheat" }}>Logout</a>
            </div>
            <Sidebar filterHandler={filterHandler} />
            <div style={{ width: 350, float: "left", padding: 5, margin: 5 }}>
              <h3>Inventory of cars</h3>
              <BarChart chartData={barChartData} />
            </div>
            <div style={{ width: 350, float: "left", padding: 5, margin: 5 }}>
              <h3>Serviced cars</h3>
              <LineChart chartData={lineChartData} />
            </div>
            <div style={{ width: 350, height: 200, float: "left", padding: 5, margin: 5 }}>
              <h3>Car sales</h3>
              <PieChart chartData={pieChartData} />
            </div>
            <div style={{ float: "left", padding: "30px", margin: 10 }}>
              <h3>Car sales details</h3>
              <Datatable data={data} columns={columns} initialState={initialState} />
            </div>
          </div>
        )};
    </>
  )
}

export default App;
