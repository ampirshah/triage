import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';
import style from './Login.module.scss'
import { RiHospitalLine } from 'react-icons/ri'

import { Link } from 'react-router-dom'
import { toEnglishNumber, toPersianNumber } from '../../helpers/action'

import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'


const Login = () => {

    const [showPassword, setshowPassword] = useState(false);
    const [info, setInfo] = useState({
        phoneNumber: { value: '', error: '' },
        password: { value: '', error: '' }
    })
    const togglePasswordHandler = (event) => {
        event.preventDefault();
        setshowPassword(!showPassword);

    }
    const inputChangeHandler = (event) => {
        setInfo({
            ...info,
            [event.target.name]: { value: event.target.value, error: '' }
        })
    }

    const blurHandler = (event) => {
        let { name, value } = event.target;
        let phoneNumberError = '';
        let passwordError = '';
        let regex = new RegExp('^[0][9][0-9]{9}$');
        switch (name) {
            case 'phoneNumber':

                if (!regex.test(toEnglishNumber(info.phoneNumber.value))) {
                    phoneNumberError = "شماره تماس وارد شده صحیح نمی باشد.";
                }
                if (!value) {
                    phoneNumberError = "شماره تماس نمی تواند خالی باشد.";
                }
                setInfo({
                    ...info,
                    phoneNumber: { value: value, error: phoneNumberError },

                });
                break;
            case 'password':
                if (!value) {
                    passwordError = "رمز عبور نمی تواند خالی باشد.";
                }
                setInfo({
                    ...info,

                    password: { value: value, error: passwordError }
                });
                break;

        }


    }
    const validationHandler = () => {
        let phoneNumberError = '';
        let passwordError = '';
        let regex = new RegExp('^[0][9][0-9]{9}$');

        if (!regex.test(toEnglishNumber(info.phoneNumber.value))) {
            phoneNumberError = "شماره تماس وارد شده صحیح نمی باشد.";
        }
        if (info.phoneNumber.value === '') {
            phoneNumberError = "شماره تماس نمی تواند خالی باشد.";

        }
        if (info.password.value === '') {
            passwordError = "رمز عبور نمی تواند خالی باشد.";

        }

        if (phoneNumberError || passwordError) {
            setInfo({
                ...info,
                phoneNumber: { error: phoneNumberError },
                password: { error: passwordError }
            })
            return false;
        } else return true;

    }
    const submitHandler = async event => {
        event.preventDefault();
        const isValid = validationHandler();

        switch (isValid) {
            case true:
                const data={
                    phoneNumber:info.phoneNumber.value,
                    password:info.password.value
                }
                axios.post('http://localhost:4500/doctor/login',data)
                .then(response=>{
                    console.log("response",response);
                    alert(" خوش آمدید ");
                    Cookies.set("token",response.data.token, { expires: 30 })
                    
                })
                .catch(error=>{
                    console.log("error",error);
                    //console.log("errorMessage", error.response.data)
                })
                
                break;
            case false:
                alert("اطلاعات وارد شده صحیح نمی باشد")
                break;
        }

    }

    console.log("info", info);
    return (
        <div className={style.Login}>
            <div className={style.Toolbar}>
                <div className={style.Title}><RiHospitalLine /><h1> نام سایت</h1> </div>
                <div className={style.Link}>
                    <Link to='/Triage'>تریاژ</Link>
                </div>
            </div>
            <div className={style.Content}>
                <div className={style.LoginBox}>
                    <h3>ورود</h3>
                    <form onSubmit={(event) => submitHandler(event)}>
                        <label>شماره تماس:
                            <input
                                type='text'
                                name='phoneNumber'
                                onChange={(event) => inputChangeHandler(event)}
                                value={toPersianNumber(info.phoneNumber.value)}
                                onBlur={(event) => blurHandler(event)}
                                placeholder='۰ ۹ - - - - - - - - - '
                                autoComplete='off'
                            />
                            <p>{info.phoneNumber.error}</p>
                        </label>

                        <label>رمز عبور:
                            {console.log("showPassword", showPassword)}
                            <div>

                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    onChange={(event) => inputChangeHandler(event)}
                                    value={info.password.value}
                                    placeholder='رمز عبور'
                                    onBlur={(event) => blurHandler(event)}
                                    autoComplete='off'
                                />
                                <button type='button' onClick={(event) => togglePasswordHandler(event)}>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
                            </div>
                            <p>{info.password.error}</p>
                        </label>

                        <button type='submit'>ورود</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Login
