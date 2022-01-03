import React, { useState } from 'react';
import style from './Doctor.module.scss'
import Container from '../../hoc/Container/Container';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
function Doctor() {
    // async function Doctor(credentials) {
    //     return fetch('http://localhost:8080/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(credentials)
    //     })
    //         .then(data => data.json())
    // }

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
