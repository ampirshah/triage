import React, { useEffect, useState } from 'react';

import style from './Container.module.scss';

import { IoIosArrowBack } from 'react-icons/io'
import { RiHospitalLine } from 'react-icons/ri';
import { IoClose } from 'react-icons/io5';

const Container = (props) => {
    const [showSideBar, setShowSideBar] = useState(true);
    const [showPopUpMessage,setShowPopUpMessage]=useState(false);
    useEffect(() => {
        if(props.popUpMessage===undefined || props.popUpMessage!==''){
            setShowPopUpMessage(true);
            const timer= setTimeout(() => {
                setShowPopUpMessage(false);
              }, 3500);
              setTimeout(()=>props.clearMessage(),4000);
              return () =>clearTimeout(timer);
                
        }else setShowPopUpMessage(false);

    }, [props.popUpMessage])
    
    console.log("popUpMessage",props.popUpMessage)

    return (
        <div className={style.Container} onClick={()=>setShowPopUpMessage(false)}>
            <div className={style.Toolbar}>
                <div>
                    <h1><RiHospitalLine /> نام سایت</h1>
                </div>

                <div className={style.User} >
                    {props.Title}
                    {props.Link}
                </div>

            </div>
            <div className={style.Dashboard}>
                <div className={style.SideBarContainer}>
                    <div className={showSideBar ?style.SideBar:style.HideSideBar}>
                        <div>
                            <ul className={style.Menu}>
                                {props.MenuButtons}
                            </ul>
                        </div>
                    </div>
                    <button
                        className={showSideBar ? style.ShowButton : style.HideButton}
                        onClick={() => setShowSideBar(!showSideBar)}>
                        <IoIosArrowBack className={style.Arrow} />
                    </button>
                </div>

                <div className={style.Content}>
                    
                    <div className={[(showPopUpMessage ? style.ShowMessage : style.HideMessage),style.Message].join(' ')}>
                        <p>{props.popUpMessage}<span onClick={()=>setShowPopUpMessage(false)}><IoClose/></span></p>
                        
                        </div>
              
                    {props.children}
                </div>
            </div>
        </div>
    )

}

export default Container;
