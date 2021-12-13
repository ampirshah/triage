import React, { Fragment } from 'react';
import style from './Modal.module.scss';
import { CgCloseR } from 'react-icons/cg';

const Modal = (props) => {
    let Title = '', FullName = '', Specialty = '';


    if (props.isShown.patients) {
        if (props.modalShow.operation === 'edit') {
            Title = 'ویرایش اطلاعات بیمار';
            FullName = 'ویرایش نام بیمار'
        } else if (props.modalShow.operation === 'add') {
            Title = 'افزودن بیمار جدید';
            FullName = 'نام بیمار جدید'
        }
    }
    let DoctorsModal = <Fragment>
        <div className={style.Backdrop} onClick={props.CloseModal}></div>
        <div className={style.ModalContainer}>
            <div className={style.Modal}>
                <CgCloseR className={style.Cancel} onClick={props.CloseModal} />
                <div className={style.ModalContent}>
                    <h3>{props.modalShow.operation === 'edit' ? 'ویرایش اطلاعات پزشک' : 'افزودن پزشک جدید'}</h3>
                    <form className={style.TriageModal} onSubmit={props.submitDoctorHandler}>
                        <label>
                            {props.modalShow.operation === 'edit' ? 'ویرایش نام پزشک:' : 'نام پزشک جدید:'}
                            <input type='text' onChange={props.inputDoctorHandler} name='id' placeholder={props.modalShow.index < props.doctors.length ? props.doctors[props.modalShow.index].id : ''} autoComplete="off" />
                        </label>
                        <label>
                            {props.modalShow.operation === 'edit' ? 'ویرایش تخصص:' : 'تخصص:'}
                            <input type='text' onChange={props.inputDoctorHandler} name='title' placeholder={props.modalShow.index < props.doctors.length ? props.doctors[props.modalShow.index].title : ''} autoComplete="off" />
                        </label>
                        <button type='submit'>ثبت تغییرات</button>
                    </form>
                </div>
            </div>
        </div>
    </Fragment>

    let PatientsModal = <Fragment>
        <div className={style.Backdrop} onClick={props.CloseModal}></div>
        <div className={style.ModalContainer}>
            <div className={style.Modal}>
                <CgCloseR className={style.Cancel} onClick={props.CloseModal} />
                <div className={style.ModalContent}>
                    <h3>{props.modalShow.operation === 'edit' ? 'ویرایش اطلاعات بیمار' : 'افزودن بیمار جدید'}</h3>
                    <form className={style.TriageModal} onSubmit={props.submitPatientHandler}>
                        <label>
                            {props.modalShow.operation === 'edit' ? 'ویرایش نام بیمار:' : 'نام بیمار جدید:'}
                            <input type='text' onChange={props.inputPatientHandler} name='name'  autoComplete="off" />
                        </label>
                        <label>
                            {props.modalShow.operation === 'edit' ? 'ویرایش بیماری:' : 'بیماری:'}
                            <input type='text' onChange={props.inputPatientHandler} name='problem'  autoComplete="off" />
                        </label>
                        <button type='submit'>ثبت تغییرات</button>
                    </form>
                </div>
            </div>
        </div>
    </Fragment>
    return (
        <div>
            {props.isShown.doctors ? DoctorsModal : PatientsModal}
        </div>
    )
}

export default Modal
 // let Title,FullName,Specialty='';
    // if (props.isShown.doctors) {
    //     if (props.modalShow.operation === 'edit') {
    //         Title = 'ویرایش اطلاعات پزشک';
    //         FullName='ویرایش نام پزشک:'

    //     } else if (props.modalShow.operation === 'add') {
    //         Title = 'افزودن پزشک جدید';
    //         FullName='نام پزشک جدید:'
    //     }
    // }
    // if (props.isShown.patients) {
    //     if (props.modalShow.operation === 'edit') {
    //         Title = 'ویرایش اطلاعات بیمار';
    //         FullName='ویرایش نام بیمار'
    //     } else if (props.modalShow.operation === 'add') {
    //         Title = 'افزودن بیمار جدید';
    //         FullName='نام بیمار جدید'
    //     }
    // }
    // console.log("Title", props.modalShow.operation);
    // return (
    //     <Fragment>
    //         <div className={style.Backdrop} onClick={props.CloseModal}></div>
    //         <div className={style.ModalContainer}>
    //             <div className={style.Modal}>
    //                 <CgCloseR className={style.Cancel} onClick={props.CloseModal} />
    //                 <div className={style.ModalContent}>
    //                     <h3>{Title}</h3>
    //                     <form className={style.TriageModal} onSubmit={props.submitChangesHandler}>
    //                         <label>
    //                             {FullName}
    //                             <input type='text' onChange={props.inputChangedHandler} name='id' placeholder={props.modalShow.index < props.doctors.length ? props.doctors[props.modalShow.index].id : ''} autoComplete="off" />
    //                         </label>
    //                         <label>
    //                             {Specialty}
    //                             <input type='text' onChange={props.inputChangedHandler} name='title' placeholder={props.modalShow.index < props.doctors.length ? props.doctors[props.modalShow.index].title : ''} autoComplete="off" />
    //                         </label>
    //                         <button type='submit'>ثبت تغییرات</button>
    //                     </form>
    //                 </div>
    //             </div>

    //         </div>
    //     </Fragment>
    // )