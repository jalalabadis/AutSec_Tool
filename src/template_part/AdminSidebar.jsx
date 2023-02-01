import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../Css/main.css'
import '../Css/wp-index.css'
import { onValue, getDatabase, ref } from 'firebase/database';

function AdminSidebar() {
  const db =getDatabase();
  const [PlanlistData, setplanlistData]=useState({PlanlistData:[]});

  useEffect(()=>{
onValue(ref(db, 'Plan_list'), snapshot=>{
  if(snapshot.exists()){
    const records = [];
    snapshot.forEach(childsnapshot=>{
records.push(childsnapshot.val())
    });
    setplanlistData({PlanlistData: records});
  }});
  },[])
  return (
    <div className="col-md-3 col-lg-2 px-0 position-fixed h-100 bg-white shadow-sm sidebar" id="sidebar">
    <h1 style={{textAlign: 'center', color: 'blue', border: '1px solid blue', borderRadius: '25px'}}>Dashboard</h1>
    <div className="list-group rounded-0">
      <Link  to={"/admin-panel"} className="list-group-item list-group-item-action active border-0 d-flex align-items-center">
        <span className="bi bi-border-all"></span>
        <span className="ml-2">Dashboard</span>
      </Link>

      <Link id="pathlink2" to={"/admin-panel/add-plan/"} className="list-group-item list-group-item-action border-0 align-items-center">
        <span className="bi bi-controller"></span>
        <span className="ml-2">Add Plan</span>
      </Link>

      <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#lobby-collapse">
        <div>
          <span className="bi bi-joystick"></span>
          <span className="ml-2">Plan List</span>
        </div>
        <span className="bi bi-chevron-down small"></span>
      </button>
      <div className="collapse" id="lobby-collapse" data-parent="#sidebar">
      <div className="list-group">
        {PlanlistData.PlanlistData.map((row, index)=>{
          return(
             
            <Link key={index} to={"/admin-panel/plan/"+row.ID} className="list-group-item list-group-item-action border-0 pl-5">{row.Name} </Link>
         
          )
        })}
        </div>
      </div>
      
      

    </div>
  </div>
  )
}

export default AdminSidebar