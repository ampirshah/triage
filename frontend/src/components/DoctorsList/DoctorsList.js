import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import style from './DoctorsList.module.scss';
import Modal from '../Modal/Modal';
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
                <td>{userId}</td>
                <td>{id}</td>
                <td>{title}</td>
                {/* <td className={style.EditButton}>
                        <button onClick={() => removeData(id)}>حذف</button>
                    </td> */}
                {/* <td>
                        <input onChange={(event)=>stateChangedHandler(event.target.value,id)} />
                    </td> */}
                <td className={style.EditButton}>
                    {/* <button onClick={()=>editHandler(id)}>ویرایش</button> */}
                    <button onClick={() => openEditModal(index)}>ویرایش</button>
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
    }

    const TableHeaderHandler = () => {
        let header = ["شناسه", "نام پزشک", "تخصص", "ویرایش"]
        return header.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    }
    console.log('doctors', doctors);
    
    const [changedDoctor, setChangedDoctor] = useState(initialState)

    const inputChangedHandler = (event, index) => {
        let temp={...changedDoctor};
        if(event.target.name==='name'){
            temp[index].id=event.target.value;
        }
        if(event.target.name==='specialty'){
            temp[index].title=event.target.value;
        }
        setChangedDoctor(temp);
        console.log("changed",changedDoctor);
    }

    const submitChangesHandler = (event, index) => {
        event.preventDefault();
        setDoctors({...doctors,doctors:changedDoctor});
        const data = {
            userId: doctors[index].userId,
            id: doctors[index].id,
            title: doctors[index].title,
            body: doctors[index].body
        }

        console.log("data:", data);
        axios.post('https://jsonplaceholder.typicode.com/posts', data)
            .then(response => {
                console.log("Response", response)
                setModalShow({...modalShow,show:false})
            })
            .catch(error => console.log("Erorr", error))

    }
    console.log("index", modalShow.index)


    return (
        <Fragment>
            {modalShow.show ? <Modal doctors={doctors} CloseModal={() => setModalShow({...modalShow,show:false})}>

                <div>
                    <label>ویرایش نام پزشک:
                        <input type='text' onChange={(event) => inputChangedHandler(event,modalShow.index)} name='name' value={doctors[modalShow.index].id} />
                    </label>
                    <label>ویرایش تخصص:
                        <input type='text' onChange={(event) => inputChangedHandler(event,modalShow.index)} name='specialty' value={doctors[modalShow.index].title} />
                    </label>
                    <button type='submit' onClick={(event) => submitChangesHandler(event, modalShow.index)}>دکمه</button>
                </div>
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
