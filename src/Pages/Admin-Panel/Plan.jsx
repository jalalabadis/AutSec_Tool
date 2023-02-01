import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import AdminSidebar from './../../template_part/AdminSidebar';
import AdminNav from './../../template_part/AdminNav';
import { getDatabase, ref, update, get, child, onValue } from 'firebase/database';

function Plan() {
    const {id} = useParams();
    const db = getDatabase();
    const [PlanName, setplanName]=useState('');
    const [PlanPrice, setPlanPrice]=useState(0);
    const [Planduration, setPlanduration]=useState(0);
    const [PlanFeature, setPlanFeature]=useState({PlanFeature:[]});
    const [FeatureText, setFeatureText]=useState('');
    const [inveledID, setInvelidID]=useState(true);

  useEffect(()=>{
//////Plan DataLod
onValue(ref(db, 'Plan_list/'+id), snaphot=>{
if(snaphot.exists()){
  setplanName(snaphot.val().Name);
  setPlanPrice(snaphot.val().Price);
  setPlanduration(snaphot.val().Duration);
  
  if(snaphot.val().Feature.split('name').length<=1){
  }
  else if(snaphot.val().Feature.split('name').length>=2){
    const records = '['+snaphot.val().Feature+']';
    const JsonDatas= JSON.parse(records);
    setPlanFeature({PlanFeature: JsonDatas});
  }
  

  setInvelidID(false);
}});
},[id]);


  ////Plan name
  const handelPlanName=(e)=>{
    setplanName(e.target.value);
    if(e.target.value.length>1){
      update(ref(db, 'Plan_list/'+id), {
        Name: e.target.value
      });
    }
      };
  ////Plan duration
  const handelPlanDuration=(e)=>{
    setPlanduration(e.target.value);
      if(e.target.value>0){
        update(ref(db, 'Plan_list/'+id), {
          Duration: e.target.value
        });
      }
        };
  ////Profesonal Plan Price
  const handelPlanPrice =(e)=>{
    setPlanPrice(e.target.value);
if(e.target.value>0){
  update(ref(db, 'Plan_list/'+id), {
    Price: e.target.value
  });
    }};
/////// Add PlanFeature
const addFreeFeature =()=>{
  get(child(ref(db), 'Plan_list/'+id)).then(snaphot=>{
  if(snaphot.val().Feature.split('name').length<=1){
    update(ref(db, 'Plan_list/'+id), {
      Feature: '{"name":"'+FeatureText+'"}',
    });
  }
  else if(snaphot.val().Feature.split('name').length>=2){
    update(ref(db, 'Plan_list/'+id), {
    Feature: snaphot.val().Feature+',{"name":"'+FeatureText+'"}',
    });
  }
});
setFeatureText('');
};
////Delete PlanFuture
const Plandeletes=(e)=>{
get(child(ref(db), 'Plan_list/'+id)).then(snaphot=>{
    update(ref(db, 'Plan_list/'+id), {
      Feature: snaphot.val().Feature.replace('{"name":"'+e.target.id+'"},', '') 
    });
});

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
  <center style={{textTransform: 'capitalize'}}>{PlanName} Plan </center>
  <hr />

{inveledID? 
  <div>Not Found</div>
  :
  <>
<ul className='planContent'>
<li>
  <svg style={{margin: '5px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-square" viewBox="0 0 16 16">
  <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
  <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
</svg>
    Name: <input 
    type="text" 
    value={PlanName}
    onChange={ handelPlanName}
    />
  </li>
  <li>
  <svg style={{margin: '5px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-square" viewBox="0 0 16 16">
  <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
  <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
</svg>
    Price: <input 
    type="number" 
    value={PlanPrice}
    onChange={handelPlanPrice}
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
    value={Planduration}
    onChange={handelPlanDuration} />
  </li>
</ul>
<hr />
{/* Plan Reature */}
<ul style={{listStyleType: 'none'}}  >
{PlanFeature.PlanFeature.map((row, index)=>{
return(
 <li key={index}>
  <i className="bi bi-check2-circle"></i>{row.name}
  <i id={row.name} onClick={Plandeletes} className="bi bi-trash dlplans"></i>
  </li> 
)
})}
 </ul>

    <ul style={{listStyleType: 'none'}}>
<li>
  <input type="text" 
  value={FeatureText}
  onChange={e=>setFeatureText(e.target.value)}
  style={{width: '20%', height:'20px', margin: '15px 15px 0px 0px'}} />
<i onClick={addFreeFeature} className="bi bi-plus-circle-dotted"></i>
 </li>
</ul>
</>
}

 </div>
 </main>
  </div>
</div>
</div>
  )
}

export default Plan