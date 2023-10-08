import React, {FC} from 'react'
import "../App.css";
import Filters from "./Filter"
type ISidebar = {
  filtersFunction: (params:any) => void;
}
const Sidebar:FC<ISidebar> =({filtersFunction}) => {
  
  return (
    <div className="Sidebar" style={{float: "left",}}>
        <h1 style={{color: "white"}}>Dashboard</h1> 
      <Filters filterHandler={filtersFunction} />
    </div>
  )
}

export default Sidebar