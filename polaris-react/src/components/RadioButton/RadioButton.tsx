import React, {useRef} from 'react';

import {useUniqueId} from '../../utilities/unique-id';
import {useToggle} from '../../utilities/use-toggle';
import {classNames} from '../../utilities/css';
import {Choice, helpTextID} from '../Choice';

import styles from './RadioButton.scss';

export interface RadioButtonProps {
  /** Indicates the ID of the element that describes the the radio button*/
  ariaDescribedBy?: string;
  /** Label for the radio button */
  label: React.ReactNode;
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Radio button is selected */
  checked?: boolean;
  /** Additional text to aid in use */
  helpText?: React.ReactNode;
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
  /** Callback when radio button is focussed */
  onFocus?(): void;
  /** Callback when focus is removed */
  onBlur?(): void;
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
}: RadioButtonProps) {
  const id = useUniqueId('RadioButton', idProp);
  const name = nameProp || id;
  const inputNode = useRef<HTMLInputElement>(null);

  const {
    value: mouseOver,
    setTrue: handleMouseOver,
    setFalse: handleMouseOut,
  } = useToggle(false);

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

  const backdropClassName = classNames(
    styles.Backdrop,
    mouseOver && styles.hover,
  );

  return (
    <Choice
      label={label}
      labelHidden={labelHidden}
      disabled={disabled}
      id={id}
      helpText={helpText}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
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
        <span className={backdropClassName} />
      </span>
    </Choice>
  );
}
