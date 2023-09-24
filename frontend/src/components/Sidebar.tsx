import React, {FC} from 'react'
import "../App.css";
import Filters from "./Filter"
type ISidebar = {
  filterHandler: (params:any) => void;
}
const Sidebar:FC<ISidebar> =({filterHandler}) => {
  
  return (
    <div className="Sidebar" style={{float: "left",}}>
        <h1 style={{color: "white"}}>Dashboard</h1> 
      <Filters filterHandler={filterHandler} />
    </div>
  )
}

export default Sidebar