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

import Modal from '../../components/Modal/Modal';

const Triage = () => {
    const [isShown, setIsShown] = useState('doctors')
    const testDoctors=[{
        id:1,
        name:'ستایش ابویی',
        phoneNumber:'09908833012',
        specialty:'پوست و مو',
    },
    {
        id:2,
        name:'احمد شمس فرد',
        phoneNumber:'09198038155',
        specialty:'مغز و اعصاب',
    },
    {
        id:3,
        name:'محمد محمدی',
        phoneNumber:'09111111111',
        specialty:'دندانپزشک',
    },
    {
        id:4,
        name:'رضا رضایی',
        phoneNumber:'09222222222',
        specialty:'ریه',
    },
    {
        id:5,
        name:'الهام الهامی',
        phoneNumber:'09333333333',
        specialty:'روانپزشک',
    },
    {
        id:6,
        name:'مریم مریمی',
        phoneNumber:'09444444444',
        specialty:'قلب',
    },
    {
        id:7,
        name:'فلان فلانی',
        phoneNumber:'09555555555',
        specialty:'یه چیزی',
    },
    {
        id:8,
        name:'اصغر اصغری',
        phoneNumber:'09666666666',
        specialty:'ارتوپد',
    },
    {
        id:9,
        name:'مینا مینایی',
        phoneNumber:'09777777777',
        specialty:'کبد',
    },
    {
        id:10,
        name:'احسان احسانی',
        phoneNumber:'09888888888',
        specialty:'گوش،حلق و بینی',
    }
]

    const initialDoctor = {
        id:'',
        name:'',
        phoneNumber:'',
        specialty:'',
    };
    
    const initialPatient={
        name:'',
        nationalCode:'',
        turn:0,
        doctor:[],
        status:'',
        isActive:true
    };
    
    const [doctors, setDoctors] = useState(testDoctors)

    const [patients,setPatients]=useState([])

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

    
    const openEditModal = (pationt,index) => {
      
        console.log("modal", index);
        setModalShow({ ...modalShow, index: index, show: true ,operation:'edit'});
        setChangedDoctor({...doctors[index]});
        setChangedPatient({...pationt});
      
    }
    const openAddModal=(index)=>{
        setModalShow({ ...modalShow, index: index, show: true,operation:'add' });
        setChangedDoctor(initialDoctor);
        setChangedPatient(initialPatient);
    }
    
    

    const [changedDoctor, setChangedDoctor] = useState()
    const [changedPatient,setChangedPatient] =useState()

    console.log("changedPatient", changedPatient);
    
    const inputDoctorHandler = (event,index) => {
            console.log("[event.target.name]",event.target.name);
            setChangedDoctor({
                ...changedDoctor,
                [event.target.name]:event.target.value,
            });
           
            console.log("changedDoctor", changedDoctor);

    }

   
    const inputPatientHandler=(event,index)=>{
        
        setChangedPatient({
            ...changedPatient,
            [event.target.name]:event.target.value,
        });
        
        console.log("changedPatient", changedPatient);       
    }

 
    const selectDoctorHandler=(doctorName)=>{
        /* checking if the doctor is not chosen or if it has been deSelected*/

        //if(changedPatient.doctor.includes(doctorName)===false)
        
        let index=changedPatient.doctor.findIndex(d=>(d.name===doctorName));
        if(!changedPatient.doctor.find(d=>(d.name===doctorName))){

            let temp={...changedPatient};
            temp.doctor.push({name:doctorName , selected:true})
            setChangedPatient(temp);
            console.log("set value for the first time");
            
        }else if(changedPatient.doctor[index]){
            let temp={...changedPatient};
            temp.doctor[index].selected=!temp.doctor[index].selected;
            setChangedPatient(temp)
            console.log("toggle value");
        }    
    }
    
    const editSelectDoctorHandler=(doctorName)=>{
        let index=changedPatient.doctor.findIndex(d=>(d.name===doctorName));
        console.log("changedPatient.doctor",changedPatient.doctor);
        //console.log("changedPatient.doctor[index]",changedPatient.doctor.find(d=>d.name===doctorName));
        if(!changedPatient.doctor.find(d=>d.name===doctorName)){
            let temp=[...changedPatient.doctor];
            temp.push({name:doctorName , selected:true})
            setChangedPatient({doctor: temp});
            console.log("working2",changedPatient.doctor);
        }
        else if(changedPatient.doctor.find(d=>d.name===doctorName)){
            let temp=[...changedPatient.doctor];
            temp[index].selected=!temp[index].selected;
            setChangedPatient({doctor: temp});
            console.log("working");
        } 
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
        console.log("CHECK",changedPatient.doctor.filter(t => (t.selected === true)));
        
            let temp = [...patients];
            temp[index]= changedPatient;
            temp[index].doctor=changedPatient.doctor.filter(t => (t.selected === true))
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
    
    ///Sort ?
    const doctorsList = [];

    for (let i in doctors) {
        doctorsList.push(doctors[i].name)
    }

    // const collator = new Intl.Collator('fa');
    // const sortedList=doctorsList.sort(collator.compare);
    // console.log("sortedList", sortedList);

    ///

    
    
    const toDoctorsTable=()=>{
        setIsShown('doctors');
        setModalShow({...modalShow,show:false})
    }
    const toPatientsTable=()=>{
        setIsShown('patients');
        setModalShow({...modalShow,show:false})
    }
    
    let MenuButtons=<div>
        <li><button onClick={() => toDoctorsTable()}><div><RiHealthBookLine/></div>لیست پزشکان </button></li>
        <li><button onClick={() => toPatientsTable()}><div><MdOutlineSick/></div>لیست بیماران</button></li>
    </div>


    let NavLink=<Link to='/Doctor'>پزشک هستید؟</Link>
    return (
        <Container MenuButtons={MenuButtons} Link={NavLink} Title='تریاژ'>

           {modalShow.show ? <Modal
                                isShown={isShown}
                                modalShow={modalShow}
                                doctors={doctors}
                                patients={patients}
                                changedDoctor={changedDoctor}
                                changedPatient={changedPatient}
                                CloseModal={() => setModalShow({ ...modalShow, show: false })}
                                submitDoctorHandler={(event) => submitDoctorHandler(event, modalShow.index)}
                                submitPatientHandler={(event)=>submitPatientHandler(event,modalShow.index)}
                                inputDoctorHandler={(event) => inputDoctorHandler(event,modalShow.index)}
                                inputPatientHandler={(event) => inputPatientHandler(event,modalShow.index)}
                                selectDoctorHandler={selectDoctorHandler}
                                editSelectDoctorHandler={editSelectDoctorHandler}
                                doctorsList={doctorsList}
                                />
            : null}

            {isShown==='doctors' ? <DoctorsList doctors={doctors} openEditModal={openEditModal}  openAddModal={openAddModal} />: null}
            {isShown==='patients'? <PatientsList doctors={doctors} patients={patients} modalShow={modalShow} openEditModal={openEditModal}  openAddModal={openAddModal}/> : null}
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

//6
// const addCheckBoxChangedHandler=(event)=>{
//     if(event.target.checked===true && changedPatient.doctor.includes(event.target.name)===false){
//      //    let temp={...changedPatient};
//      //    temp.doctor.name.push(event.target.value);
//      //    setChangedPatient(temp);
//         let temp={...changedPatient};
//         temp.doctor.push(event.target.value);
//         setChangedPatient(temp);
//     }
//  console.log("changedPatient.doctor",changedPatient.doctor);
//  }
//  const editCheckBoxChangedHandler=(event)=>{
//      if(event.target.checked===true){
//         let temp={...changedPatient};
//         temp.doctor.push(event.target.value);
//         setChangedPatient(temp);
//      }
//  }