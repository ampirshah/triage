import React, { useState } from 'react';
import { Link , useParams} from 'react-router-dom';
import Doctors from '../../components/Doctors/Doctors';
import Patients from '../../components/Patients/Patients';

import style from './Triage.module.scss';

const Triage = () => {
    const [isShown, setIsShown] = useState({
        doctors:false,
        patients:false,
    })

    const [values, setValues] = useState({
        DoctorName: '',
        PhoneNumber: '',
        PatientName: '',
    })
    
    return (
        <div className={style.Container}>
            <div className={style.Toolbar}>
                <div>
                    <h1>نام سایت</h1>
                </div>
                <div className={style.User}>
                    <p>یه چیزی</p>
                </div>

            </div>
            <div className={style.Dashboard}>
                <div className={style.SideBar}>
                    <div>
                        <ul className={style.Menu}>
                            <li><button onClick={()=>setIsShown({doctors:true,patients:false})}>لیست پزشک ها</button></li>
                            <li><button onClick={()=>setIsShown({doctors:false,patients:true})}>لیست بیماران</button></li>

                        </ul>
                    </div>
                </div>
                <div className={style.Content}>
                    {isShown.doctors ? <Doctors/> : null}
                    {isShown.patients ? <Patients/> : null}
                </div>
            </div>
        </div>
    )

}

export default Triage;
