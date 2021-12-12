import React, { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import DoctorsList from '../../components/DoctorsList/DoctorsList';
import PatientsList from '../../components/PatientsList/PatientsList';
import { RiHealthBookLine } from 'react-icons/ri';
import { MdOutlineSick } from 'react-icons/md';
import style from './Container.module.scss';


const Container = (props) => {

    return (
        <div className={style.Container}>
            <div className={style.Toolbar}>
                <div>
                    <h1>نام سایت</h1>
                </div>
                
                <div className={style.User}>
                    {props.Title}
                    {props.Link}
                </div>

            </div>
            <div className={style.Dashboard}>
                <div className={style.SideBar}>
                    <div>
                        <ul className={style.Menu}>
                            {props.MenuButtons}
                        </ul>
                    </div>
                </div>
                <div className={style.Content}>
                    {props.children}
                </div>
            </div>
        </div>
    )

}

export default Container;
