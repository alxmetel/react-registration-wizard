import React from 'react';
import style from '../index.less';
import MaskedInput, {conformToMask} from 'react-text-mask'

const TextInput = props => {

  // Insert Phone prefix "+380" (if input hasn't been filled out yet)
  const insertPhonePrefix = e => {

    const elem = e.target;
    const elemValue = e.target.value;

    const re = /^[^_]+$/; // doesn't contain "_" symbol
    const match = re.test(String(elemValue).toLowerCase());

    if (!match) {
      const phoneNumberPrefix = '+380'
      const phoneNumberMask = ['+', /[1-9]/, /\d/, /\d/, ' ', '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]
    
      const conformedPhoneNumber = conformToMask(
        phoneNumberPrefix,
        phoneNumberMask,
        {guide: true}
      )
      elem.value = conformedPhoneNumber.conformedValue;
      elem.selectionEnd = 6; // Move the coret
    }
  };

  // Handle Error messages
  let inputToDisplay = null;
  let formControl = '';
  let errorMessage = '';

  if (props.touched && !props.valid) {
    formControl = 'error';
    errorMessage = 'show';
  }

  const textInput = (
    <div className={`${style.inputWrapper} ${style.textInputWrapper}`}>
      <label for={props.name} className={props.focused ? style.floating : ''}>{props.placeholderText}</label>
      <input
        id={props.name}
        type={props.type}
        className={style[formControl]}
        value={props.value}
        {...props}
      />
      <div className={`${style.inputErrorMsg} ${style[errorMessage]}`}>{props.errMsg}</div>
    </div>
  );

  const telephoneInput = (
    <div className={`${style.inputWrapper} ${style.textInputWrapper}`}>
      <label for={props.name} className={props.focused ? style.floating : ''}>{props.placeholderText}</label>
      <MaskedInput
        mask={['+', /[1-9]/, /\d/, /\d/, ' ', '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
        guide={true}
        id={props.name}
        type={props.type}
        className={style[formControl]}
        value={props.value}
        {...props}
        onClick={e => {insertPhonePrefix(e)}}
      />
      <div className={`${style.inputErrorMsg} ${style[errorMessage]}`}>{props.errMsg}</div>
    </div>
  );

  if (props.type === 'tel') {
    inputToDisplay = telephoneInput;
  } else { // All other types
    inputToDisplay = textInput;
  }

  return (
    <>
      {inputToDisplay}
    </>
  )
}

export default TextInput;