// @flow

import React from 'react';
import styles from './RadioButton.scss';

import Label from '../Label';

import {css} from '../../utilities/styles';
import {noop} from '../../utilities/other';

type Props = {
  label?: any,
  checked?: boolean,
  id?: string,
  name?: string,
  disabled?: boolean,
  onClick?: (event: Object) => void,
};

export default function RadioButton(props: Props) {
  const {label, checked, disabled, onClick = noop, id = uniqueID(), name = id} = props;

  return (
    <div className={classNameForRadioButton(props)} onClick={(...args) => !disabled && onClick(...args)}>
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

function classNameForRadioButton({checked, disabled}) {
  return css([
    styles.RadioButton,
    checked && styles.checked,
    disabled && styles.disabled,
  ]);
}

let index = 1;
function uniqueID() {
  return `RadioButton${index++}`;
}
