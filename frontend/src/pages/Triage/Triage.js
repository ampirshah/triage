import React, { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import DoctorsList from '../../components/DoctorsList/DoctorsList';
import PatientsList from '../../components/PatientsList/PatientsList';

import style from './Triage.module.scss';

const Triage = () => {
    const [isShown, setIsShown] = useState({
        doctors: false,
        patients: false,
    })
    
    
    
    return (
        <div className={style.Container}>
            <div className={style.Toolbar}>
                <div>
                    <h1>نام سایت</h1>
                </div>
                <div className={style.User}>
                    <p>یه چیزی</p>
                </div>

            </div>
            <div className={style.Dashboard}>
                <div className={style.SideBar}>
                    <div>
                        <ul className={style.Menu}>
                            <li><button onClick={() => setIsShown({ doctors: true, patients: false })}>لیست پزشک ها</button></li>
                            <li><button onClick={() => setIsShown({ doctors: false, patients: true })}>لیست بیماران</button></li>

                        </ul>
                    </div>
                </div>
                <div className={style.Content}>
                    {/* <button onClick={submitChangesHandler}>دکمه</button> */}
                    {isShown.doctors ? <DoctorsList  /> : null}
                    {isShown.patients ? <PatientsList /> : null}
                </div>
            </div>
        </div>
    )

}

export default Triage;


// const [doctors, setDoctors] = useState({
    //     id: 0,
    //     name: '',
    //     specialty: '',
    //     phoneNumber: ''
    // })

    
    // const data={
    //     name: 'فلان فلانی 1',
    // }


    // const [doctors, setDoctors] = useState([{
    //     id: 1,
    //     name: 'فلان فلانی 1',
    //     specialty: 'عمومی',
    //     phoneNumber: '09111111111'
    // },
    // {
    //     id: 2,
    //     name: 'فلان فلانی 2',
    //     specialty: 'مغز و اعصاب',
    //     phoneNumber: '09222222222'
    // },
    // {
    //     id: 3,
    //     name: 'فلان فلانی 3',
    //     specialty: 'دندانپزشک',
    //     phoneNumber: '09333333333'
    // },
    // {
    //     id: 4,
    //     name: 'فلان فلانی 4',
    //     specialty: 'قلب',
    //     phoneNumber: '0944444444'
    // },
    // {
    //     id: 5,
    //     name: 'فلان فلانی 5',
    //     specialty: 'ریه',
    //     phoneNumber: '0955555555'
    // }
    // ])
