import React, { Fragment } from 'react';

import style from './List.module.scss';
import { IoPersonAddOutline } from 'react-icons/io5';
import { toPersianNumber } from '../../helpers/action';
import { FiEdit } from 'react-icons/fi';


const List = (props) => {
    const doctorsTableHandler = () => {
        return props.doctors.map((doctor, index) => {
            const { fullName, specialty, phoneNumber } = doctor;

            return <tr key={index}>
                <td>{toPersianNumber(index + 1)}</td>
                <td>{fullName}</td>
                <td>{specialty}</td>
                <td>{toPersianNumber(phoneNumber)}</td>


                <td className={style.EditButton}>
                    <button onClick={() => props.openEditModal(doctor, index)}><FiEdit /></button>
                </td>
            </tr>
        })
    }
    const patientsTableHandler = () => {
        return props.patients.map((patient, index) => {

            const { fullName, nationalCode, turn, needTobeVisitBy, numberOfChildren } = patient;
            return <tr key={index}>
                <td>{toPersianNumber(index + 1)}</td>
                <td>{fullName}</td>
                <td>{toPersianNumber(nationalCode)}</td>
                <td>{toPersianNumber(turn)}</td>
                <td>{toPersianNumber(numberOfChildren)}</td>
                <td>
                    {needTobeVisitBy.map((n) => {
                        return <p key={n._id}>{n.doctor.fullName}</p>

                    })}
                </td>

                {/* <td className={style.EditButton}>
                    <button onClick={() => props.openEditModal(patient, index)}><FiEdit /></button>
                </td> */}
            </tr>

        })
    }
    const TableHeaderHandler = (header) => {

        return header.map((key, index) => {
            return <th key={index}>{key}</th>
        })

    }

    let title = '', Table = '', header, button;
    switch (props.isShown) {
        case 'doctors':
            title = " لیست پزشکان ";
            button = 'افزودن پزشک جدید';
            Table = <div>
                {props.doctors.length === 0 ?
                    <p>پزشکی ثبت نشده است. لطفا با کلیک روی دکمه زیر پزشک را اضافه کنید.</p> :
                    <table>
                        <tbody>
                            <tr>{TableHeaderHandler(["شناسه", "نام پزشک", "تخصص", "شماره تماس", "ویرایش"])}</tr>
                            {doctorsTableHandler()}
                        </tbody>
                    </table>
                }
            </div>
            break;
        case 'patients':
            title = " لیست بیماران ";
            button = 'افزودن بیمار جدید';
            Table = <div>
                {props.patients.length === 0 ?
                    <p>هیچ بیماری ثبت نشده است. لطفا با کلیک روی دکمه زیر بیمار را اضافه کنید.</p> :
                    <table>
                        <tbody>
                            <tr>{TableHeaderHandler(["شناسه", "نام بیمار", "کد ملی", "نوبت", "تعداد فرزندان", "پزشک"])}</tr>
                            {patientsTableHandler()}
                        </tbody>
                    </table>
                }
            </div>
    }

    return (
        <Fragment>
            <div className={style.List}>
                <h2>{title}</h2>
                {Table}

                <div className={style.AddButtonContainer}>
                    <button className={style.AddButton}
                        onClick={() => props.openAddModal()}>
                        {button}
                        <div><IoPersonAddOutline /></div>
                    </button>
                </div>
            </div>
        </Fragment>
    )
}

export default List