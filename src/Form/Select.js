import React from 'react';
import style from '../index.less';

const Select = props => {

  let formControl = '';
  let errorMessage = '';

  if (props.touched && !props.valid) {
    formControl = 'error';
    errorMessage = 'show';
  }

  return (
    <div className={style.inputWrapper}>
      <div className={style.selectWrapper}>
        <select
          className={`${style[props.selectClass]} ${style[formControl]}`}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled}
          {...props}
        >
          <option value="0" disabled selected>{props.placeholder}</option>
          {props.options.map(option => (
            <option value={option.value}>{option.name}</option>
          ))}
        </select>
        <i class="fa fa-angle-down"></i>
      </div>
      <div className={`${style.inputErrorMsg} ${style[errorMessage]}`}>{props.errMsg}</div>
    </div>
  );
}

export default Select;