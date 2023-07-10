import React, {useRef, useId} from 'react';

import {classNames} from '../../utilities/css';
import type {ResponsiveProp} from '../../utilities/css';
import {Choice, helpTextID} from '../Choice';
import type {ChoiceBleedProps} from '../Choice';

import styles from './RadioButton.scss';

export interface RadioButtonProps extends ChoiceBleedProps {
  /** Indicates the ID of the element that describes the the radio button */
  ariaDescribedBy?: string;
  /** Label for the radio button */
  label: React.ReactNode;
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Radio button is selected */
  checked?: boolean;
  /** Disable input */
  disabled?: boolean;
  /** ID for form input */
  id?: string;
  /** Name for form input */
  name?: string;
  /** Value for form input */
  value?: string;
  /** Callback when the radio button is toggled */
  onChange?(newValue: boolean, id: string): void;
  /** Callback when radio button is focused */
  onFocus?(): void;
  /** Callback when focus is removed */
  onBlur?(): void;
  /** Grow to fill the space. Equivalent to width: 100%; height: 100% */
  fill?: ResponsiveProp<boolean>;
  /** Additional text to aide in use */
  helpText?: React.ReactNode;
}

export function RadioButton({
  ariaDescribedBy: ariaDescribedByProp,
  label,
  labelHidden,
  helpText,
  checked,
  disabled,
  onChange,
  onFocus,
  onBlur,
  id: idProp,
  name: nameProp,
  value,
  fill,
  bleed,
  bleedBlockStart,
  bleedBlockEnd,
  bleedInlineStart,
  bleedInlineEnd,
}: RadioButtonProps) {
  const uniqId = useId();
  const id = idProp ?? uniqId;
  const name = nameProp || id;
  const inputNode = useRef<HTMLInputElement>(null);

  const handleBlur = () => {
    onBlur && onBlur();
  };

  function handleChange({currentTarget}: React.ChangeEvent<HTMLInputElement>) {
    onChange && onChange(currentTarget.checked, id);
  }

  const describedBy: string[] = [];
  if (helpText) {
    describedBy.push(helpTextID(id));
  }
  if (ariaDescribedByProp) {
    describedBy.push(ariaDescribedByProp);
  }
  const ariaDescribedBy = describedBy.length
    ? describedBy.join(' ')
    : undefined;

  const inputClassName = classNames(styles.Input);

  const extraChoiceProps = {
    helpText,
    bleed,
    bleedBlockStart,
    bleedBlockEnd,
    bleedInlineStart,
    bleedInlineEnd,
  };

  return (
    <Choice
      label={label}
      labelHidden={labelHidden}
      disabled={disabled}
      id={id}
      labelClassName={styles.ChoiceLabel}
      fill={fill}
      {...extraChoiceProps}
    >
      <span className={styles.RadioButton}>
        <input
          id={id}
          name={name}
          value={value}
          type="radio"
          checked={checked}
          disabled={disabled}
          className={inputClassName}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={handleBlur}
          aria-describedby={ariaDescribedBy}
          ref={inputNode}
        />
        <span className={styles.Backdrop} />
      </span>
    </Choice>
  );
}
