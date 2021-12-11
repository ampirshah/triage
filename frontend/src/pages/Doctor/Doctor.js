import React, { useState } from 'react';
import style from './Doctor.module.scss'

const Doctor = () => {
    const [patients, setPatients] = useState([{
        id:1,
        name:'بیمار 1',
    }])
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

                        </ul>
                    </div>
                </div>
                <div className={style.Content}>
                    
                </div>
            </div>
        </div>
    )
}

export default Doctor
