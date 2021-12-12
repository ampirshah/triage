import React, { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import DoctorsList from '../../components/DoctorsList/DoctorsList';
import PatientsList from '../../components/PatientsList/PatientsList';
import {RiHealthBookLine} from 'react-icons/ri';
import {MdOutlineSick} from 'react-icons/md';
import style from './Triage.module.scss';

import Container from '../../hoc/Container/Container';
const Triage = () => {
    const [isShown, setIsShown] = useState({
        doctors: false,
        patients: false,
    })
    let MenuButtons=<div>
        <li><button onClick={() => setIsShown({ doctors: true, patients: false })}><RiHealthBookLine/>لیست پزشکان </button></li>
                <li><button onClick={() => setIsShown({ doctors: false, patients: true })}><MdOutlineSick/>لیست بیماران</button></li>
    </div>
    let NavLink=<Link to='/Doctor'>پزشک هستید؟</Link>
    return (
        <Container MenuButtons={MenuButtons} Link={NavLink} Title='تریاژ'>
           
            {isShown.doctors ? <DoctorsList  /> : null}
            {isShown.patients ? <PatientsList /> : null}
        </Container>
        
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
