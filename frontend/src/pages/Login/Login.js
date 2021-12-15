import React, { useState } from 'react'
import style from './Login.module.scss'
import Container from '../../hoc/Container/Container'
const Login = () => {
    const [values, setValues] = useState({
        phoneNumber:''
    })
    const inputChangeHandler=(event)=>{
        setValues({
            ...values,
            phoneNumber:event.target.value
        })
    }
    return (
        <div className={style.Login}>
            <div className={style.Toolbar}>
                <div><h1>نام سایت</h1></div>
                <div className={style.User}>
                    <a>کاربر</a>
                </div>
            </div>
            <div className={style.Content}>
                <div className={style.LoginBox}>
                    <h3>ورود</h3>
                    <form>
                        <label>شماره تماس
                            <input type='text' onChange={(event)=>inputChangeHandler(event)} placeholder='0 9 - - - - - - - - - '/>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
