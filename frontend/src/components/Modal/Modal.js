import React, { Fragment, useState } from 'react';
import style from './Modal.module.scss';
import { CgCloseR } from 'react-icons/cg';
import Checkbox from '../UI/Checkbox/Checkbox';

const Modal = (props) => {
    let Title = '', Input1 = '', Input2 = '', Input3 = '', Input4 = '', Submit = '';

    // const checkboxChangeHandler = () => {
    //     setChecked(!checked);
    // };

    switch (props.modalShow.operation) {
        case 'edit':
            if (props.isShown === 'doctors') {
                Submit = props.submitDoctorHandler;
                Title = 'ویرایش اطلاعات پزشک';
                Input1 = <label>
                    ویرایش نام پزشک:
                    <input type='text' onChange={props.inputDoctorHandler} name='name' value={props.changedDoctor.name} autoComplete="off" />
                </label>
                Input2 = <label>
                    ویرایش تخصص:
                    <input type='text' onChange={props.inputDoctorHandler} name='specialty' value={props.changedDoctor.specialty} autoComplete="off" />
                </label>
                Input3 = <label>
                    ویرایش شماره تماس:
                    <input type='text' onChange={props.inputDoctorHandler} name='phoneNumber' value={props.changedDoctor.phoneNumber} autoComplete="off" />
                </label>

            } else if (props.isShown === 'patients') {
                Submit = props.submitPatientHandler;
                Title = 'ویرایش اطلاعات بیمار';
                Input1 = <label>
                    ویرایش نام بیمار:
                    <input type='text' onChange={props.inputPatientHandler} name='name' value={props.changedPatient.name} autoComplete="off" />
                </label>
                Input2 = <label>
                    ویرایش کد ملی :
                    <input type='text' onChange={props.inputPatientHandler} name='nationalCode' value={props.changedPatient.nationalCode} autoComplete="off" />
                </label>
                Input3 = <label>
                    ویرایش بیماری:
                    <input type='text' onChange={props.inputPatientHandler} name='problem' value={props.changedPatient.problem} autoComplete="off" />
                </label>
                Input4 = <label>
                    ویرایش نام پزشک:
                    <select name='doctor' onChange={props.inputPatientHandler} >
                        {props.doctors.map((d, i) => {
                            return <option key={i} >{d.name}</option>
                        })}
                    </select>
                </label>
                // Input4 = <label>
                //     ویرایش نام پزشک:
                //     <input type='text' onChange={props.inputPatientHandler} name='doctor' value={props.changedPatient.doctor} autoComplete="off" />
                // </label>

            }
            break;
        case 'add':
            if (props.isShown === 'doctors') {
                Submit = props.submitDoctorHandler;
                Title = 'افزودن پزشک جدید';
                Input1 = <label>
                    نام پزشک جدید:
                    <input type='text' onChange={props.inputDoctorHandler} name='name' value={props.changedDoctor.name} autoComplete="off" />

                </label>;
                Input2 = <label>
                    تخصص:
                    <input type='text' onChange={props.inputDoctorHandler} name='specialty' value={props.changedDoctor.specialty} autoComplete="off" />
                </label>
                Input3 = <label>
                    شماره تماس:
                    <input type='text' onChange={props.inputDoctorHandler} name='phoneNumber' value={props.changedDoctor.phoneNumber} autoComplete="off" />
                </label>

            } else if (props.isShown === 'patients') {
                Submit = props.submitPatientHandler;
                Title = 'افزودن بیمار جدید';
                Input1 = <label>
                    نام بیمار جدید:
                    <input type='text' onChange={props.inputPatientHandler} name='name' value={props.changedPatient.name} autoComplete="off" />
                </label>
                Input2 = <label>
                    کد ملی:
                    <input type='text' onChange={props.inputPatientHandler} name='nationalCode' value={props.changedPatient.nationalCode} autoComplete="off" />
                </label>
                Input3 = <label>
                    بیماری:
                    <input type='text' onChange={props.inputPatientHandler} name='problem' value={props.changedPatient.problem} autoComplete="off" />
                </label>
                Input4 = <label>
                    نام پزشک
                    {/* <select name='doctor' onChange={props.inputPatientHandler} >
                        {props.doctors.map((d, i) => {
                            return <option key={i} mult>{d.name}</option>
                        })}
                    </select> */}

                    {/* <Multiselect className={style.SelectBox} options={props.doctors}
                        selectedValues={props.doctors.selectedValue} 
                        displayValue="name"
                        /> */}
                    {/* {props.doctors.map((d, i) => {
                        return <Checkbox
                            label={d.name}
                            value={props.doctors.isChecked}
                            onChange={checkboxChangeHandler}
                        />
                    })} */}




                </label>
                // Input4 = <label>
                //     نام پزشک:
                //     <input type='text' onChange={props.inputPatientHandler} name='doctor' value={props.changedPatient.doctor} autoComplete="off" />
                // </label>
            }
            break;
    }

    return (
        <Fragment>
            <div className={style.Backdrop} onClick={props.CloseModal}></div>
            <div className={style.ModalContainer}>
                <div className={style.Modal}>
                    <CgCloseR className={style.Cancel} onClick={props.CloseModal} />


                    <div className={style.ModalContent}>
                        <h3>{Title}</h3>
                        <form className={style.TriageModal} onSubmit={Submit}>
                            {Input1}
                            {Input2}
                            {Input3}
                            {Input4}
                            <button type='submit'>ثبت تغییرات</button>
                        </form>
                    </div>

                </div>
            </div>
        </Fragment>
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




    //2

    // let DoctorsModal = <Fragment>
    //     <div className={style.Backdrop} onClick={props.CloseModal}></div>
    //     <div className={style.ModalContainer}>
    //         <div className={style.Modal}>

    //             <CgCloseR className={style.Cancel} onClick={props.CloseModal} />
    //             {props.modalShow.operation === 'edit' ?
    //                 <div className={style.ModalContent}>
    //                     <h3>ویرایش اطلاعات پزشک</h3>
    //                     <form className={style.TriageModal} onSubmit={props.submitDoctorHandler}>
    //                         <label>
    //                             ویرایش نام پزشک:
    //                             <input type='text' onChange={props.inputDoctorHandler} name='name' value={props.changedDoctor.name} autoComplete="off" />
    //                             {/* placeholder={props.modalShow.index < props.doctors.length ? props.doctors[props.modalShow.index].id : ''} */}
    //                         </label>
    //                         <label>
    //                             ویرایش تخصص:
    //                             <input type='text' onChange={props.inputDoctorHandler} name='specialty' value={props.changedDoctor.specialty} autoComplete="off" />
    //                         </label>
    //                         <button type='submit'>ثبت تغییرات</button>
    //                     </form>
    //                 </div> : <div className={style.ModalContent}>
    //                     <h3>افزودن پزشک جدید</h3>
    //                     <form className={style.TriageModal} onSubmit={props.submitDoctorHandler}>
    //                         <label>
    //                             نام پزشک جدید:
    //                             <input type='text' onChange={props.inputDoctorHandler} name='name' value={props.changedDoctor.name} autoComplete="off" />
    //                             {/* placeholder={props.modalShow.index < props.doctors.length ? props.doctors[props.modalShow.index].id : ''} */}
    //                         </label>
    //                         <label>
    //                             تخصص:
    //                             <input type='text' onChange={props.inputDoctorHandler} name='specialty' value={props.changedDoctor.specialty} autoComplete="off" />
    //                         </label>
    //                         <button type='submit'>ثبت تغییرات</button>
    //                     </form>
    //                 </div>
    //             }
    //         </div>
    //     </div>
    // </Fragment>

    // console.log("Modal", props.modalShow.index);

    // let PatientsModal = <Fragment>
    //     <div className={style.Backdrop} onClick={props.CloseModal}></div>
    //     <div className={style.ModalContainer}>
    //         <div className={style.Modal}>
    //             <CgCloseR className={style.Cancel} onClick={props.CloseModal} />



    //             {props.modalShow.operation === 'edit' ?
    //                 <div className={style.ModalContent}>
    //                     <h3>ویرایش اطلاعات بیمار</h3>
    //                     <form className={style.TriageModal} onSubmit={props.submitPatientHandler}>
    //                         <label>
    //                             ویرایش نام بیمار:
    //                             <input type='text' onChange={props.inputPatientHandler} name='name' value={props.changedPatient.name} autoComplete="off" />
    //                         </label>
    //                         <label>
    //                             ویرایش کد ملی :
    //                             <input type='text' onChange={props.inputPatientHandler} name='nationalCode' value={props.changedPatient.nationalCode} autoComplete="off" />
    //                         </label>
    //                         <label>
    //                             ویرایش بیماری:
    //                             <input type='text' onChange={props.inputPatientHandler} name='problem' value={props.changedPatient.problem} autoComplete="off" />
    //                         </label>
    //                         <button type='submit'>ثبت تغییرات</button>
    //                     </form>
    //                 </div>
    //                 : <div className={style.ModalContent}>
    //                     <h3>افزودن بیمار جدید</h3>
    //                     <form className={style.TriageModal} onSubmit={props.submitPatientHandler}>
    //                         <label>
    //                             نام بیمار جدید:
    //                             <input type='text' onChange={props.inputPatientHandler} name='name' value={props.changedPatient.name} autoComplete="off" />
    //                         </label>
    //                         <label>
    //                             کد ملی :
    //                             <input type='text' onChange={props.inputPatientHandler} name='nationalCode' value={props.changedPatient.nationalCode} autoComplete="off" />
    //                         </label>
    //                         <label>

    //                             بیماری:
    //                             <input type='text' onChange={props.inputPatientHandler} name='problem' value={props.changedPatient.problem} autoComplete="off" />
    //                         </label>
    //                         <button type='submit'>ثبت تغییرات</button>
    //                     </form>
    //                 </div>
    //             }

    //         </div>
    //     </div>
    // </Fragment>