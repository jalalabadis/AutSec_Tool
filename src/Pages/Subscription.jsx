import React from 'react'
import "../Css/plantable.css"

function Subscription() {

  const upgrade_plan =(e)=>{
    e.preventDefault();
   const data= {
      "amount": 45,
      "fiat": 'USD',
      "status" :0,
      "api_key" : 'cbTTZspB29uJM5NNDP4O0603gnx8ZM',
      "seller_wallet_address": '0x4D6C92D5A31A301515997Ea79be69ca1f7a3602c', 
      "metadata": {
      "platform": "Autsec_Tool", 
      "platform-invoice-id" : "9633", 
      "redirectUrl" :"http://localhost:3000/subscription?"
      }
      };

      fetch('https://pay.uranx.io/api/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
        .then((data) => {
          window.location.href= ('https://pay.uranx.io/checkout/'+data.id);
       
        });
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
        <button className="btn btn-secondary btn-lg btn-block">Your Current Plan</button>
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
          <div className="col-4"><div className="planprice">$42/mo</div></div>
        </div>
        <button className="btn btn-info btn-lg btn-block"
        onClick={upgrade_plan}>Upgrade Plan</button>
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
  
      </div>
    </div>
    </div></div>
  )
}

export default Subscription