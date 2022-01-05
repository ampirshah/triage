import Cookies from "js-cookie";
import * as React from "react";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import style from './App.module.scss';

import Doctor from "./pages/Doctor/Doctor";
import Login from "./pages/Login/Login";
import Triage from "./pages/Triage/Triage";


function App() {
 
  const [auth,setAuth]=useState(true)

  return (
    <div className={style.App}>
      <Routes>
        <Route path='/' element={<Navigate replace to="/Triage" />} />
        <Route path='/Triage' element={<Triage />} />
        <Route path='/Login' element={<Login/>} />
        <Route
          path="/doctor"
          element={
            <PrivateRoute>
              <Doctor />
            </PrivateRoute>
          }
        />  
      </Routes>
      
    </div>
  );
}

const PrivateRoute=({ children })=>{
  const auth = true
  return auth ? children : <Navigate to="/Login" />;
}

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token=Cookies.get("token")
  return (
      <Route
      {...rest}
      render={(props) => props.auth ? (
        <Component {...props}/>
      ) :
        (
           <Route element={ <Navigate replace to="/Login" />}/>
        )
      }
    />
  )
}

export default App;
