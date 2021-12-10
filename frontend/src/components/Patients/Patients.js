import React from 'react';
import style from './Patients.module.scss';

const Patients = () => {
    return (
        <div className={style.Patients}>
            <table className={style.List}>
               <tbody>
                   <tr>لیست بیمار ها</tr>
               </tbody>
            </table>
            
        </div>
    )
}

export default Patients