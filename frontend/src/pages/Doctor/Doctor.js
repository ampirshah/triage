import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import style from './Doctor.module.scss'
import { MdOutlineListAlt, MdOutlineSick } from 'react-icons/md';

import Container from '../../hoc/Container/Container';
import { toEnglishNumber, toPersianNumber } from '../../helpers/action'

function Doctor() {
    const [isShown, setIsShown] = useState("list");
    const [info, setInfo] = useState();
    const [patients, setPatients] = useState([]);
    const [popUpMessage, setPopUpMessage] = useState('');
    const [nextPatient, setNextPatient] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [currentPatient, setCurrentPatient] = useState();

    useEffect(() => {
        setIsLoading(true);
        const token = Cookies.get('token')
        const config = {
            headers: {
                token
            }
        }
        axios.get('http://localhost:4500/doctor/patientList', config)
            .then(response => {
                //console.log("Response :patientList", response?.data);
                setInfo({ fullName: response.data.doctor.fullName, _id: response.data.doctor._id })
                setPatients(response?.data.listOfPatient)
                setIsLoading(false);
            }).catch(error => {
                //console.log("Response :patientList", error.response)
                setPopUpMessage(error.response?.data.error);
            }
            )

    }, [])

    useEffect(() => {
        if (isShown !== 'list') {
            const token = Cookies.get('token')
            const config = {
                headers: {
                    token
                }
            }
            axios.get('http://localhost:4500/doctor/callForPatient', config)
                .then(response => {
                    //console.log("Response :callForPatient", response);
                    setNextPatient(response.data.nextPatient);
                }).catch(error => {
                    //console.log("Response :patientList", error.response)
                    
                }
                )
        }
    }, [isShown])

    const updatePatient = () => {
        if (nextPatient) {
            setCurrentPatient({ ...nextPatient });
        }

        const token = Cookies.get('token')
        const config = {
            headers: {
                token
            }
        }
        axios.get('http://localhost:4500/doctor/callForPatient', config)
            .then(response => {
                //console.log("Response :callForPatient", response);
                setNextPatient(response.data.nextPatient);
            }).catch(error => {
                //console.log("Response :patientList", error.response)
                
            }
            )

    }
    const TableHandler = () => {

        return patients.map((patient, index) => {

            const { fullName, nationalCode, turn, numberOfChildren } = patient;

            return <tr key={index}>
                <td>{toPersianNumber(index + 1)}</td>
                <td>{fullName}</td>
                <td>{toPersianNumber(nationalCode)}</td>
                <td>{toPersianNumber(numberOfChildren)}</td>
                <td>{toPersianNumber(turn)}</td>

            </tr>
        })
    }
    const TableHeaderHandler = () => {
        let header = ["شناسه", "نام بیمار", "کد ملی", "تعداد فرزندان", "نوبت"]
        return header.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    }
    // const logoutHandler=()=>{
    //     Cookies.remove('token');
    // }


    const enterPatientHandler = () => {
        if (nextPatient) {
            let token = Cookies.get('token');
            const data = {
                turn: nextPatient.turn
            }

            axios.post('http://localhost:4500/doctor/patiententer', data, {
                headers: {
                    token
                }
            }).then(response => {
                //console.log("Response :patiententer", response);
                setNextPatient(response.data.update)
                updatePatient();
            }).catch(error => {
                //console.log("Error :patiententer", error.response)
                
            }
            )
        } else {
            setPopUpMessage("بیمار ویزیت نشده یافت نشد!")
        }
    }

    const exitPatientHandler = () => {
        if (nextPatient) {
            let token = Cookies.get('token');
            const data = {
                turn: currentPatient.turn
            }

            axios.post('http://localhost:4500/doctor/patientexit', data, {
                headers: {
                    token
                }
            }).then(response => {
                //console.log("Response :patientexit", response);
                setCurrentPatient();

            }).catch(error => {
                //console.log("Error :patientexit", error.response)
            }
            )
        } else {
            setCurrentPatient();
            setPopUpMessage("بیمار ویزیت نشده یافت نشد!")
        }
    }

    let MenuButtons = <div>
        <li><button onClick={() => setIsShown("list")}><div><MdOutlineListAlt /></div>لیست بیماران</button></li>
        <li><button onClick={() => setIsShown("next")}><div><MdOutlineSick /></div>ویزیت بیمار</button></li>
    </div>
    let NavLink = <div onClick={() => Cookies.remove('token')}><Link to='/Login'>خروج</Link></div>

    // console.log("Doctors:Patients State", patients)
    // console.log("Doctors:Info", info);
    // console.log("Doctors:Next Patient", nextPatient)
    // console.log("Doctors:Current Patient", currentPatient);
    return (
        <Container popUpMessage={popUpMessage} clearMessage={() => setPopUpMessage('')} MenuButtons={MenuButtons} Link={NavLink} Title={info?.fullName}>
            {isLoading ?
                <div className={style.Loading}>
                    <div className={style['lds-dual-ring']}></div>
                    <p>لطفا کمی صبر کنید...</p>
                </div> :
                <div>
                    {isShown === "list" ? <div className={style.PatientList}>
                        <h2> لیست بیماران </h2>
                        {patients.length === 0 ?
                            <p>هیچ بیماری ثبت نشده است.</p>
                            :
                            <table>
                                <tbody>
                                    <tr>{TableHeaderHandler()}</tr>
                                    {TableHandler()}
                                </tbody>
                            </table>
                        }
                    </div> :
                        <div className={style.NextPatient}>
                            <div style={{ height: '80px' }}></div>
                            <div className={style.NextPatientInfo}>
                                <h4>مشخصات بیمار در حال ویزیت:</h4>

                                {currentPatient ? <div>
                                    <p><span> نام بیمار :</span> {currentPatient?.fullName}</p>
                                    <p><span> تعداد فرزندان : </span>{toPersianNumber(currentPatient?.numberOfChildren)}</p>
                                    <p><span> کد ملی :</span> {toPersianNumber(currentPatient?.nationalCode)}</p>
                                    <p><span> نوبت : </span>{toPersianNumber(currentPatient?.turn)}</p>
                                    <button onClick={() => exitPatientHandler()}>خروج بیمار</button>
                                </div>
                                    : <p style={{ marginBottom: '193px' }}>بیمار ویزیت نشده یافت نشد!</p>}
                            </div>

                            <div className={style.NextPatientInfo}>
                                <h4>مشخصات بیمار بعدی:</h4>
                                {nextPatient ? <div>
                                    <p><span> نام بیمار :</span> {nextPatient?.fullName}</p>
                                    <p><span> تعداد فرزندان : </span>{toPersianNumber(nextPatient?.numberOfChildren)}</p>
                                    <p><span> کد ملی :</span> {toPersianNumber(nextPatient?.nationalCode)}</p>
                                    <p><span> نوبت : </span>{toPersianNumber(nextPatient?.turn)}</p>
                                    <button onClick={() => enterPatientHandler()}>ورود بیمار</button>
                                </div>

                                    : <p style={{ marginBottom: '193px' }}>بیمار ویزیت نشده یافت نشد!</p>}
                            </div>
                        </div>

                    }
                </div>}

        </Container>
    )

}

export default Doctor;

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// };