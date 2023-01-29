import React from 'react'
import AdminNav from './../../template_part/AdminNav';
import AdminSidebar from './../../template_part/AdminSidebar';
import { Link } from 'react-router-dom';

function Dashbord() {
  return (
<div className="container-fluid">
<div className="row">
<AdminSidebar/>
<div className="w-100 vh-100 position-fixed overlay d-none" id="sidebar-overlay"></div>
 <div className="col-md-9 col-lg-10 ml-md-auto px-0">
<AdminNav/>
 <main className="container-fluid">
 <section className="row">

  <div className="col-md-6 col-lg-4">
  <article className="p-4 rounded shadow-sm border-left mb-4">
   <Link id="pathlink" to={'/admin-panel/user'} className="d-flex align-items-center">
    <span className="bi bi-person h5"></span>
   <h5 className="ml-2">All User</h5>
  </Link> </article></div>

                    <div className="col-md-6 col-lg-4">
                      <article className="p-4 rounded shadow-sm border-left mb-4">
                        <Link to={'/admin-panel/user?plan=free'} className="d-flex align-items-center">
                          <span className="bi bi-person-dash h5"></span>
                          <h5 className="ml-2">Free Users</h5>
                        </Link>
                      </article>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <article className="p-4 rounded shadow-sm border-left mb-4">
                        <Link to={'/admin-panel/user?plan=professional'} className="d-flex align-items-center">
                          <span className="bi bi-person-check h5"></span>
                          <h5 className="ml-2">Professional User</h5>
                        </Link>
                      </article>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <article className="p-4 rounded shadow-sm border-left mb-4">
                        <Link href="#" className="d-flex align-items-center">
                          <span className="bi bi-arrow-clockwise h5"></span>
                          <h5 className="ml-2">Payment Process</h5>
                        </Link>
                        <br/>
  
                      </article>
                    </div>
                  </section>
                  
                  <div className="jumbotron jumbotron-fluid rounded bg-white border-0 shadow-sm border-left px-4">
            <div className="container">
              <h1 className="display-4 mb-2 text-primary">Estimate Deposit Analytics</h1>
              <p className="lead text-muted">......</p>
            </div>
          </div>
                </main>
              </div>
</div>
</div>
  )
}

export default Dashbord