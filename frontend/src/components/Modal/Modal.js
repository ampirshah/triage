import React, { Fragment, useState } from 'react';
import style from './Modal.module.scss';
import { CgCloseR } from 'react-icons/cg';
import { toPersianNumber } from '../../helpers/action';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { searcher } from '../../helpers/action';
const Modal = (props) => {
    let Title = '', Input1 = '', Input2 = '', Input3 = '', Input4 = '', Submit = '';
    const [showList, setShowList] = useState(false);
    
    const sortedDoctors=()=>{
        let SortedDoctors = [];
        {props.sortedDoctorsList.map(id => (
            props.doctors.map(d => {
                if (id === d._id) {
                    SortedDoctors.push(d)
                }
            })
        ))}
        return SortedDoctors;
    }
    switch (props.isShown) {
        case 'doctors':
            let dName, specialty, phoneNumber;
            if (props.modalShow.operation === 'add') {
                Title = 'افزودن پزشک جدید'
                dName = ' نام پزشک جدید:';
                specialty = ' تخصص:';
                phoneNumber = '  شماره تماس:'
                Submit = props.submitDoctorHandler;
            } else if (props.modalShow.operation === 'edit') {
                Title = 'ویرایش اطلاعات پزشک'
                dName = ' ویرایش نام پزشک:';
                specialty = ' ویرایش تخصص:';
                phoneNumber = ' ویرایش شماره تماس:';
                Submit = props.submitChangedDoctorHandler;
            }

            Input1 = <label>
                {dName}
                <input type='text' onChange={props.inputDoctorHandler} name='fullName' value={props.changedDoctor?.fullName} onBlur={(event) => props.blurHandler(event, "پزشک")} autoComplete="off" />
                <p className={style.ErrorMessage}>{props.errorMessage.fullName}</p>
            </label>;
            Input2 = <label>
                {specialty}
                <input type='text' onChange={props.inputDoctorHandler} name='specialty' value={props.changedDoctor?.specialty} onBlur={(event) => props.blurHandler(event, "پزشک")} autoComplete="off" />
                <p className={style.ErrorMessage}>{props.errorMessage.specialty}</p>
            </label>
            Input3 = <label>
                {phoneNumber}
                <input type='text' onChange={props.inputDoctorHandler} name='phoneNumber' value={props.changedDoctor?.phoneNumber} onBlur={(event) => props.blurHandler(event, "پزشک")} autoComplete="off" />
                <p className={style.ErrorMessage}>{props.errorMessage.phoneNumber}</p>
            </label>

            break;
        case 'patients':
            let pName, nationalCode, doctors, numberOfChildren;
            if (props.modalShow.operation === 'add') {
                Title = 'افزودن بیمار جدید';
                pName = 'نام بیمار جدید:';
                nationalCode = 'کد ملی:';
                numberOfChildren = 'تعداد فرزندان:'
                doctors = ' نام پزشک(ها):'
                Submit = props.submitPatientHandler;
            } else if (props.modalShow.operation === 'edit') {
                Title = 'ویرایش اطلاعات بیمار ';
                pName = 'ویرایش نام بیمار :';
                nationalCode = 'ویرایش کد ملی:';
                doctors = ' ویرایش نام پزشک(ها):'
                //Submit = props.submitPatientHandler;
            }

            Input1 = <label>
                {pName}
                <input type='text' onChange={props.inputPatientHandler} name='fullName' value={props.changedPatient?.fullName} onBlur={(event) => props.blurHandler(event, "بیمار")} autoComplete="off" />
                <p className={style.ErrorMessage}>{props.errorMessage.fullName}</p>
            </label>
            Input2 = <label>
                {nationalCode}
                <input type='text' onChange={props.inputPatientHandler} name='nationalCode' value={props.changedPatient?.nationalCode} onBlur={(event) => props.blurHandler(event, "بیمار")} autoComplete="off" />
                <p className={style.ErrorMessage}>{props.errorMessage.nationalCode}</p>
            </label>
            Input3 = <label>
                {numberOfChildren}
                <input type='number' onChange={props.inputPatientHandler} name='numberOfChildren' value={props.changedPatient?.numberOfChildren} onBlur={(event) => props.blurHandler(event, "بیمار")} min={0} autoComplete="off" />
                <p className={style.ErrorMessage}>{props.errorMessage.numberOfChildren}</p>
            </label>
            Input4 = <label>
                {doctors}
                <p className={[style.ErrorMessage, (showList ? style.DoctorsListOpen : style.DoctorsListClose)].join(" ")}>{props.errorMessage.whichdoctor}</p>
                <div className={style.MultiSelectContainer}>
                    <input className={style.SearchInput} onChange={props.setSearchValueHandler} value={props.searchValue} />
                    <div className={style.clickToOpen} onClick={() => setShowList(true)}></div>
                    <div className={[style.Arrow, (showList && style.ArrowDown)].join(" ")} onClick={() => setShowList(!showList)} ><RiArrowDropDownLine /></div>
                    <div className={style.ShowSelected}>
                        <div>
                        
                            {props.changedPatient?.whichdoctor && props.changedPatient.whichdoctor.map(d => {
                                return sortedDoctors().map(s => {
                                    if (s._id === d) {
                                        return <span>{s.fullName + " , "}</span>
                                    }
                                })
                            })}
                        </div>
                    </div>
                    <div className={showList ? style.MultiSelectShow : style.MultiSelectHide}>

                        {searcher(sortedDoctors(), props.searchValue).map((d, i) => {
                            return <div key={i}>
                                <p
                                    className={(props.changedPatient?.whichdoctor?.find(f => f === d._id))
                                        || (props.changedPatient?.needTobeVisitBy?.find(f => f.doctor._id === d._id)) ? style.Selected : null}
                                    key={d._id}
                                    onClick={() => props.selectDoctorHandler(d.fullName, d._id)}>{d.fullName}</p>
                            </div>
                        })}

                    </div>
                </div>

            </label>
            break;
    }

    return (
        <Fragment>

            <div className={style.ModalContainer}>
                <div className={style.Backdrop} onClick={props.CloseModal}></div>
                <div className={style.Modal} >
                    <CgCloseR className={style.Cancel} onClick={props.CloseModal} />

                    <div className={style.ModalContent} >
                        <h3>{Title}</h3>
                        <form id='Modal' className={style.ModalForm} onSubmit={Submit} >
                            {Input1}
                            {Input2}
                            {Input3}
                            {Input4}
                            <button type='submit' form='Modal'>ثبت تغییرات</button>
                        </form>
                    </div>

                </div>
            </div>
        </Fragment>
    )
}

export default Modal;
