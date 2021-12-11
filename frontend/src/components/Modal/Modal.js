import React from 'react'
import style from './Modal.module.scss'

const Modal = (props) => {
    return (
        <div className={style.Modal}>
            <button className={style.Cancel} onClick={props.CloseModal}>X</button>
            {props.children}
        </div>
    )
}

export default Modal
