import React, { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

import style from './Container.module.scss';
import {IoIosArrowBack} from 'react-icons/io'
import { RiHospitalLine } from 'react-icons/ri';

const Container = (props) => {
    const [showSideBar, setShowSideBar] = useState(true)

    return (
        <div className={style.Container}>
            <div className={style.Toolbar}>
                <div>
                    <h1><RiHospitalLine/> نام سایت</h1>
                </div>

                <div className={style.User}>
                    {props.Title}
                    {props.Link}
                </div>

            </div>
            <div className={style.Dashboard}>
                <div className={style.SideBarContainer}>
                    {showSideBar ? <div className={style.SideBar}>
                        <div>
                            <ul className={style.Menu}>
                                {props.MenuButtons}
                            </ul>
                        </div>
                    </div> : null}
                    <button className={showSideBar ? style.ShowButton : style.HideButton} onClick={() => setShowSideBar(!showSideBar)}><IoIosArrowBack className={style.Arrow}/></button>
                </div>

                <div className={style.Content}>
                    {props.children}
                </div>
            </div>
        </div>
    )

}

export default Container;
