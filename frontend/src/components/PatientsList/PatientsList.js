import React, { Fragment } from 'react';

import style from './PatientsList.module.scss';
import { IoPersonAddOutline } from 'react-icons/io5';
import { toPersianNumber } from '../../helpers/action';


const PatientsList = (props) => {

    const TableHandler = () => {

        return props.patients.map((patient, index) => {
            
            const { fullName, nationalCode, turn, needTobeVisitBy, status } = patient;

            return <tr key={index}>
                <td>{toPersianNumber(index + 1)}</td>
                <td>{fullName}</td>
                <td>{toPersianNumber(nationalCode)}</td>
                <td>{toPersianNumber(turn)}</td>
                <td>
                    {needTobeVisitBy.map((n) => {
                        return <p key={n._id}>{n.doctor.fullName}</p>
                        
                    })}
                </td>
                <td>{status}</td>
                {/* <td className={style.EditButton}>
                    <button onClick={() => props.openEditModal(patient, index)}><FiEdit /></button>
                </td> */}
            </tr>

        })
    }

    const TableHeaderHandler = () => {
        let header = ["شناسه", "نام بیمار", "کد ملی", "نوبت", "پزشک", "وضعیت",]
        return header.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    }

    return (
        <Fragment>

            <div className={style.Patients}>

                <h2> لیست بیماران </h2>
                {props.patients.length === 0 ?
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