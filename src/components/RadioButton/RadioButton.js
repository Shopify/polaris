// @flow

import React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import Label from '../Label';
import {noop} from '../../utilities/other';

import styles from './RadioButton.scss';

type Props = {
  label?: any,
  checked?: boolean,
  id?: string,
  name?: string,
  disabled?: boolean,
  onClick?: (event: Object) => void,
};

export default function RadioButton({
  label,
  checked,
  disabled,
  onClick = noop,
  id = uniqueID(),
  name = id,
}: Props) {
  function handleClick(...args) {
    if (!disabled) {
      onClick(...args);
    }
  }

  const className = classNames(
    styles.RadioButton,
    checked && styles.checked,
    disabled && styles.disabled,
  );

  return (
    <div className={className} onClick={handleClick}>
      <div className={styles.Box}>
        <div className={styles.SelectedMark} />
        <input
          id={id}
          name={name}
          type="radio"
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
  return `RadioButton${index++}`;
}
