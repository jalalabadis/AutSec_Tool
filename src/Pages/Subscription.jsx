import React, { useEffect, useRef, useState } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import "../Css/plantable.css"
import { child, get, getDatabase, ref, update, onValue } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactGA from 'react-ga';

function Subscription() {
ReactGA.initialize('UA-256865843-1');
ReactGA.pageview(window.location.pathname + window.location.search);
  const stripecheckout = useRef(null);
  const db = getDatabase();
  const navigate = useNavigate();
  const [UserID, setUserID]=useState(0);
  //const [PaypalPayment, setPaypalPayment]= useState(false);
  const [PlanlistData, setplanlistData]=useState({PlanlistData:[]});
  const [CurrentPlanId, setCurrentPlanID]=useState('0');
  const [BuyPlanID, setBuyPlanID]=useState(0);
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

////===>Redy to call Stripe Payment
if(BuyPlanprice!==0){
  stripecheckout.current.click();
}
  },[CurrentPlanId, setCurrentPlanID, BuyPlanprice]);

  /*/////=====>Approve payment
const handleApprove =(orderID)=>{
update(ref(db, 'User/'+UserID), {
  Plan: BuyPlanName,
  ExpireDate: Date.now()+(BuyPlanduration*24*60*60*1000)
});
navigate('/checkvul');
  };
*/
  ///////========>Stripe Payment
  const onToken=(token)=>{
    console.log(token);
    console.log(BuyPlanprice,BuyPlanduration,BuyPlanName);
    const data ={token, BuyPlanprice}
    axios.post('http://localhost:4000/payment', data).then(res=>{
      update(ref(db, 'User/'+UserID), {
        PlanID: BuyPlanID,
        Plan: BuyPlanName,
        BuyDate: Date.now(),
        ExpireDate: Date.now()+(BuyPlanduration*24*60*60*1000)
      });
      navigate('/checkvul');
    }).catch(err=> console.log(err))
  }

  return (
    <div id="myModal" className="modal">
    <div className="modal-content">
    <div className="row">
      <div className="col-6"> <div className="hader1">Your Account</div> </div>
      <div className="col-6"><span className="close">&times;</span></div>
    </div>
    <hr className="new1"/>
  
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
  :
  

  <button className="btn btn-info btn-lg btn-block"
        onClick={e=>{
          setBuyPlanID(row.ID)
          setBuyplanName(row.Name)
          setBuyPlanprice(row.Price)
          setBuyPlanduration(row.Duration)
        }}>Upgrade Plan</button>
}
        <ul>
          <div dangerouslySetInnerHTML={{ __html: row.Feature}}></div>
          
        </ul>
        </div>
)

})}

    </div>
    <StripeCheckout
        token={onToken}
        //Public API key
        stripeKey="pk_test_51MZk6BHTPolvFWGjPNhdRXqKCvfvXo1ktfJYDL3zz3xLGDOe12okRdqK2lraMemiqvMXGAMJt4M9fmjNDo0I0DXG00kemkHjJG"
        amount={BuyPlanprice*100} // cents
        currency="USD"
        name="Autsec Tool" 
        description={BuyPlanName+' Package'}
        image="https://i.ibb.co/18knWfd/autsec.png"
        allowRememberMe
        >
    <button style={{display:'none'}} ref={stripecheckout}></button>
    </StripeCheckout>
    </div></div>
  )
}

export default Subscription