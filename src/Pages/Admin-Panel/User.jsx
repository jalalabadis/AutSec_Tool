import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import AdminSidebar from './../../template_part/AdminSidebar';
import AdminNav from './../../template_part/AdminNav';
import { child, get, getDatabase, onValue, ref, update } from 'firebase/database';
import { formatDate } from '../../Utils/Alerts';

function User() {
  const db = getDatabase();
    const [searchParams]= useSearchParams('');
    const [PlanType]= useState(searchParams.get('plan')===null? '' : searchParams.get('plan'));
    const [UserData, setUserData]= useState({UserData:[]});
    const [infoModel, setInfoModel]=useState(false);
    const [UsersID, setUsersID]=useState('');
    const [UsersName, setusersName]=useState('');
    const [UsersPlan, setUsersPlan]=useState('');
    const [BuyDay, setBuyDay]=useState('');
    const [ExpireDay, setExpireDay]=useState('');

    useEffect(()=>{
onValue((ref(db, 'User')), snapshot=>{
  const records = [];
snapshot.forEach(childsnapshot=>{
records.push(childsnapshot.val());
});

records.forEach((item) => {
  item.BuyDate = ""+new Date(item.BuyDate).toDateString().replace(/^\S+\s/,'')+""; 
  item.ExpireDate = ""+new Date(item.ExpireDate).toDateString().replace(/^\S+\s/,'')+""});

setUserData({UserData: records})
});
    },[]);

  //////Change User Info
const handelchangeinfo =(e)=>{
  const usersID = e.target.attributes.getNamedItem('data-usersid').value;
  const usersName = e.target.attributes.getNamedItem('data-name').value;
  const usersPlan = e.target.attributes.getNamedItem('data-plan').value;
  const buyDate = e.target.attributes.getNamedItem('data-buyday').value;
  const ExpireDate = e.target.attributes.getNamedItem('data-expiredate').value;
setInfoModel(true);
setUsersID(usersID);
setusersName(usersName);
setUsersPlan(usersPlan);
setBuyDay(formatDate(buyDate));
setExpireDay(formatDate(ExpireDate));
  };

//////Save User info
const handelSaveinfo=()=>{
  var date = new Date(ExpireDay); 
  var NewExpireDay = date.getTime(); 
  console.log(NewExpireDay);
  update(ref(db, 'User/'+UsersID), {
    ExpireDate: NewExpireDay
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
   <center><h2 style={{textTransform: 'capitalize'}}>{PlanType}</h2></center><hr />
     <div className="container table-responsive "> 
<table className="table table-bordered table-hover">
  <thead className="thead-dark">
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Plan</th>
      <th scope="col">Buy</th>
      <th scope="col">Expiare</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {PlanType!==''?
    UserData.UserData.filter(data=>data.Plan.toLowerCase()===PlanType).map((row, index)=> {
      
    return(
      <tr key={index}>
      <th>{row.displayName}</th>
      <td>{row.Plan}</td>
      <td>{row.BuyDate}</td>
      <td>{row.ExpireDate}</td>
      <td 
      data-usersid={row.UserID}
      data-name={row.displayName}
      data-plan={row.Plan}
      data-buyday={row.BuyDate}
      data-expiredate={row.ExpireDate}
      onClick={handelchangeinfo}>Change</td>
    </tr>
    )
})
:
UserData.UserData.map((row, index)=> {
  return(
    <tr key={index}>
    <th>{row.displayName}</th>
    <td>{row.Plan}</td>
    <td>{row.BuyDate}</td>
    <td>{row.ExpireDate}</td>
    <td 
    data-usersid={row.UserID}
    data-name={row.displayName}
    data-plan={row.Plan}
    data-buyday={row.BuyDate}
    data-expiredate={row.ExpireDate}
    onClick={handelchangeinfo}>Change</td>
  </tr>
  )
})
}
    
    
  </tbody>
</table>
</div>

        
  </main>
  {infoModel===true?
  <div className="infomodal">
  <div className="infomodal-content">
    <span className="infoclose" onClick={e=>setInfoModel(false)}>&times;</span>
    <center>{UsersName}</center>
    <hr />
    <ul className='planContent'>
      <li>Plan: {UsersPlan}</li>
      <li>Buy: <input 
    type="date" 
    style={{pointerEvents:'none'}}
    value={BuyDay}
    onChange={e=>'handelFreeExpireday'} /></li>
      <li>ExpireDate:   
      <input 
    type="date" 
    value={ExpireDay}
    onChange={e=>setExpireDay(e.target.value)} /> </li>
    </ul>
    <button className='btn btn-primary' onClick={handelSaveinfo}>Save</button>
  </div>
</div>
:
<></>
  }

</div>
    </div>
    </div>
  )
}

export default User