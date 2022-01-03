import React, { Fragment, useState } from 'react';
import style from './Modal.module.scss';
import { CgCloseR } from 'react-icons/cg';
import { toPersianNumber } from '../../helpers/action';
import { RiArrowDropDownLine } from 'react-icons/ri';

const Modal = (props) => {
    let Title = '', Input1 = '', Input2 = '', Input3 = '', Submit = '';
    const [showList, setshowList] = useState(false)
    
    switch (props.modalShow.operation) {
        case 'edit':
            if (props.isShown === 'doctors') {
                Submit = props.submitDoctorHandler;
                Title = 'ویرایش اطلاعات پزشک';
                {console.log("MODAL,changed Doctror",props.changedDoctor)}
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
                    ویرایش نام پزشک:

                    <div className={style.MultiSelectContainer}>
                        {console.log("changedPatient.doctor", props.changedPatient.doctor)}
                        <h5 onClick={() => setshowList(!showList)}>{toPersianNumber(props.changedPatient.doctor.filter(t => (t.selected === true)).length)} پزشک انتخاب شده <RiArrowDropDownLine /></h5>
                        <div className={showList ? style.MultiSelectShow : style.MultiSelectHide}>
                           
                            {props.sortedDoctorsListEdit.map((d, i) => {
                                let index = props.changedPatient.doctor.findIndex(pd => (pd.name === d));
                                return <p className={(props.changedPatient.doctor[index] && props.changedPatient.doctor[index].selected === true) ? style.Selected : null} key={d} onClick={() => props.editSelectDoctorHandler(d)}>{d}</p>
                            })}
                            
                             {props.sortedDoctorsListAdd.filter(f=>!props.sortedDoctorsListEdit.includes(f)).map(d=>{
                                 let index = props.changedPatient.doctor.findIndex(pd => (pd.name === d));
                                 return <p className={(props.changedPatient.doctor[index] && props.changedPatient.doctor[index].selected === true) ? style.Selected : null} key={d} onClick={() => props.editSelectDoctorHandler(d)}>{d}</p>
                             })}
                            
                        </div>
                    </div>
                </label>


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
                    نام پزشک:

                    <div className={style.MultiSelectContainer}>
                        {console.log("changedPatient.doctor", props.changedPatient.doctor)}
                        <h5 onClick={() => setshowList(!showList)}>{toPersianNumber(props.changedPatient.doctor.filter(t => (t.selected === true)).length)} پزشک انتخاب شده <RiArrowDropDownLine /></h5>
                        <div className={showList ? style.MultiSelectShow : style.MultiSelectHide}>
                           
                            {props.sortedDoctorsListAdd.map((d, i) => {
                                let index = props.changedPatient.doctor.findIndex(pd => (pd.name === d));
                                return <p className={(props.changedPatient.doctor[index] && props.changedPatient.doctor[index].selected === true) ? style.Selected : null} key={d} onClick={() => props.selectDoctorHandler(d)} >{d}</p>
                            })}
                        </div>
                    </div>
                </label>
               
            }
            break;
    }

    return (
        <Fragment>
            
            <div className={style.ModalContainer}>
            <div className={style.Backdrop} onClick={props.CloseModal}></div>
                <div className={style.Modal}>
                    <CgCloseR className={style.Cancel} onClick={props.CloseModal} />

                    <div className={style.ModalContent}>
                        <h3>{Title}</h3>
                        <form id='Modal' className={style.TriageModal} onSubmit={Submit}>
                            {Input1}
                            {Input2}
                            {Input3}

                            <button type='submit' form='Modal'>ثبت تغییرات</button>
                        </form>
                    </div>

                </div>
            </div>
        </Fragment>
    )
}

export default Modal;







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