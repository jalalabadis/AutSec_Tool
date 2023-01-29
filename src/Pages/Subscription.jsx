import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import React, { useEffect, useState } from 'react'
import "../Css/plantable.css"
import { child, get, getDatabase, ref, update } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Subscription() {
  const db = getDatabase();
  const navigate = useNavigate();
  const [UserID, setUserID]=useState(0);
  const [UserPlan, setUserPlan]=useState('');
  const [PaypalPayment, setPaypalPayment]= useState(false);
  const [ProfessionalExpireday, setProfessionalExpireday]=useState(30);
  const [ProfessionalPrice, setProfessionalPrice]=useState(5);

  useEffect(()=>{
onAuthStateChanged(auth, user=>{
if(user){
  setUserID(user.uid);
  get(child(ref(db), 'User/'+user.uid)).then(snapshot=> {
setUserPlan(snapshot.val().Plan);
  });
}
else{
  navigate('/')
}
});
    ///--->
get(child(ref(db), 'Admin/professional')).then(snapshot=>{
if(snapshot.exists()){
  setProfessionalPrice(snapshot.val().Price===undefined? ProfessionalPrice : snapshot.val().Price);
  setProfessionalExpireday(snapshot.val().ExpireDay===undefined? ProfessionalExpireday : snapshot.val().ExpireDay);  
}
});
  });
const handleApprove =(orderID)=>{
update(ref(db, 'User/'+UserID), {
  Plan: 'Professional',
  ExpireDate: Date.now()+(ProfessionalExpireday*24*60*60*1000)
});
navigate('/checkvul');
  };

  return (
    <div id="myModal" className="modal">
    <div className="modal-content">
    <div className="row">
      <div className="col-6"> <div className="hader1">Your Account</div> </div>
      <div className="col-6"><span className="close">&times;</span></div>
    </div>
    <hr className="new1"/>
    <div className="row">
      <div className="col-6">
      <div className="freecontent">
        <div className="bodytex1">Free Plan</div>
        {UserPlan==='Free'? 
        <button className="btn btn-secondary btn-lg btn-block freebutton" >Your Current Plan</button>
         : <></>}
        <ul>
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
      </div>
      </div>
      <div className="col-6">
        <div className="row">
          <div className="col-8"><div className="bodytex1">Professional Plan</div></div>
          <div className="col-4"><div className="planprice">${ProfessionalPrice}/mo</div></div>
        </div>

{PaypalPayment===false? <>
  
  {UserPlan==='Professional' ?  
  <button className="btn btn-secondary btn-lg btn-block freebutton" >Your Current Plan</button>
  :<button className="btn btn-info btn-lg btn-block"
        onClick={e=>setPaypalPayment(true)}>Upgrade Plan</button>
}
        <ul>
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
  <PayPalScriptProvider options={{ "client-id": "Ac7wZ2A3SXnkRq-8XOWVrDhtxZWt0HNQ717VKkb6sRmkAy6YBM5oKxkuLs17kXXnnZ13aqjwhcfhe8K8" }}>
  <PayPalButtons
  createOrder={(data, actions) => {
    return actions.order.create({
        purchase_units: [
            {
                amount: {
                    value: "1.99",
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
}
      </div>
    </div>
    </div></div>
  )
}

export default Subscription