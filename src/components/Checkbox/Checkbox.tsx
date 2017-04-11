import * as React from 'react';

import Choice, {helpTextID} from '../Choice';
import Icon from '../Icon';

import * as styles from './Checkbox.scss';

export interface Props {
  label: string,
  labelHidden?: boolean,
  checked?: boolean,
  helpText?: React.ReactNode,
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
  labelHidden,
  helpText,
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

  const describedBy = helpText
    ? helpTextID(id)
    : null;

  return (
    <Choice label={label} labelHidden={labelHidden} id={id} helpText={helpText}>
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
          aria-describedby={describedBy}
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
