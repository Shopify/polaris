// @flow

import React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import Label from '../Label';
import {noop} from '../../utilities/other';

import styles from './Checkbox.scss';

type Props = {
  label?: any,
  checked?: boolean,
  id?: string,
  disabled?: boolean,
  onClick?: (event: Object) => void,
};

export default function Checkbox({
  label,
  checked,
  disabled,
  onClick = noop,
  id = uniqueID(),
}: Props) {
  function handleClick(...args) {
    if (disabled) { return; }
    onClick(...args);
  }

  const className = classNames(
    styles.Checkbox,
    checked && styles.checked,
    disabled && styles.disabled,
  );

  return (
    <div className={className} onClick={handleClick} tabIndex={0}>
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

let index = 1;
function uniqueID() {
  return `Checkbox${index++}`;
}
