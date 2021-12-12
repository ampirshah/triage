import React, { Fragment } from 'react';
import style from './Modal.module.scss';
import { CgCloseR } from 'react-icons/cg';
const Modal = (props) => {
    return (
        <Fragment>
            <div className={style.Backdrop} onClick={props.CloseModal}></div>
            <div className={style.ModalContainer}>
                <div className={style.Modal}>
                    <CgCloseR className={style.Cancel} onClick={props.CloseModal} />
                    <div className={style.ModalContent}>
                        {props.children}
                    </div>
                </div>

            </div>
        </Fragment>
    )
}

export default Modal
