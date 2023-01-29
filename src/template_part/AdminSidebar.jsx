import React from 'react'
import { Link } from 'react-router-dom'
import '../Css/main.css'
import '../Css/wp-index.css'

function AdminSidebar() {
  return (
    <div className="col-md-3 col-lg-2 px-0 position-fixed h-100 bg-white shadow-sm sidebar" id="sidebar">
    <h1 style={{textAlign: 'center', color: 'blue', border: '1px solid blue', borderRadius: '25px'}}>Dashboard</h1>
    <div className="list-group rounded-0">
      <Link  to={"/admin-panel"} className="list-group-item list-group-item-action active border-0 d-flex align-items-center">
        <span className="bi bi-border-all"></span>
        <span className="ml-2">Dashboard</span>
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
        <Link to={"/admin-panel/plan/free"} className="list-group-item list-group-item-action border-0 pl-5">Free Plan</Link>
          <Link to={"/admin-panel/plan/professional"} className="list-group-item list-group-item-action border-0 pl-5">Professional Plan</Link>
           </div>
      </div>
      
      

    </div>
  </div>
  )
}

export default AdminSidebar