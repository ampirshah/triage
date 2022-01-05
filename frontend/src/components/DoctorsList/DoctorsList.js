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
            const { fullName, specialty, phoneNumber } = doctor;

            return <tr key={index}>
                <td>{toPersianNumber(index + 1)}</td>
                <td>{fullName}</td>
                <td>{specialty}</td>
                <td>{toPersianNumber(phoneNumber)}</td>


                <td className={style.EditButton}>
                    <button onClick={() => props.openEditModal(doctor,index)}><FiEdit /></button>
                </td>

            </tr>

        })
    }
    const TableHeaderHandler = () => {
        let header = ["شناسه", "نام پزشک", "تخصص", "شماره تماس", "ویرایش"]
        return header.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    }

    console.log("length", props.doctors.length);
    return (
        <Fragment>

            <div className={style.Doctors}>

                <h2> لیست پزشکان </h2>
                {props.doctors.length === 0 ?
                    <p>پزشکی ثبت نشده است. لطفا با کلیک روی دکمه زیر پزشک را اضافه کنید.</p>
                    : <table>
                        <tbody>
                            <tr>{TableHeaderHandler()}</tr>
                            {TableHandler()}
                        </tbody>
                    </table>
                }
                <div className={style.AddButtonContainer}><button className={style.AddButton} onClick={() => props.openAddModal(props.doctors.length)}>افزودن پزشک جدید<div><IoPersonAddOutline /></div></button></div>
            </div>
        </Fragment>
    )
}

export default Doctors
