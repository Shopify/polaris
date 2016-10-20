// @flow

import React from 'react';

import Label from '../Label';

import {css} from '../../utilities/styles';
import {noop} from '../../utilities/other';

import styles from './Checkbox.scss';

type Props = {
  label?: any,
  checked?: boolean,
  id?: string,
  disabled?: boolean,
  onClick?: (event: Object) => void,
};

export default function Checkbox(props: Props) {
  const {label, checked, disabled, onClick = noop, id = uniqueID()} = props;

  function handleClick(...args) {
    if (disabled) { return; }
    onClick(...args);
  }

  return (
    <div className={classNameForCheckbox(props)} onClick={handleClick} tabIndex={0}>
      <div className={styles.Box}>
        <div className={styles.Checkmark} />
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          className={styles.Input}
        />
      </div>
      <div className={styles.Label}>
        <Label id={id}>{label}</Label>
      </div>
    </div>
  );
}

function classNameForCheckbox({checked, disabled}) {
  return css([
    styles.Checkbox,
    checked && styles.checked,
    disabled && styles.disabled,
  ]);
}

let index = 1;
function uniqueID() {
  return `Checkbox${index++}`;
}
