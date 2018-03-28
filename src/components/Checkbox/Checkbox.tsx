import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';

import Choice, {Error, errorID, helpTextID} from '../Choice';
import Icon from '../Icon';

import * as styles from './Checkbox.scss';

export interface BaseProps {
  /** Label for the checkbox */
  label: React.ReactNode;
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Checkbox is selected. `indeterminate` shows a horizontal line in the checkbox */
  checked?: boolean | 'indeterminate';
  /** Additional text to aide in use */
  helpText?: React.ReactNode;
  /** Disable input */
  disabled?: boolean;
  /** ID for form input */
  id?: string;
  /** Name for form input */
  name?: string;
  /** Value for form input */
  value?: string;
  /** Display an error message */
  error?: Error;
  /** Callback when checkbox is toggled */
  onChange?(newChecked: boolean, id: string): void;
  /** Callback when checkbox is focussed */
  onFocus?(): void;
  /** Callback when focus is removed */
  onBlur?(): void;
}

export interface Props extends BaseProps {}

const getUniqueID = createUniqueIDFactory('Checkbox');

export default function Checkbox({
  id = getUniqueID(),
  label,
  labelHidden,
  helpText,
  checked = false,
  error,
  disabled,
  onChange,
  onFocus,
  onBlur,
  name,
  value,
}: Props) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (onChange == null) {
      return;
    }
    const {currentTarget} = event;
    onChange(currentTarget.checked, id);
  }

  const describedBy: string[] = [];
  if (typeof error === 'string') {
    describedBy.push(errorID(id));
  }
  if (helpText) {
    describedBy.push(helpTextID(id));
  }
  const ariaDescribedBy = describedBy.length
    ? describedBy.join(' ')
    : undefined;

  const wrapperClassName = classNames(styles.Checkbox, error && styles.error);

  const isIndeterminate = checked === 'indeterminate';
  const isChecked = !isIndeterminate && Boolean(checked);

  const indeterminateAttributes = isIndeterminate
    ? {indeterminate: 'true', 'aria-checked': 'mixed'}
    : {'aria-checked': isChecked};

  const iconSource = isIndeterminate ? 'subtract' : 'checkmark';

  const inputClassName = classNames(
    styles.Input,
    isIndeterminate && styles['Input-indeterminate'],
  );

  return (
    /* eslint-disable jsx-a11y/no-redundant-roles, jsx-a11y/role-has-required-aria-props */
    <Choice
      id={id}
      label={label}
      labelHidden={labelHidden}
      helpText={helpText}
      error={error}
    >
      <span className={wrapperClassName}>
        <input
          id={id}
          name={name}
          value={value}
          type="checkbox"
          checked={isChecked}
          disabled={disabled}
          className={inputClassName}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-invalid={error != null}
          aria-describedby={ariaDescribedBy}
          role="checkbox"
          {...indeterminateAttributes}
        />
        <span className={styles.Backdrop} />
        <span className={styles.Icon}>
          <Icon source={iconSource} />
        </span>
      </span>
    </Choice>
    /* eslint-disable jsx-a11y/no-redundant-roles, jsx-a11y/role-has-required-aria-props */
  );
}
