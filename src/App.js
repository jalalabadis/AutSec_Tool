import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Subscription from './Pages/Subscription';


//-> Protected Routes
import ProtectedRoutes from './Routes/ProtectedRoutes';

import Login from './Pages/Login';
import Error from './Pages/Error';
import Checkvul from './Pages/check-vul';
import Dashbord from './Pages/Admin-Panel/Dashbord';
import Plan from './Pages/Admin-Panel/Plan';
import User from './Pages/Admin-Panel/User';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path='/checkvul' element={<Checkvul />} /></Route>
        <Route path='/subscription' element={<Subscription/>}></Route>
        <Route path='/admin-panel' element={<Dashbord/>}></Route>
        <Route path='/admin-panel/plan/:id' element={<Plan/>}></Route>
        <Route path='/admin-panel/user' element={<User/>}></Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;

/* <Route element={<ProtectedRoutes />}>
        <Route path='/checkvul' element={<Checkvul />} />
      </Route>*/
