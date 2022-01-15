import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './Doctor.module.scss'
import Container from '../../hoc/Container/Container';
import { Link } from 'react-router-dom';
import { toEnglishNumber, toPersianNumber } from '../../helpers/action'
import Cookies from 'js-cookie';
import { MdOutlineSick } from 'react-icons/md';

function Doctor() {
    const [info, setInfo] = useState();
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const token = Cookies.get('token')
        let config = {
            headers: {
                token,
            }
        }

        axios.get('http://localhost:4500/doctor/patientList', config)
            .then(response => {
                console.log("response", response.data.listOfPatient);
                setInfo(response.data.doctor.fullName)
                setPatients(response.data.listOfPatient)
            }).catch(error => {
                console.log("error", error)
            }
            )
    }, [])


    const TableHandler = () => {

        return patients.map((patient, index) => {

            const { fullName, nationalCode, turn, doctor, status } = patient;

            return <tr key={index}>
                <td>{toPersianNumber(index + 1)}</td>
                <td>{fullName}</td>
                <td>{toPersianNumber(nationalCode)}</td>
                <td>{toPersianNumber(turn)}</td>
               
            
            </tr>

        })
    }
    const TableHeaderHandler = () => {
        let header = ["شناسه", "نام بیمار", "کد ملی","نوبت"]
        return header.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    }
    let MenuButtons = <div>
        <li><button> <div><MdOutlineSick /></div>لیست بیماران</button></li>
    </div>
    let NavLink = <Link to='/Triage'>تریاژ </Link>

    console.log("Doctors->Patients", patients)
    return (
        <Container MenuButtons={MenuButtons} Link={NavLink} Title={info}>
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
// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// };
export default Doctor
