import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Subscription from './Pages/Subscription';


//-> Protected Routes
import ProtectedRoutes from './Routes/ProtectedRoutes';

import Login from './Pages/Login';
import Error from './Pages/Error';
import Checkvul from './Pages/check-vul';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path='/checkvul' element={<Checkvul />} /></Route>
        <Route path='/subscription' element={<Subscription/>}></Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;

/* <Route element={<ProtectedRoutes />}>
        <Route path='/checkvul' element={<Checkvul />} />
      </Route>*/
