import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

import style from './Triage.module.scss';
import { MdOutlineSick } from 'react-icons/md';
import { RiHealthBookLine } from 'react-icons/ri';

import DoctorsList from '../../components/DoctorsList/DoctorsList';
import PatientsList from '../../components/PatientsList/PatientsList';
import Container from '../../hoc/Container/Container';
import Modal from '../../components/Modal/Modal';
import { toEnglishNumber } from '../../helpers/action';

const Triage = () => {
    const [isShown, setIsShown] = useState('doctors');
    const [popUpMessage, setPopUpMessage] = useState('');

    const [doctors, setDoctors] = useState([])
    const [patients, setPatients] = useState([])

    const [changedDoctor, setChangedDoctor] = useState()
    const [changedPatient, setChangedPatient] = useState()

    useEffect(() => {
        axios.get("http://localhost:4500/doctor/list")
            .then(response => {
                console.log("Response :DoctorsTable", response.data.doctorlist);
                setDoctors(response.data.doctorlist)
            }).catch(error => console.log("Error :DoctorsTable", error.response.data));
    }, [changedDoctor])

    useEffect(() => {
        axios.get("http://localhost:4500/paitent/list")
            .then(response => {
                console.log("Response :PatientsTable", response.data.patientList.map(p => p.needTobeVisitBy));
                setPatients(response.data.patientList)
            }).catch(error => console.log("Error :PatientsTable", error.response.data));
    }, [changedPatient])

    const [modalShow, setModalShow] = useState({
        index: 0,
        show: false,
        operation: 'edit'
    });


    const openEditModal = (person, index) => {
        //console.log("modal", person);
        setSearchValue('');
        setErrorMessage('');
        setModalShow({ ...modalShow, index: index, show: true, operation: 'edit' });
        setChangedDoctor({ ...person });
        setChangedPatient({ ...person });

    }
    const openAddModal = (index) => {
        setSearchValue('');
        setErrorMessage('');
        setModalShow({ ...modalShow, index: index, show: true, operation: 'add' });
        setChangedDoctor();
        setChangedPatient();
    }



    const inputDoctorHandler = (event) => {
        setChangedDoctor({
            ...changedDoctor,
            [event.target.name]: event.target.value,
        });
    }


    const inputPatientHandler = (event) => {
        setChangedPatient({
            ...changedPatient,
            [event.target.name]: event.target.value,
        });
    }


    const selectDoctorHandler = (doctorName, doctorId) => {

        if (!changedPatient || !changedPatient.whichdoctor) {
            setChangedPatient({
                ...changedPatient,
                whichdoctor: [doctorId],
                //needTobeVisitBy:[{doctor:{fullName:doctorName , selected:true}}]
            });
            //console.log("select-1", changedPatient)
        }
        else if (changedPatient.whichdoctor && !changedPatient.whichdoctor.some(d => d === doctorId)) {
            let temp = [...changedPatient.whichdoctor];
            //let temp2=[...changedPatient.needTobeVisitBy]
            temp.push(doctorId)
            //temp2.push({doctor:{fullName:doctorName , selected:true}})
            setChangedPatient({ ...changedPatient, whichdoctor: temp })
            //console.log("select-2", changedPatient);
        }
        else if (changedPatient.whichdoctor && changedPatient.whichdoctor.some(d => d === doctorId)) {
            let index = changedPatient.whichdoctor.findIndex(d => d === doctorId);
            let temp = [...changedPatient.whichdoctor];
            //let temp2=[...changedPatient.needTobeVisitBy];
            temp.splice(index, 1);
            //temp2.splice(index,1);
            setChangedPatient({ ...changedPatient, whichdoctor: temp })
            //console.log("select-3", index);
        }
        setSearchValue('');
    }


    const [errorMessage, setErrorMessage] = useState('')
    const blurHandler = (event,person) => {
        let phoneNumberError = '',specialtyError = '',fullNameError = '',nationalCodeError='';
        let regex = new RegExp('^[0][9][0-9]{9}$');
        let { name, value } = event.target;

        switch (name) {
            case 'fullName':
                if (value === '') {
                    fullNameError = `نام ${person} نمی تواند خالی باشد!`;
                }
                setErrorMessage({
                    ...errorMessage,
                    fullName: fullNameError
                })
                break;
            case 'specialty':
                if (value === '') {
                    specialtyError = "تخصص نمی تواند خالی باشد!"
                }
                setErrorMessage({
                    ...errorMessage,
                    specialty:specialtyError
                })
                break
            case 'phoneNumber':
                if (!regex.test(toEnglishNumber(value))) {
                    phoneNumberError = "شماره تماس وارد شده صحیح نمی باشد!";
                }
                if (value === '') {
                    phoneNumberError = "شماره تماس نمی تواند خالی باشد!";

                }
                setErrorMessage({
                    ...errorMessage,
                    phoneNumber: phoneNumberError
                })
                break;
            case 'nationalCode':
                if(value===''){
                    nationalCodeError='کد ملی نمی تواند خالی باشد!'
                    setErrorMessage({
                        ...errorMessage,
                        nationalCode: nationalCodeError
                    })
                }
        }
    }
    const doctorValidationHandler = () => {
        let phoneNumberError = '';
        let specialtyError = '';
        let fullNameError = '';
        let regex = new RegExp('^[0][9][0-9]{9}$');
        
        if (!changedDoctor) {
            phoneNumberError = "شماره تماس نمی تواند خالی باشد!";
            fullNameError = 'نام پزشک نمی تواند خالی باشد!';
            specialtyError = 'تخصص نمی تواند خالی باشد!';
        }
        else if(changedDoctor){
            if (changedDoctor.phoneNumber===undefined || changedDoctor.phoneNumber === '' ) {
                phoneNumberError = "شماره تماس نمی تواند خالی باشد!";
    
            }
            else if (!regex.test(toEnglishNumber(changedDoctor.phoneNumber))) {
                phoneNumberError = "شماره تماس وارد شده صحیح نمی باشد!";
            }
    
            if (changedDoctor.fullName===undefined || changedDoctor.fullName === '') {
                fullNameError = 'نام پزشک نمی تواند خالی باشد!'
            }
            if (changedDoctor.specialty===undefined || changedDoctor.specialty === '') {
                specialtyError = 'تخصص نمی تواند خالی باشد!'
            }
        }


        if (phoneNumberError || specialtyError || fullNameError) {
            setErrorMessage({ fullName: fullNameError, specialty: specialtyError, phoneNumber: phoneNumberError })
            return false;
        } else return true;

    }

    const submitDoctorHandler = (event) => {
        event.preventDefault();
        
        let isValid = doctorValidationHandler();
        //console.log("valid",isValid);
        if (isValid) {
            const data = {
                ...changedDoctor
            }

            axios.post('http://localhost:4500/doctor/add', data)
                .then(response => {
                    console.log("Response :SubmitDoctor", response.data)
                    setErrorMessage('');
                    setPopUpMessage(response.data.text);
                    setChangedDoctor();
                })
                .catch(error => {
                    console.log("Erorr :SubmitDoctor", error.response.data);
                    setPopUpMessage(error.response.data.err);
                })
                setModalShow({ ...modalShow, show: false })
        }

    }
    const submitChangedDoctorHandler = (event) => {
        event.preventDefault();
        let isValid = doctorValidationHandler();
        if (isValid) {
            
            const data = {
                id: changedDoctor._id,
                newName: changedDoctor.fullName,
                newPhoneNumber: changedDoctor.phoneNumber,
                newSpecialty: changedDoctor.specialty
            }

            console.log("data:", data);
            axios.post('http://localhost:4500/doctor/edit', data)
                .then(response => {
                    console.log("Response :SubmitChangedDoctor", response.data)
                    setPopUpMessage(response.data.text);
                    setChangedDoctor();
                    setErrorMessage('');
                })
                .catch(error => {
                    console.log("Erorr :SubmitChangedDoctor", error.response.data);
                    setPopUpMessage(error.response.data.err);
                })
                setModalShow({ ...modalShow, show: false }); 
        }
    }

    const patientValidationHandler=()=>{
        let fullNameError = '';
        let nationalCodeError = '';
        let whichDoctorError = '';
        
        if (!changedPatient) {
            fullNameError = " نام بیمار نمی تواند خالی باشد!";
            nationalCodeError ='کد ملی نمی تواند خالی باشد!'
            whichDoctorError = 'نام پزشک نمی تواند خالی باشد!'
        }
        if(changedPatient){
            if (changedPatient.fullName===undefined || changedPatient.fullName === '') {
                fullNameError = " نام بیمار نمی تواند خالی باشد!";
    
            }
    
            if ( changedPatient.nationalCode===undefined ||changedPatient.nationalCode === '') {
                nationalCodeError = 'کد ملی نمی تواند خالی باشد!'
            }
            if (changedPatient.whichdoctor===undefined || changedPatient.whichdoctor.length === 0 ) {
                whichDoctorError = 'نام پزشک نمی تواند خالی باشد!'
            }
    
        }

        if (fullNameError || nationalCodeError || whichDoctorError) {
            setErrorMessage({ fullName: fullNameError, nationalCode: nationalCodeError, whichdoctor: whichDoctorError })
            return false;
        } else return true;

    }
    const submitPatientHandler = (event) => {
        event.preventDefault();
        let isValid=patientValidationHandler();
        if(isValid){
            const data = {
                ...changedPatient,
            }
            axios.post('http://localhost:4500/paitent/add', data)
                .then(response => {
                    console.log("Response :SubmitPatient", response);
                    setModalShow({ ...modalShow, show: false });
                    setChangedPatient();
                    setPopUpMessage(response.data.text);
                }).catch(error => {
                    console.log("Error :SubmitPatient", error.response.data)
                    setPopUpMessage(error.response.data.err);
                })
        }
    }
   

    
    //////Sorted
    const sortedDoctorsList = () => {
        let DoctorsList = [];
        let SelectedDoctorsId = [];
        let AllDoctorsList = [];
        for (let i in doctors) {
            DoctorsList[i] = ([doctors[i]._id, doctors[i].fullName])
        }
        DoctorsList.sort((a, b) => a[1].localeCompare(b[1], 'fr'));
        for (let i in DoctorsList) {
            AllDoctorsList[i] = { _id: DoctorsList[i][0], fullName: DoctorsList[i][1] };
        }
        if (changedPatient && changedPatient?.whichdoctor) {
            SelectedDoctorsId.push(changedPatient.whichdoctor)
        }
        let SelectedDoctorsList = [];
        for (let i in AllDoctorsList) {
            changedPatient?.needTobeVisitBy?.map(w => {
                if (w.doctor._id === AllDoctorsList[i]._id) {
                    //console.log(AllDoctorsList[i].fullName);
                    SelectedDoctorsList.push(AllDoctorsList[i])
                }
            })
        }
        let FinalDoctors = SelectedDoctorsList.concat(AllDoctorsList.filter(f => !SelectedDoctorsList.includes(f)));

        return FinalDoctors;
    }

    //////////////////////
    const [searchValue, setSearchValue] = useState('');

    const toDoctorsTable = () => {
        setIsShown('doctors');
        setModalShow({ ...modalShow, show: false })
    }
    const toPatientsTable = () => {
        setIsShown('patients');
        setModalShow({ ...modalShow, show: false })
    }

   
    let MenuButtons = <div>
        <li><button onClick={() => toDoctorsTable()}><div><RiHealthBookLine /></div>لیست پزشکان </button></li>
        <li><button onClick={() => toPatientsTable()}><div><MdOutlineSick /></div>لیست بیماران</button></li>
    </div>

    let NavLink = <Link to='/Doctor'>پزشک هستید؟</Link>
    ///Checking :
    console.log("doctors", doctors)
    console.log('patients', patients);
    console.log("changedDoctor", changedDoctor);
    console.log("changedPatient", changedPatient);

    console.log("error", errorMessage);
    console.log("index", modalShow.index);

    return (
        <Container popUpMessage={popUpMessage} clearMessage={()=>setPopUpMessage('')} MenuButtons={MenuButtons} Link={NavLink} Title='تریاژ'>

            {modalShow.show ? <Modal
                isShown={isShown}
                modalShow={modalShow}
                doctors={doctors}
                patients={patients}
                changedDoctor={changedDoctor}
                changedPatient={changedPatient}
                CloseModal={() => setModalShow({ ...modalShow, show: false })}
                submitDoctorHandler={(event) => submitDoctorHandler(event)}
                submitChangedDoctorHandler={(event) => submitChangedDoctorHandler(event)}
                submitPatientHandler={(event) => submitPatientHandler(event)}
                inputDoctorHandler={(event) => inputDoctorHandler(event)}
                inputPatientHandler={(event) => inputPatientHandler(event)}
                selectDoctorHandler={selectDoctorHandler}
                sortedDoctorsList={sortedDoctorsList()}
                searchValue={searchValue}
                setSearchValueHandler={(event) => setSearchValue(event.target.value)}
                errorMessage={errorMessage}
                blurHandler={blurHandler}
            />
                : null}

            {isShown === 'doctors' ? <DoctorsList doctors={doctors} openEditModal={openEditModal} openAddModal={openAddModal} /> : null}
            {isShown === 'patients' ? <PatientsList doctors={doctors} patients={patients} modalShow={modalShow} openEditModal={openEditModal} openAddModal={openAddModal} /> : null}
        </Container>

    )

}

export default Triage;
