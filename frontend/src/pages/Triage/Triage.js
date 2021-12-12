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


    const initialState = [{
        userId: '',
        id: '',
        title: '',
        body: ''
    }];

    const [doctors, setDoctors] = useState(initialState)

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const doctorsList = response.data.slice(0, 5);
        
                setDoctors(doctorsList)
            })
            .catch(error => console.log("Error", error))
    }, [])



    console.log("doctors", doctors)

    const [modalShow, setModalShow] = useState({
        index: 0,
        show: false,
        operation:'edit'
    });

    
    const openEditModal = (index) => {
        console.log("modal", index);
        setModalShow({ ...modalShow, index: index, show: true ,operation:'edit'});
        setChangedDoctor('');
    }
    const openAddModal=(index)=>{
        setModalShow({ ...modalShow, index: index, show: true,operation:'Add' });
        setChangedDoctor('');
    }
    
    console.log('doctors', doctors);

    const [changedDoctor, setChangedDoctor] = useState(initialState)

    const inputChangedHandler = (event) => {

        setChangedDoctor({
            ...changedDoctor,
            [event.target.name]: event.target.value
        });
       
        console.log("changed", changedDoctor);
    }

    const submitChangesHandler = (event, index) => {
        event.preventDefault();
        if(index<doctors.length){
            let temp = [...doctors];
            temp[index].id = changedDoctor.id;
            temp[index].title = changedDoctor.title;
            setDoctors(temp);
        }else if(index==doctors.length){
            let temp = [...doctors];
            temp.push (changedDoctor)
            setDoctors(temp);
        }
        console.log("after Changed :", doctors);

         const data = doctors
        // {
        //     userId: doctors.userId,
        //     id: doctors.id,
        //     title: doctors.title,
        //     body: doctors.body
        // }

        console.log("data:", data);
        axios.post('https://jsonplaceholder.typicode.com/posts', data)
            .then(response => {
                console.log("Response", response.data)
                setModalShow({ ...modalShow, show: false })
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

           {modalShow.show ? <Modal Title={modalShow.operation==='edit'?'ویرایش اطلاعات پزشک':'افزودن پزشک جدید'} doctors={doctors} CloseModal={() => setModalShow({ ...modalShow, show: false })}>

            <form className={style.TriageModal} onSubmit={(event) => submitChangesHandler(event, modalShow.index)}>
                <label>
                    {modalShow.operation==='edit' ? 'ویرایش نام پزشک:' :'نام پزشک جدید:'}
                    <input type='text' onChange={(event) => inputChangedHandler(event)} name='id' placeholder={modalShow.index<doctors.length ?  doctors[modalShow.index].id :''} autoComplete="off"/>
                </label>
                <label>
                {modalShow.operation==='edit' ? 'ویرایش تخصص:' :'تخصص:'}
                    <input type='text' onChange={(event) => inputChangedHandler(event)} name='title' placeholder={modalShow.index<doctors.length ?  doctors[modalShow.index].title :''} autoComplete="off"/>
                </label>
                <button type='submit'>ثبت تغییرات</button>
            </form>
            </Modal> : null}

            {isShown.doctors ? <DoctorsList doctors={doctors} openEditModal={openEditModal}  openAddModal={openAddModal} />: null}
            {isShown.patients ? <PatientsList /> : null}
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