import * as React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

import style from './App.module.scss';

import Doctor from "./pages/Doctor/Doctor";
import Login from "./pages/Login/Login";
import Triage from "./pages/Triage/Triage";
import NotFound from "./pages/NotFound/NotFound";

const useAuth = () => {
  const user = Cookies.get('token');
  if(user){
    return true
  }else return false
  
}
function App() {

  return (
    <div className={style.App}>
      <Routes>
        <Route path='/' element={<Navigate replace to="/Triage" />} />
        <Route path='/Triage' element={<Triage />} />
        <Route path='/Login' element={<Login />} />
        <Route element={<ProtectedRoutes />} >
          <Route  path='/doctor' element={<Doctor />} />
        </Route>
        <Route path="*" element={<NotFound/>} />
      </Routes>

    </div>
  );
}

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to='/Login' />
}


export default App;
