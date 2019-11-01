import React from 'react';
// import style from '../index.less';
import style from '../StepInformation/Individual/Individual.less';

const Radio = props => {

  let formControl = '';
  let errorMessage = '';

  if (props.touched && !props.valid) {
    formControl = 'error';
    errorMessage = 'show';
  }

  return (
    <div className={style[props.class]}>
      <div className={style.inputWrapper}>
        <div className={`${style.innerWrapper} ${style[formControl]}`}>
          {props.options.map(option => (
            <label for={option.id}>
              <input type="radio"
                name={props.name}
                value={option.value}
                id={option.id}
                checked={props.value === option.value ? true : false}
                onChange={props.onChange}/>
              {option.displayValue}
            </label>
          ))}
        </div>
        <div className={`${style.inputErrorMsg} ${style[errorMessage]}`}>{props.errMsg}</div>
      </div>
    </div>
  );
}

export default Radio;