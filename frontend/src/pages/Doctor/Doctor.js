import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './Doctor.module.scss'
import Container from '../../hoc/Container/Container';
import { Link } from 'react-router-dom';
import {toEnglishNumber} from '../../helpers/action'
import Cookies from 'js-cookie';

function Doctor() {
    useEffect(() => {
        const token=Cookies.get('token')
        axios.get('http://localhost:4500/doctor/patientList')
            .then(response => {
                console.log("response", response);
            }).catch(error => {
                console.log("error", error)
            }
            )
    }, [])
    let MenuButtons = <div>
        <li><button>لیست بیماران</button></li>
    </div>
    let NavLink = <Link to='/Triage'>تریاژ هستید؟</Link>
    return (
        <Container MenuButtons={MenuButtons} Link={NavLink} Title='پزشک'>

            <p>لیست بیماران</p>
        </Container>
    )

}
// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// };
export default Doctor
