import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import style from './Doctor.module.scss'
import { MdOutlineSick } from 'react-icons/md';

import Container from '../../hoc/Container/Container';
import { toEnglishNumber, toPersianNumber } from '../../helpers/action'

function Doctor() {
    const [info, setInfo] = useState();
    const [patients, setPatients] = useState([]);
    const [popUpMessage, setPopUpMessage] = useState('');
    useEffect(() => {
        const token = Cookies.get('token')
        let config = {
            headers: {
                token
            }
        }
        axios.get('http://localhost:4500/doctor/patientList', config)
            .then(response => {
                console.log("Response :patientList", response.data.doctor._id);
                setInfo({ fullName: response.data.doctor.fullName, _id: response.data.doctor._id })
                setPatients(response.data.listOfPatient)

            }).catch(error => {
                console.log("Response :patientList", error.response)
                setPopUpMessage(error.response.data.error);
            }
            )
        axios.get('http://localhost:4500/doctor/callForPatient', config)
            .then(response => {
                console.log("Response :callForPatient", response.data);
               
            }).catch(error => {
                console.log("Response :patientList", error.response)
                //setPopUpMessage(error.response.data.error);
            }
            )
    }, [])

    const TableHandler = () => {

        return patients.map((patient, index) => {

            const { fullName, nationalCode, turn, needTobeVisitBy, numberOfChildren } = patient;

            return <tr key={index}>
                <td>{toPersianNumber(index + 1)}</td>
                <td>{fullName}</td>
                <td>{toPersianNumber(nationalCode)}</td>
                <td>{toPersianNumber(turn)}</td>
                <td>{toPersianNumber(numberOfChildren)}</td>
                {/* <td>
                    {needTobeVisitBy.map((n) => {
                        return <p key={n._id}>{n.doctor.fullName}</p>
                        
                    })}
                </td> */}

            </tr>
        })
    }
    const TableHeaderHandler = () => {
        let header = ["شناسه", "نام بیمار", "کد ملی", "نوبت", "تعداد فرزندان"]
        return header.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    }
    // const logoutHandler=()=>{
    //     Cookies.remove('token');
    // }

    let MenuButtons = <div>
        <li><button> <div><MdOutlineSick /></div>لیست بیماران</button></li>
    </div>
    let NavLink = <div onClick={() => Cookies.remove('token')}><Link to='/Login'>خروج</Link></div>

    console.log("Doctors:Patients State", patients)
    console.log("Doctors:Info", info)
    return (
        <Container popUpMessage={popUpMessage} clearMessage={() => setPopUpMessage('')} MenuButtons={MenuButtons} Link={NavLink} Title={info?.fullName}>
            <div className={style.Doctor}>
                <h2> لیست بیماران </h2>
                {patients.length === 0 ?
                    <p>هیچ بیماری ثبت نشده است. لطفا با کلیک روی دکمه زیر بیمار را اضافه کنید.</p>
                    :
                    <table>
                        <tbody>
                            <tr>{TableHeaderHandler()}</tr>
                            {TableHandler()}
                        </tbody>
                    </table>
                }
            </div>
        </Container>
    )

}

export default Doctor;

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// };