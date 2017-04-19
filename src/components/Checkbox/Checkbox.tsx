import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';

import Choice, {Error, errorID, helpTextID} from '../Choice';
import Icon from '../Icon';

import checkmark from './icons/checkmark.svg';
import * as styles from './Checkbox.scss';

export interface Props {
  label: string,
  labelHidden?: boolean,
  checked?: boolean,
  helpText?: React.ReactNode,
  id?: string,
  name?: string,
  value?: string,
  error?: Error,
  disabled?: boolean,
  onChange?(newValue: boolean): void,
  onFocus?(): void,
  onBlur?(): void,
}

const getUniqueID = createUniqueIDFactory('Checkbox');

export default function Checkbox({
  id = getUniqueID(),
  label,
  labelHidden,
  helpText,
  checked,
  error,
  disabled,
  onChange,
  onFocus,
  onBlur,
  name,
  value,
}: Props) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (onChange == null) { return; }
    const {currentTarget} = event;
    onChange(currentTarget.checked);
  }

  const describedBy: string[] = [];
  if (typeof error === 'string') { describedBy.push(errorID(id)); }
  if (helpText) { describedBy.push(helpTextID(id)); }

  const className = classNames(
    styles.Checkbox,
    error && styles.error,
  );

  return (
    <Choice
      id={id}
      label={label}
      labelHidden={labelHidden}
      helpText={helpText}
      error={error}
    >
      <div className={className}>
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
          aria-invalid={error != null}
          aria-describedby={describedBy.length ? describedBy.join(' ') : undefined}
        />

        <div className={styles.Backdrop} />
        <div className={styles.Icon}>
          <Icon source={checkmark} />
        </div>
      </div>
    </Choice>
  );
}
