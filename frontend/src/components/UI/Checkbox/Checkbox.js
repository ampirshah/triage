import React from 'react'
import style from './Checkbox.module.scss'
const Checkbox = (props) => {

    return (
        <label className={style.Checkbox}>
            <input type="checkbox" checked={props.value} onChange={props.onChange} />
            {props.label}
        </label>
    );


}

export default Checkbox
