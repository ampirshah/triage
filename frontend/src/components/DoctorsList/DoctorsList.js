import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import style from './DoctorsList.module.scss';
import Modal from '../Modal/Modal';
import { FiEdit } from 'react-icons/fi';
import { toPersianNumber } from '../../helpers/action';
import { IoPersonAddOutline } from 'react-icons/io5'

const Doctors = (props) => {

    const TableHandler = () => {

        return props.doctors.map((doctor, index) => {
            const { userId, id, title } = doctor;
            if (index>0) {
                return <tr key={index}>
                    <td>{toPersianNumber(index)}</td>
                    <td>{toPersianNumber(id)}</td>
                    <td>{title}</td>
                    {/* <td className={style.EditButton}>
                        <button onClick={() => removeData(id)}>حذف</button>
                    </td> */}

                    <td className={style.EditButton}>
                        <button onClick={() => props.openEditModal(index)}><FiEdit /></button>
                    </td>

                </tr>
            }
        })
    }
    const TableHeaderHandler = () => {
        let header = ["شناسه", "نام پزشک", "تخصص", "ویرایش"]
        return header.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    }

    console.log("length", props.doctors.length);
    return (
        <Fragment>

            <div className={style.Doctors}>

                <h2> لیست پزشکان </h2>
                <table>
                    <tbody>
                        <tr>{TableHeaderHandler()}</tr>
                        {TableHandler()}
                    </tbody>
                </table>
                <div className={style.AddButtonContainer}><button className={style.AddButton} onClick={() => props.openAddModal(props.doctors.length)}>افزودن پزشک جدید<div><IoPersonAddOutline /></div></button></div>
            </div>
        </Fragment>
    )
}

export default Doctors
