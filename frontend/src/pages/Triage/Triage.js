import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import DoctorsList from '../../components/DoctorsList/DoctorsList';
import PatientsList from '../../components/PatientsList/PatientsList';
import {RiHealthBookLine} from 'react-icons/ri';
import {MdOutlineSick} from 'react-icons/md';
import style from './Triage.module.scss';
import Container from '../../hoc/Container/Container';
import { toPersianNumber } from '../../helpers/action';
import { FiEdit } from 'react-icons/fi';
import Modal from '../../components/Modal/Modal';

const Triage = () => {
    const [isShown, setIsShown] = useState({
        doctors: false,
        patients: false,
    })

    const initialDoctor = {
        id:'',
        name:'',
        phoneNumber:'',
        specialty:''
    };
    
    const initialPatient={
        name:'',
        nationalCode:'',
        turn:0,
        problem:'',
        doctor:'',
        status:'',
        isActive:true
    };

    const [doctors, setDoctors] = useState([initialDoctor])

    const [patients,setPatients]=useState([initialPatient])

    // useEffect(() => {
    //     axios.get('https://jsonplaceholder.typicode.com/posts')
    //         .then(response => {
    //             const doctorsList = response.data.slice(0, 5);
        
    //             setDoctors(doctorsList)
    //         })
    //         .catch(error => console.log("Error", error))
    // }, [])



    console.log("doctors", doctors)
    console.log('patients', patients);
    
    const [modalShow, setModalShow] = useState({
        index: 0,
        show: false,
        operation:'edit'
    });

    
    const openEditModal = (index) => {
      
        console.log("modal", index);
        setModalShow({ ...modalShow, index: index, show: true ,operation:'edit'});
        setChangedDoctor({...doctors[index]});
        setChangedPatient({...patients[index]});
      
    }
    const openAddModal=(index)=>{
        setModalShow({ ...modalShow, index: index, show: true,operation:'add' });
        setChangedDoctor(initialDoctor);
        setChangedPatient(initialPatient);
    }
    
    

    const [changedDoctor, setChangedDoctor] = useState(initialDoctor)
    const [changedPatient,setChangedPatient] =useState(initialPatient)

    console.log("changedDoctor", changedDoctor);
    
    const inputDoctorHandler = (event,index) => {
            console.log("[event.target.name]",event.target.name);
            setChangedDoctor({
                ...changedDoctor,
                [event.target.name]:event.target.value,
            });
           
            console.log("changedDoctor", changedDoctor);

    }

   
    const inputPatientHandler=(event,index)=>{
        // if(event.target.name==='doctor'){      
        //     setChangedPatient({
        //         ...changedDoctor,
        //         doctors:[...doctors,event.target.value]
        //     });
        // }
        // else{
            setChangedPatient({
                ...changedPatient,
                [event.target.name]:event.target.value,
            });
        //}
        console.log("changedPatient", changedPatient);
            
        //    let temp={...changedPatient};
        // if(event.target.name==='name'){
        //     temp.name=event.target.value;
        // }
        // if(event.target.name==='problem'){
        //     temp.problem=event.target.value;
        // }
        //     setChangedPatient(temp); y
    }
    
    const submitDoctorHandler = (event, index) => {
        event.preventDefault();

            let temp = [...doctors];
            temp[index]= changedDoctor
            setDoctors(temp);
            
        
        console.log("doctors Changed :", doctors);
        setModalShow({ ...modalShow, show: false })
        const data = doctors
        
        console.log("data:", data);
        axios.post('https://jsonplaceholder.typicode.com/posts', data)
            .then(response => {
                console.log("Response", response.data)
                //setModalShow({ ...modalShow, show: false })
            })
            .catch(error => console.log("Erorr", error))

    }
    
    const submitPatientHandler =(event,index)=>{
        event.preventDefault();

            let temp = [...patients];
            temp[index]= changedPatient;
            setPatients(temp);
            
        console.log("patients Changed :", patients);
        setModalShow({ ...modalShow, show: false })

        const data = patients
        
        console.log("data:", data);
        axios.post('https://jsonplaceholder.typicode.com/posts', data)
            .then(response => {
                console.log("Response", response.data)
                //setModalShow({ ...modalShow, show: false })
            })
            .catch(error => console.log("Erorr", error))
    }
    console.log("index", modalShow.index)
    
    


    let MenuButtons=<div>
        <li><button onClick={() => setIsShown({ doctors: true, patients: false })}><div><RiHealthBookLine/></div>لیست پزشکان </button></li>
                <li><button onClick={() => setIsShown({ doctors: false, patients: true })}><div><MdOutlineSick/></div>لیست بیماران</button></li>
    </div>
    let NavLink=<Link to='/Doctor'>پزشک هستید؟</Link>
    return (
        <Container MenuButtons={MenuButtons} Link={NavLink} Title='تریاژ'>

           {modalShow.show ? <Modal
                                isShown={isShown}
                                modalShow={modalShow}
                                doctors={doctors}
                                changedDoctor={changedDoctor}
                                changedPatient={changedPatient}
                                CloseModal={() => setModalShow({ ...modalShow, show: false })}
                                submitDoctorHandler={(event) => submitDoctorHandler(event, modalShow.index)}
                                submitPatientHandler={(event)=>submitPatientHandler(event,modalShow.index)}
                                inputDoctorHandler={(event) => inputDoctorHandler(event,modalShow.index)}
                                inputPatientHandler={(event) => inputPatientHandler(event,modalShow.index)}
                                //patientsDoctorChangeHandler={(event)=>patientsDoctorChangeHandler(event,modalShow.index)}
                                />
            : null}

            {isShown.doctors ? <DoctorsList doctors={doctors} openEditModal={openEditModal}  openAddModal={openAddModal} />: null}
            {isShown.patients ? <PatientsList patients={patients} openEditModal={openEditModal}  openAddModal={openAddModal}/> : null}
        </Container>
        
    )

}

export default Triage;

//1
// const [doctors, setDoctors] = useState({
    //     id: 0,
    //     name: '',
    //     specialty: '',
    //     phoneNumber: ''
    // })

    
    // const data={
    //     name: 'فلان فلانی 1',
    // }


    // const [doctors, setDoctors] = useState([{
    //     id: 1,
    //     name: 'فلان فلانی 1',
    //     specialty: 'عمومی',
    //     phoneNumber: '09111111111'
    // },
    // {
    //     id: 2,
    //     name: 'فلان فلانی 2',
    //     specialty: 'مغز و اعصاب',
    //     phoneNumber: '09222222222'
    // },
    // {
    //     id: 3,
    //     name: 'فلان فلانی 3',
    //     specialty: 'دندانپزشک',
    //     phoneNumber: '09333333333'
    // },
    // {
    //     id: 4,
    //     name: 'فلان فلانی 4',
    //     specialty: 'قلب',
    //     phoneNumber: '0944444444'
    // },
    // {
    //     id: 5,
    //     name: 'فلان فلانی 5',
    //     specialty: 'ریه',
    //     phoneNumber: '0955555555'
    // }
    // ])
//2
 //doctor.map((d, index) => {

                // let temp = {...doctors};
                // temp[index].userId = doctor[index].userId;
                // temp[index].id = doctor[index].id;
                // temp[index].title=doctor[index].title;
                // temp[index].body=doctor[index].body;

                
                //})
                // let temp={...doctors};
                // temp.userid=doctor[0].userid;
                // temp.id=doctor[0].id;
                // setDoctors(temp)
                // setDoctors({
                //     ...doctors,
                //     userid:doctor[0].userId
                // })

                // console.log("Response", doctor[0])
                // console.log("Response", doctor[1])
                // setDoctors({...doctors,userId:doctor[0].userId});
                // console.log("state",doctors);

//3
                    // const removeData = (id) => {

    //     axios.delete('https://jsonplaceholder.typicode.com/posts/${id}').then(res => {
    //         const del = doctors.filter(doctors => id !== doctors.id)
    //         setDoctors(del)
    //         console.log('res', res)
    //     })
    // }


//4
    // const stateChangedHandler =(value,id)=>{
    //     let temp=[...doctors];
    //     temp[id].title=value;
    //     setDoctors(temp);
    //     console.log('doctors',doctors);

    // }

//5 INPUT CHANGED HANDLER
 // let temp={...changedDoctor};
        // if(event.target.name==='name'){
        //     temp[index].id=event.target.value;
        // }
        // if(event.target.name==='specialty'){
        //     temp[index].title=event.target.value;
        // }
        // setChangedDoctor(temp);