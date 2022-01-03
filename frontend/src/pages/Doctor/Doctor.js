import React, { useState } from 'react';
import style from './Doctor.module.scss'
import Container from '../../hoc/Container/Container';
import { Link } from 'react-router-dom';
import PatientsList from '../../components/PatientsList/PatientsList';
import DoctorsList from '../../components/DoctorsList/DoctorsList';
const Doctor = () => {
    const [isShown, setIsShown] = useState({
        
    })
    let MenuButtons=<div>
        <li><button>لیست بیماران</button></li>
    </div>
    let NavLink=<Link to='/Triage'>تریاژ هستید؟</Link>
    return (
        <Container MenuButtons={MenuButtons} Link={NavLink} Title='پزشک'>
           
            <p>لیست بیماران</p>
        </Container>
    )
    
}

export default Doctor
