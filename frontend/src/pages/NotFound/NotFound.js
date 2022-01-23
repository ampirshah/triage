import React from 'react';
import style from './NotFound.module.scss'
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className={style.NotFound}>
    <h1>صفحه مورد نظر پیدا نشد :(</h1>
    <ul>
        <li><Link to="/Triage">تریاژ</Link></li>
        <li><Link to="/Doctor">پزشک</Link></li>
    </ul>
  </div>
);

export default NotFound;