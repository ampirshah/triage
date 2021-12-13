import React, { Fragment } from 'react';
import style from './PatientsList.module.scss';
import { toPersianNumber } from '../../helpers/action';
import { FiEdit } from 'react-icons/fi';
import { IoPersonAddOutline } from 'react-icons/io5';

const PatientsList = (props) => {

    const TableHandler = () => {
        return props.patients.map((patient, index) => {
            const { name, turn, problem } = patient;
            return <tr key={index}>
                <td>{toPersianNumber(index + 1)}</td>
                <td>{name}</td>
                <td>{problem}</td>
                <td>{turn}</td>
                {/* <td>{doctor.name}</td>
                <td>{doctor.visited}</td> */}

                <td className={style.EditButton}>
                    <button onClick={() => props.openEditModal(index)}><FiEdit /></button>
                </td>

            </tr>
        })
    }
    const TableHeaderHandler = () => {
        let header = ["شناسه", "نام بیمار", "نوبت", "پزشک", "وضعیت", "ویرایش"]
        return header.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    }

    console.log("length", props.patients.length);
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