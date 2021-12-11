import React from 'react';
import style from './PatientsList.module.scss';

const PatientsList = () => {
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

export default PatientsList