import React, { useEffect } from 'react'
import AdminSidebar from './../../template_part/AdminSidebar';
import AdminNav from './../../template_part/AdminNav';
import { useState } from 'react';
import { getDatabase, onValue, ref, remove, update } from 'firebase/database';

function AddPlan() {
    const db = getDatabase();
    const [PlanName, setplanName]=useState('');
    const [PlanPrice, setPlanPrice]=useState(0);
    const [Planduration, setPlanduration]=useState(0);
    const [PlanFeature, setPlanFeature]=useState('');
    const [PlanlistData, setplanlistData]=useState({PlanlistData:[]});
    const [EmptyPlan, setEmptyPlan]=useState(true);
    const [RegisterPlanId, setRegisterPlanID]=useState('0');
  
    useEffect(()=>{
  ////Current Registison plan
  onValue(ref(db, 'Register_Plan'), snapshot=>{
if(snapshot.exists()){
  setRegisterPlanID(snapshot.val().ID);
}
  });

  onValue(ref(db, 'Plan_list'), snapshot=>{
    if(snapshot.exists()){
      setEmptyPlan(false);
      const records = [];
      snapshot.forEach(childsnapshot=>{
  records.push(childsnapshot.val())
      });
      records.forEach(item=>{
        const Plresult = (RegisterPlanId.search(item.ID));
        if(Plresult!==-1){
          item.types = 'activert'
        }
      });
      
      setplanlistData({PlanlistData: records});
    }
  else{
    setEmptyPlan(true);
  }});
    },[db, RegisterPlanId, setplanlistData, setRegisterPlanID]);
///Add Plan List
const addPlansList =()=>{
if(PlanName.length>=2&&PlanPrice>=0&&Planduration>=0&&PlanFeature.length>=2){
    const Ms = Date.now();
    update(ref(db, 'Plan_list/'+Ms), {
    Name: PlanName,
    Price: PlanPrice,
    Duration: Planduration,
    Features: {[Ms]:{name:PlanFeature, ID: Ms}},
    ID: Ms,
    Ms: Ms
    });
}
setplanName('');
setPlanPrice(0);
setPlanduration(0);
setPlanFeature('');

};

////DeletePlans
const delateplans =(e)=>{
remove(ref(db, 'Plan_list/'+e.target.id));
};

/////Set Register Plan
const setRegisterPlan=(e)=>{
update(ref(db, 'Register_Plan'),{
ID: e.target.id,
});
update(ref(db, 'Plan_list/'+e.target.id),{
  Ms: Date.now()
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

        <div><span>*Plan Name</span>
       <input 
       value={PlanName}
       onChange={e=>setplanName(e.target.value)}
       type="text" placeholder='Plan Name'/>
       </div>

       <div><span>*Plan price</span> <span style={{ marginLeft:'38%'}}>*Plan duration</span><br />
       <input 
        value={PlanPrice}
        onChange={e=>setPlanPrice(e.target.value)}
       type="number" placeholder='Plan price' style={{width: '45%', margin:'10px 10px'}}/>
        
        
       <input 
        value={Planduration}
        onChange={e=>setPlanduration(e.target.value)}
       type="number" placeholder='Plan duration' style={{width: '45%', margin:'10px 10px'}}/>
 </div>

 <div><span>*Plan feature</span>
       <input 
        value={PlanFeature}
        onChange={e=>setPlanFeature(e.target.value)}
       type="text" placeholder='Plan feature'/>
       </div>
<button onClick={addPlansList}>Add Plan</button>
       <hr />
       <center>Plan list</center>
       <hr />
{EmptyPlan? <div>No plan Found</div>:
<>
       {PlanlistData.PlanlistData.map((row, index)=>{
return(
    <section className="row" key={index}>
    <div className="col-md-6 col-lg-4">
    <article className="p-4 rounded shadow-sm border-left mb-4">
     <div id="pathlink" className="d-flex align-items-center">
      
     <h5 className="ml-2">{row.Name}</h5>
     <i 
     id={row.ID}
     onClick={delateplans}
     style={{marginLeft: '20px'}} className="bi bi-trash"></i>
     {RegisterPlanId===row.ID? <></>:
     <i 
      id={row.ID}
      onClick={setRegisterPlan}
     style={{marginLeft: '20px'}}
     className={"bi bi-person-check-fill "+row.types}></i>
}
    </div> </article></div>
  </section>
)
       })}

      </> }
   
                      
            
                    </main>
                  </div>
    </div>
    </div>
  )
}

export default AddPlan