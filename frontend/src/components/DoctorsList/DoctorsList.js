import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import style from './DoctorsList.module.scss';
import Modal from '../Modal/Modal';
import {FiEdit} from 'react-icons/fi';
import {toPersianNumber} from '../../helpers/action';

const Doctors = (props) => {
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
                //doctor.map((d, index) => {

                // let temp = {...doctors};
                // temp[index].userId = doctor[index].userId;
                // temp[index].id = doctor[index].id;
                // temp[index].title=doctor[index].title;
                // temp[index].body=doctor[index].body;

                setDoctors(doctorsList)
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
            })
            .catch(error => console.log("Error", error))
    }, [])


    // const removeData = (id) => {

    //     axios.delete('https://jsonplaceholder.typicode.com/posts/${id}').then(res => {
    //         const del = doctors.filter(doctors => id !== doctors.id)
    //         setDoctors(del)
    //         console.log('res', res)
    //     })
    // }

    console.log("state", doctors)
    const TableHandler = () => {

        return doctors.map((doctor, index) => {
            const { userId, id, title } = doctor;
            return <tr key={index}>
                <td>{toPersianNumber(userId)}</td>
                <td>{toPersianNumber(id)}</td>
                <td>{title}</td>
                {/* <td className={style.EditButton}>
                        <button onClick={() => removeData(id)}>حذف</button>
                    </td> */}

                <td className={style.EditButton}>
                    <button onClick={() => openEditModal(index)}><FiEdit/></button>
                </td>
            </tr>
        })
    }
    // const stateChangedHandler =(value,id)=>{
    //     let temp=[...doctors];
    //     temp[id].title=value;
    //     setDoctors(temp);
    //     console.log('doctors',doctors);

    // }
    const editHandler = (index) => {

    }
    console.log("doctors", doctors)

    const [modalShow, setModalShow] = useState({
        index: 0,
        show: false
    });

    let modal = ''
    const openEditModal = (index) => {
        console.log("modal", index);
        setModalShow({ ...modalShow, index: index, show: true });
        setChangedDoctor('');
    }

    const TableHeaderHandler = () => {
        let header = ["شناسه", "نام پزشک", "تخصص", "ویرایش"]
        return header.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    }
    console.log('doctors', doctors);

    const [changedDoctor, setChangedDoctor] = useState(initialState)

    const inputChangedHandler = (event) => {

        setChangedDoctor({
            ...changedDoctor,
            [event.target.name]: event.target.value
        });
        // let temp={...changedDoctor};
        // if(event.target.name==='name'){
        //     temp[index].id=event.target.value;
        // }
        // if(event.target.name==='specialty'){
        //     temp[index].title=event.target.value;
        // }
        // setChangedDoctor(temp);
        console.log("changed", changedDoctor);
    }

    const submitChangesHandler = (event, index) => {
        event.preventDefault();
        let temp = [...doctors];
        temp[index].id = changedDoctor.id;
        temp[index].title = changedDoctor.title;
        setDoctors(temp);
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


    return (
        <Fragment>
            {modalShow.show ? <Modal doctors={doctors} CloseModal={() => setModalShow({ ...modalShow, show: false })}>

                <form className={style.TriageModal} onSubmit={(event) => submitChangesHandler(event, modalShow.index)}>
                    <label>ویرایش نام پزشک:
                        <input type='text' onChange={(event) => inputChangedHandler(event)} name='id' placeholder={doctors[modalShow.index].id} />
                    </label>
                    <label>ویرایش تخصص:
                        <input type='text' onChange={(event) => inputChangedHandler(event)} name='title' placeholder={doctors[modalShow.index].title} />
                    </label>
                    <button type='submit'>ثبت تغییرات</button>
                </form>

            </Modal> : null}
            <div className={style.Doctors}>

                <h2> لیست پزشکان </h2>
                <table id='Doctors'>
                    <tbody>
                        <tr>{TableHeaderHandler()}</tr>
                        {TableHandler()}
                    </tbody>
                </table>

            </div>
        </Fragment>
    )
}

export default Doctors
