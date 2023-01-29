import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { get, getDatabase, child, ref } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

function AdminNav() {
  const db = getDatabase();
  const navigate = useNavigate();

  useEffect(()=>{
    onAuthStateChanged(auth, user=>{
      if(user){
    get(child(ref(db), 'User/'+user.uid)).then(snapshot=>{
if(snapshot.val().Position!=='Admin'){
  navigate('/')
}
});
      }
      else{
      navigate('/')
      }
  });

  },[]);

  return (
    <nav className="w-100 d-flex px-4 py-2 mb-4 shadow-sm">
 <button className="btn py-0 d-lg-none">
<span className="bi bi-list text-primary h3"></span>
 </button>
  <div className="dropdown ml-auto">
<button className="btn py-0 d-flex align-items-center" id="logout-dropdown" data-toggle="dropdown" aria-expanded="false">
<span className="bi bi-person text-primary h4"></span>
  <span className="bi bi-chevron-down ml-1 mb-2 small"></span>
  </button>
   <div className="dropdown-menu dropdown-menu-right border-0 shadow-sm" aria-labelledby="logout-dropdown">
    <Link className="dropdown-item" href="#">Logout</Link>
  <Link className="dropdown-item" href="#">Settings</Link>
     </div> </div>  </nav>
  )
}

export default AdminNav