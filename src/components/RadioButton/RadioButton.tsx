import * as React from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import Choice, {helpTextID} from '../Choice';
import * as styles from './RadioButton.scss';

export interface Props {
  label: string,
  labelHidden?: boolean,
  helpText?: React.ReactNode,
  checked?: boolean,
  id?: string,
  name?: string,
  value?: string,
  disabled?: boolean,
  onChange?(newValue: boolean): void,
  onFocus?(): void,
  onBlur?(): void,
}

const getUniqueID = createUniqueIDFactory('RadioButton');

export default function RadioButton({
  label,
  labelHidden,
  helpText,
  checked,
  disabled,
  onChange,
  onFocus,
  onBlur,
  id = getUniqueID(),
  name = id,
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
      <div className={styles.RadioButton}>
        <input
          id={id}
          name={name}
          value={value}
          type="radio"
          checked={checked}
          disabled={disabled}
          className={styles.Input}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-describedby={describedBy}
        />
        <div className={styles.Backdrop} />
        <div className={styles.Icon} />
      </div>
    </Choice>
  );
}
