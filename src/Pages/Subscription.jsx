import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import React, { useEffect, useState } from 'react'
import "../Css/plantable.css"
import { child, get, getDatabase, ref, update, onValue } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Subscription() {
  const db = getDatabase();
  const navigate = useNavigate();
  const [UserID, setUserID]=useState(0);
  const [PaypalPayment, setPaypalPayment]= useState(false);
  const [PlanlistData, setplanlistData]=useState({PlanlistData:[]});
  const [CurrentPlanId, setCurrentPlanID]=useState('0');
  const [BuyPlanName, setBuyplanName]=useState('');
  const [BuyPlanprice, setBuyPlanprice]=useState(0);
  const [BuyPlanduration, setBuyPlanduration]=useState(0);
  

  useEffect(()=>{
onAuthStateChanged(auth, user=>{
if(user){
  setUserID(user.uid);
  onValue(ref(db, 'User/'+user.uid), snapshot=> {
    setCurrentPlanID(""+snapshot.val().PlanID+"");
  });
}
else{
  navigate('/')
}
});


///////Plan DataList Call
onValue(ref(db, 'Plan_list'), snapshot=>{
  if(snapshot.exists()){
    const records = [];
    snapshot.forEach(childsnapshot=>{
records.push(childsnapshot.val())
    });
    records.forEach(item=>{
      const Plresult = (CurrentPlanId.search(item.ID));
      if(Plresult!==-1){
        item.CurrentPlan = true;
        var dep1 = item.Feature.replace(/{"name":"/g, '<li><i class="bi bi-check2-circle"></i>');
      var dep2 = dep1.replace(/,/g, '');
      item.Feature = dep2.replace(/"}/g, '</li>')
      }
      else{
        item.CurrentPlan = false;
      var dep1 = item.Feature.replace(/{"name":"/g, '<li><i class="bi bi-check2-circle planaunctives"></i>');
      var dep2 = dep1.replace(/,/g, '');
      item.Feature = dep2.replace(/"}/g, '</li>')
      }
      
    });
  records.sort((a,b)=>b.Ms-a.Ms);
    
    setplanlistData({PlanlistData: records});
  }
});
  },[CurrentPlanId, setCurrentPlanID]);

  //////=====>Approve payment
const handleApprove =(orderID)=>{
update(ref(db, 'User/'+UserID), {
  Plan: BuyPlanName,
  ExpireDate: Date.now()+(BuyPlanduration*24*60*60*1000)
});
navigate('/checkvul');
  };

  return (
    <div id="myModal" className="modal">
    <div className="modal-content">
    <div className="row">
      <div className="col-6"> <div className="hader1">Your Account</div> </div>
      <div className="col-6"><span onClick={e=>setPaypalPayment(false)} className="close">&times;</span></div>
    </div>
    <hr className="new1"/>
{PaypalPayment? 
  <PayPalScriptProvider options={{ "client-id": "Ac7wZ2A3SXnkRq-8XOWVrDhtxZWt0HNQ717VKkb6sRmkAy6YBM5oKxkuLs17kXXnnZ13aqjwhcfhe8K8" }}>
  <PayPalButtons
  createOrder={(data, actions) => {
    return actions.order.create({
        purchase_units: [
            {
                amount: {
                    value: BuyPlanprice,
                },
            },
        ],
    });
}}

onApprove = { async (data, action) => {
  const order = await action.order.capture();
  console.log("order", order);
  handleApprove(data.orderID);
}}
onCancel={() => {}}
onError={(err) => {
  console.log("PayPal Checkout onError", err);
}}
  />
</PayPalScriptProvider>
:

    <div className="row">
{PlanlistData.PlanlistData.map((row, index)=>{
return(

  <div className="col-6" key={index}>
 
    <div className="row">
    <div className="col-8"><div className="bodytex1">{row.Name} Plan</div></div>
      <div className="col-4"><div className="planprice">${row.Price}/mo</div></div>
        </div>   
        {row.CurrentPlan ?  
  <button className="btn btn-secondary btn-lg btn-block freebutton" >Your Current Plan</button>
  :<button className="btn btn-info btn-lg btn-block"
        onClick={e=>{setPaypalPayment(true);
          setBuyPlanprice(row.Price);
          setBuyPlanduration(row.Duration);
          setBuyplanName(row.Name);
          }}>Upgrade Plan</button>
}
        <ul>
          <div dangerouslySetInnerHTML={{ __html: row.Feature}}></div>
          
        </ul>
        </div>
)

})}
    </div>
}
    </div></div>
  )
}

export default Subscription