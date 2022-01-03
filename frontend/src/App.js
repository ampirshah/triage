import * as React from "react";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import style from './App.module.scss';

import Doctor from "./pages/Doctor/Doctor";
import Login from "./pages/Login/Login";
import Triage from "./pages/Triage/Triage";


function App() {
  
  return (
    <div className={style.App}>
      <Routes>
        <Route path='/' element={<Navigate replace to="/Triage" />} />
        <Route path='/Triage' element={<Triage />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Doctor' element={<Doctor />} />
      </Routes>

    </div>
  );
}


export default App;
