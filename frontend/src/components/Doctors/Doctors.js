import React, { useState } from 'react';
import style from './Doctors.module.scss';

const Doctors = () => {
    const [doctors, setDoctors] = useState([{
        id:1,
        name: 'فلان فلانی 1',
        specialty: 'عمومی',
        phoneNumber: '09111111111'
    },
    {
        id:2,
        name: 'فلان فلانی 2',
        specialty: 'مغز و اعصاب',
        phoneNumber: '09222222222'
    },
    {
        id:3,
        name: 'فلان فلانی 3',
        specialty: 'دندانپزشک',
        phoneNumber: '09333333333'
    },
    {
        id:4,
        name: 'فلان فلانی 4',
        specialty: 'قلب',
        phoneNumber: '0944444444'
    },
    {
        id:5,
        name: 'فلان فلانی 5',
        specialty: 'ریه',
        phoneNumber: '0955555555'
    }
    ])
    console.log("doctors", doctors);
    const TableHandler=()=>{

        return doctors.map((doctor,index)=>{
            const {id,name,specialty}=doctor;
            return <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{specialty}</td>
            </tr>
        })
    }
    const TableHeaderHandler=()=> {
        let header = ["شناسه","نام پزشک","تخصص"]
        return header.map((key, index) => {
           return <th key={index}>{key}</th>
        })
     }
    return (
        <div className={style.Doctors}>
            <h2> لیست پزشکان </h2>
            <table id='Doctors'>
               <tbody>
               <tr>{TableHeaderHandler()}</tr>
                  {TableHandler()}
               </tbody>
            </table>

        </div>
    )
}

export default Doctors
