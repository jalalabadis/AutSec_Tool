import React, { useEffect, useRef, useState } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import "../Css/plantable.css"
import {getDatabase, ref, update, onValue } from 'firebase/database';
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
  const [Error, setError]=useState(false);

  

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
        item.Price = 1;
      }
      else{
        item.CurrentPlan = false;
      }
      
    });
  records.sort((a,b)=>b.Ms-a.Ms);
  const filterRecords = records.filter(item=> item.Price>=1).sort((a, b) => b.CurrentPlan - a.CurrentPlan);
    setplanlistData({PlanlistData: filterRecords});
  }
});

////===>Redy to call Stripe Payment
if(BuyPlanprice!==0){
  stripecheckout.current.click();
}
},[CurrentPlanId, setCurrentPlanID, BuyPlanprice]);


///////========>Stripe Payment
  const onToken=(token)=>{
    const data ={token, BuyPlanprice}
    axios.post('/payment/stripe', data).then(res=>{
      if(res.data.status==="succeeded"){
      update(ref(db, 'User/'+UserID), {
        PlanID: BuyPlanID,
        Plan: BuyPlanName,
        BuyDate: Date.now(),
        ExpireDate: Date.now()+(BuyPlanduration*24*60*60*1000)
      });
      navigate('/checkvul');
    }
    }).catch(err=> {
      console.log(err);
      setError(true);
    })
  };

  const cancelPlan=()=>{
    update(ref(db, 'User/'+UserID), {
      PlanID: 'No Plan',
      Plan: 'No Plan',
      BuyDate: Date.now(),
      ExpireDate: Date.now()
    });
  };

  return (
<div className="relative w-full transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all dark:bg-gray-900 sm:my-8 !my-0 flex min-h-screen flex-col items-center justify-center !rounded-none !py-0 bg-transparent dark:bg-transparent opacity-100 translate-y-0 sm:scale-100">
<div className="flex items-center justify-between border-b-[1px] border-black/10 dark:border-white/10 px-4 pb-4 pt-5 sm:p-6">
<div className="flex items-center">
<div className="text-center sm:text-left">
  {Error &&
<h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200" style={{color: "red"}}>Payment Error</h3>
}
</div></div>
</div>
<div className="p-4 sm:p-6 sm:pt-4">
<div className="flex h-full flex-col items-center justify-start">
<div className="relative">
<div className="grow justify-center bg-white dark:bg-gray-900 rounded-md flex flex-col items-start overflow-hidden border shadow-md dark:border-gray-700">

<div className="flex w-full flex-row items-center justify-between border-b px-4 py-3 dark:border-gray-700">
<span className="text-base font-semibold sm:text-base">Your plan</span>
<button className="text-gray-700 opacity-50 transition hover:opacity-75 dark:text-white" onClick={e=>navigate('/')}>
<svg stroke="currentColor" fill="none"  viewBox="0 0 24 24"  className="h-6 w-6" height="1em"  width="1em" xmlns="http://www.w3.org/2000/svg">
<line x1="18" y1="6" x2="6" y2="18"></line>
<line x1="6" y1="6" x2="18" y2="18"></line>
 </svg></button></div>
 
{PlanlistData.PlanlistData.map((item, index) => {
    if (index % 2 === 0) {
      return (
<div className="grid sm:grid-cols-2" key={index}>
<div className="relative order-2 col-span-1 border-r-0 border-t dark:border-gray-700 sm:order-1 sm:border-r sm:border-t-0 popup-dccotrt-width">
<div className="p-3 flex flex-col gap-3 bg-white z-20 relative dark:bg-gray-900">
<div className="text-xl font-semibold justify-between items-center flex">
<span>{item.Name}</span>
{item?.CurrentPlan ?<></>:
<span className="font-semibold text-gray-500">USD ${item.Price}/mo</span>
    }
</div>

{item?.CurrentPlan ?
  <button className="cursor-not-allowed opacity-50 botndc relative botndc-planingdc dark:text-gray-white border-none bg-gray-300 py-3 font-semibold text-gray-800 hover:bg-gray-300 dark:bg-gray-500 dark:opacity-100"  disabled="trur">
<div  className="flex w-full items-center justify-center gap-2">
 <span className="inline-block">Your current plan</span>
 </div>
 </button>
 :
<button className="botndc relative botndc-planingdc border-none py-3 font-semibold"
onClick={e=>{
  setBuyPlanID(item.ID)
  setBuyplanName(item.Name)
  setBuyPlanprice(item.Price)
  setBuyPlanduration(item.Duration)
}}>
<div className="flex w-full items-center justify-center gap-2">
<span className="inline-block text-white">Upgrade plan</span></div>
</button>
}

{item.Features &&
  Object.entries(item.Features).map(([key, value], index)=>{
return(
   <div  key={key} className="gap-2 flex flex-row justify-start items-center text-sm">
<svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className={item?.CurrentPlan ?"h-4 w-4 h-5 w-5 text-gray-400":"h-4 w-4 h-5 w-5 text-green-700"} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
 <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
<polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg><span>{value.name}</span></div>
)})}

{item?.CurrentPlan ? 
<button className='btn btn-danger' onClick={cancelPlan}>Cancel</button>:<></>
}
</div></div>
{PlanlistData.PlanlistData[index + 1] && (
<div className="relative order-2 col-span-1 sm:order-2 popup-dccotrt-width">
<div className="p-3 flex flex-col gap-3 bg-white z-20 relative dark:bg-gray-900">
<div className="text-xl font-semibold justify-between items-center flex">
<span>{PlanlistData.PlanlistData[index + 1].Name}</span>

{PlanlistData.PlanlistData[index + 1]?.CurrentPlan ?<></>:
<span className="font-semibold text-gray-500">USD ${PlanlistData.PlanlistData[index + 1].Price}/mo</span>
    }
</div>

{PlanlistData.PlanlistData[index + 1]?.CurrentPlan ?
  <button className="cursor-not-allowed opacity-50 botndc relative botndc-planingdc dark:text-gray-white border-none bg-gray-300 py-3 font-semibold text-gray-800 hover:bg-gray-300 dark:bg-gray-500 dark:opacity-100"  disabled="true">
<div  className="flex w-full items-center justify-center gap-2">
 <span className="inline-block">Your current plan</span>
 </div>
 </button>
 :
<button className="botndc relative botndc-planingdc border-none py-3 font-semibold" onClick={e=>{
          setBuyPlanID(PlanlistData.PlanlistData[index + 1].ID)
          setBuyplanName(PlanlistData.PlanlistData[index + 1].Name)
          setBuyPlanprice(PlanlistData.PlanlistData[index + 1].Price)
          setBuyPlanduration(PlanlistData.PlanlistData[index + 1].Duration)
        }}>
<div className="flex w-full items-center justify-center gap-2">
<span className="inline-block text-white">Upgrade plan</span></div>
</button>
}

{PlanlistData.PlanlistData[index + 1].Features &&
  Object.entries(PlanlistData.PlanlistData[index + 1].Features).map(([key, value], index)=>{
return (

<div  key={key} className="gap-2 flex flex-row justify-start items-center text-sm">
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className={PlanlistData.PlanlistData[index + 1]?.CurrentPlan ?"h-4 w-4 h-5 w-5 text-gray-400":"h-4 w-4 h-5 w-5 text-green-700"} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg><span>{value.name}</span>
        </div>
)
})}

{PlanlistData.PlanlistData[index + 1]?.CurrentPlan ? 
<button className='btn btn-danger' onClick={cancelPlan}>Cancel</button>:<></>
}   
</div></div>
          )}
</div>
      );
    } else {
      return null;
    }
  })}

  </div></div></div></div>
  
  <StripeCheckout
        token={onToken}
        //Public API key
        stripeKey= {process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
        amount={BuyPlanprice*100} // cents
        currency={process.env.REACT_APP_STRIPE_CURRENCY}
        name={process.env.REACT_APP_STRIPE_NAME} 
        description={BuyPlanName+' Package'}
        image={process.env.REACT_APP_STRIPE_IMG}
        allowRememberMe
        >
    <button style={{display:'none'}} ref={stripecheckout}></button>
    </StripeCheckout>
  </div>
  )
}

export default Subscription