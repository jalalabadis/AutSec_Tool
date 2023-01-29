import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import AdminSidebar from './../../template_part/AdminSidebar';
import AdminNav from './../../template_part/AdminNav';
import { getDatabase, ref, update, get, child } from 'firebase/database';

function Plan() {
    const {id} = useParams();
    const db = getDatabase();
    const [FreeExpireday, setFreeExpireDay]=useState(5);
    const [ProfessionalExpireday, setProfessionalExpireday]=useState(30);
    const [ProfessionalPrice, setProfessionalPrice]=useState(5);

  useEffect(()=>{
get(child(ref(db), 'Admin/'+id)).then(snaphot=>{
if(snaphot.exists()){
if(id==='free')
{
setFreeExpireDay(snaphot.val().ExpireDay===undefined?FreeExpireday:snaphot.val().ExpireDay);
}
else if(id==='professional'){
setProfessionalPrice(snaphot.val().Price===undefined? ProfessionalPrice : snaphot.val().Price);
setProfessionalExpireday(snaphot.val().ExpireDay===undefined? ProfessionalExpireday : snaphot.val().ExpireDay);
}
}
else{
  console.log('nodata');
}
});
  },[]);

const handelFreeExpireday=(e)=>{
  setFreeExpireDay(e.target.value);
  if(e.target.value>0){
update(ref(db, 'Admin/'+id), {
  ExpireDay: e.target.value
});
  }
    };

  const handelProfessionalExpireday=(e)=>{
    setProfessionalExpireday(e.target.value);
      if(e.target.value>0){
        update(ref(db, 'Admin/'+id), {
          ExpireDay: e.target.value
        });
      }
        };
  const handelProfessionalPrice =(e)=>{
setProfessionalPrice(e.target.value);
if(e.target.value>0){
  update(ref(db, 'Admin/'+id), {
    Price: e.target.value
  });
    }
  };
  return (
    <div className="container-fluid">
<div className="row">
<AdminSidebar/>
<div className="w-100 vh-100 position-fixed overlay d-none" id="sidebar-overlay"></div>
 <div className="col-md-9 col-lg-10 ml-md-auto px-0">
<AdminNav/>
 <main className="container-fluid">
 <div className="container">
  <center style={{textTransform: 'capitalize'}}>{id} Plan </center>
  <hr />

{id==='free'? 
<>
<ul className='planContent'>
  <li>
  <svg style={{margin: '5px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-square" viewBox="0 0 16 16">
  <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
  <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
</svg>
    Price: 0
  </li>
  <li>
  <svg style={{margin: '5px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-square" viewBox="0 0 16 16">
  <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
  <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
</svg>
    Expire Day: 
    <input 
    type="number" 
    value={FreeExpireday}
    onChange={handelFreeExpireday} />
  </li>
</ul>
<hr />

<ul style={{listStyleType: 'none'}}>
  <li>
 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16">
<path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
<path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
 </svg>
 Avalevel when demaind is low</li>
<li>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16">
<path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
 <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
</svg>
 Standerd respose speed</li>
<li>
 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16">
 <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
</svg>
Regular modul update</li>
</ul>
</>
:
 
id==='professional' ?
<>
<ul className='planContent'>
  <li>
  <svg style={{margin: '5px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-square" viewBox="0 0 16 16">
  <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
  <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
</svg>
    Price: <input 
    type="text" 
    value={ProfessionalPrice}
    onChange={handelProfessionalPrice}
    />
  </li>
  <li>
  <svg style={{margin: '5px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-square" viewBox="0 0 16 16">
  <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
  <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
</svg>
    Expire Day: 
    <input 
    type="number" 
    value={ProfessionalExpireday}
    onChange={handelProfessionalExpireday} />
  </li>
</ul>
<hr />
<ul style={{listStyleType: 'none'}}>
<li>
 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-check2-circle" viewBox="0 0 16 16">
 <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
   </svg>
    Avalevel when demaind is high</li>
  <li>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-check2-circle" viewBox="0 0 16 16">
 <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
   <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
</svg>
 Standerd respose speed</li>
 <li>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-check2-circle" viewBox="0 0 16 16">
  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
 <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
 </svg>
 Priotly access to new features</li>
 </ul>
 </>
:

<div>Not Found</div>
}
 </div>
 </main>
  </div>
</div>
</div>
  )
}

export default Plan