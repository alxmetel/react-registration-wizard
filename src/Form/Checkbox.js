import React from 'react';
import styleIndex from '../index.less';

const Checkbox = props => {

  let formControl = '';

  if (props.touched && !props.valid) {
    formControl = 'error';
  }

  return (
    <label for={props.name} >
      <input
        type="checkbox"
        className={styleIndex[formControl]}
        name={props.name}
        id={props.name}
        checked={props.value ? true : false}
        onChange={props.onChange} />

        {props.labelText}
    </label>
  );
}

export default Checkbox;