import React, { Fragment } from 'react';
import style from './PatientsList.module.scss';
import { toPersianNumber } from '../../helpers/action';
import { FiEdit } from 'react-icons/fi';
import { IoPersonAddOutline } from 'react-icons/io5';


const PatientsList = (props) => {

    const TableHandler = () => {
        
        return props.patients.map((patient, index) => {
           
            const { name, nationalCode, turn, doctor, status } = patient;

                return <tr key={index}>
                    <td>{toPersianNumber(index+1)}</td>
                    <td>{name}</td>
                    <td>{toPersianNumber(nationalCode)}</td>
                    <td>{turn}</td>
                    <td>
                    {doctor.map((d)=>{
                       return <p key={d.name}>{d.name}</p>
                    })}
                    </td>
                    <td>{status}</td>
                    
                    <td className={style.EditButton}>
                        <button onClick={() => props.openEditModal(patient,index)}><FiEdit /></button>
                    </td>
                </tr>
            
        })
    }
    const TableHeaderHandler = () => {
        let header = ["شناسه", "نام بیمار", "کد ملی", "نوبت", "پزشک", "وضعیت", "ویرایش"]
        return header.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    }

    //    console.log("doctor.name", props.patients[0].doctor.name);
    return (
        <Fragment>

            <div className={style.Patients}>

                <h2> لیست بیماران </h2>
                {props.patients.length===0 ? 
                <p>هیچ بیماری ثبت نشده است. لطفا با کلیک روی دکمه زیر بیمار را اضافه کنید.</p>
                :
                <table>
                <tbody>
                    <tr>{TableHeaderHandler()}</tr>
                    {TableHandler()}
                </tbody>
            </table>
            }
               

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