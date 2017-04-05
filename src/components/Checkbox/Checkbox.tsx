import * as React from 'react';

import Choice from '../Choice';
import Icon from '../Icon';

import * as styles from './Checkbox.scss';

export interface Props {
  label: React.ReactNode,
  checked?: boolean,
  id?: string,
  name?: string,
  value?: string,
  disabled?: boolean,
  onChange?(newValue: boolean): void,
  onFocus?(): void,
  onBlur?(): void,
}

export default function Checkbox({
  label,
  checked,
  disabled,
  onChange,
  onFocus,
  onBlur,
  id = uniqueID(),
  name,
  value,
}: Props) {
  function handleChange({currentTarget}: React.ChangeEvent<HTMLInputElement>) {
    if (onChange == null) { return; }
    onChange(currentTarget.checked);
  }

  return (
    <Choice label={label} id={id}>
      <div className={styles.Checkbox}>
        <input
          id={id}
          name={name}
          value={value}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          className={styles.Input}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />

        <div className={styles.Backdrop} />
        <div className={styles.Icon}>
          <Icon source="checkmark" size={12} />
        </div>
      </div>
    </Choice>
  );
}

let index = 1;
function uniqueID() {
  return `Checkbox${index++}`;
}
