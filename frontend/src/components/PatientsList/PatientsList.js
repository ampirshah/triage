import React, { Fragment } from 'react';
import style from './PatientsList.module.scss';
import { toPersianNumber } from '../../helpers/action';
import { FiEdit } from 'react-icons/fi';
import { IoPersonAddOutline } from 'react-icons/io5';
import Doctors from '../DoctorsList/DoctorsList';

const PatientsList = (props) => {

    // const DoctorsHandler=()=>{

    //     if(props.doctors.name){
    //         return props.doctors.map((doctor, index) => {
    //             const { name} = doctor;
    //             if (index>0) {
    //                 return <tr key={index}>  
    //                     <td>{name}</td>

    //                 </tr>
    //             }
    //         })
    //     }
    // }
    const TableHandler = () => {

        return props.patients.map((patient, index) => {

            const { name, nationalCode, turn, problem, doctor, status } = patient;

            if (index > 0) {
                return <tr key={index}>
                    <td>{toPersianNumber(index)}</td>
                    <td>{name}</td>
                    <td>{toPersianNumber(nationalCode)}</td>
                    <td>{problem}</td>
                    <td>{turn}</td>
                    <td>{doctor}</td>
                    {console.log("d",doctor)}
                    <td>{status}</td>
                    {/* <td>{()=>{return (props.patients.doctor).map((pDoctor,i)=>{
                    //const {dName,dVisit} = pDoctor;
                    return <tr key={i}>
                        <td>{pDoctor}</td>
                        </tr>
                })}}</td> */}

                    <td className={style.EditButton}>
                        <button onClick={() => props.openEditModal(index)}><FiEdit /></button>
                    </td>

                </tr>
            }
        })
    }
    const TableHeaderHandler = () => {
        let header = ["شناسه", "نام بیمار", "کد ملی", "علت مراجعه", "نوبت", "پزشک", "وضعیت", "ویرایش"]
        return header.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    }

    //    console.log("doctor.name", props.patients[0].doctor.name);
    return (
        <Fragment>

            <div className={style.Patients}>

                <h2> لیست بیماران </h2>
                <table>
                    <tbody>
                        <tr>{TableHeaderHandler()}</tr>
                        {TableHandler()}
                    </tbody>
                </table>

                <div className={style.AddButtonContainer}>
                    <button className={style.AddButton}
                        onClick={() => props.openAddModal(props.patients.length)}>
                        افزودن بیمار جدید
                        <div><IoPersonAddOutline /></div>
                    </button>
                </div>
            </div>
        </Fragment>
    )
}

export default PatientsList