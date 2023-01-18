import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useContext,
} from 'react';
import {MinusMinor, TickSmallMinor} from '@shopify/polaris-icons';

import {classNames} from '../../utilities/css';
import {useToggle} from '../../utilities/use-toggle';
import {useUniqueId} from '../../utilities/unique-id';
import {Choice, helpTextID} from '../Choice';
import {errorTextID} from '../InlineError';
import {Icon} from '../Icon';
import type {Error, CheckboxHandles} from '../../types';
import {WithinListboxContext} from '../../utilities/listbox/context';

import styles from './Checkbox.scss';

export interface CheckboxProps {
  /** Indicates the ID of the element that is controlled by the checkbox*/
  ariaControls?: string;
  /** Indicates the ID of the element that describes the checkbox*/
  ariaDescribedBy?: string;
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
  error?: Error | boolean;
  /** Callback when checkbox is toggled */
  onChange?(newChecked: boolean, id: string): void;
  /** Callback when checkbox is focussed */
  onFocus?(): void;
  /** Callback when focus is removed */
  onBlur?(): void;
}

export const Checkbox = forwardRef<CheckboxHandles, CheckboxProps>(
  function Checkbox(
    {
      ariaControls,
      ariaDescribedBy: ariaDescribedByProp,
      label,
      labelHidden,
      checked = false,
      helpText,
      disabled,
      id: idProp,
      name,
      value,
      error,
      onChange,
      onFocus,
      onBlur,
    }: CheckboxProps,
    ref,
  ) {
    const inputNode = useRef<HTMLInputElement>(null);
    const id = useUniqueId('Checkbox', idProp);
    const {
      value: mouseOver,
      setTrue: handleMouseOver,
      setFalse: handleMouseOut,
    } = useToggle(false);
    const isWithinListbox = useContext(WithinListboxContext);

    useImperativeHandle(ref, () => ({
      focus: () => {
        if (inputNode.current) {
          inputNode.current.focus();
        }
      },
    }));

    const handleBlur = () => {
      onBlur && onBlur();
    };

    const handleOnClick = () => {
      if (onChange == null || inputNode.current == null || disabled) {
        return;
      }

      onChange(inputNode.current.checked, id);
      inputNode.current.focus();
    };

    const describedBy: string[] = [];
    if (error && typeof error !== 'boolean') {
      describedBy.push(errorTextID(id));
    }
    if (helpText) {
      describedBy.push(helpTextID(id));
    }
    if (ariaDescribedByProp) {
      describedBy.push(ariaDescribedByProp);
    }
    const ariaDescribedBy = describedBy.length
      ? describedBy.join(' ')
      : undefined;

    const wrapperClassName = classNames(styles.Checkbox, error && styles.error);

    const backdropClassName = classNames(
      styles.Backdrop,
      mouseOver && styles.hover,
    );

    const isIndeterminate = checked === 'indeterminate';
    const isChecked = !isIndeterminate && Boolean(checked);

    const indeterminateAttributes = isIndeterminate
      ? {indeterminate: 'true', 'aria-checked': 'mixed' as const}
      : {'aria-checked': isChecked};

    const iconSource = isIndeterminate ? MinusMinor : TickSmallMinor;

    const inputClassName = classNames(
      styles.Input,
      isIndeterminate && styles['Input-indeterminate'],
    );

    return (
      <Choice
        id={id}
        label={label}
        labelHidden={labelHidden}
        helpText={helpText}
        error={error}
        disabled={disabled}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <span className={wrapperClassName}>
          <input
            ref={inputNode}
            id={id}
            name={name}
            value={value}
            type="checkbox"
            checked={isChecked}
            disabled={disabled}
            className={inputClassName}
            onBlur={handleBlur}
            onChange={noop}
            onClick={handleOnClick}
            onFocus={onFocus}
            aria-invalid={error != null}
            aria-controls={ariaControls}
            aria-describedby={ariaDescribedBy}
            role={isWithinListbox ? 'presentation' : 'checkbox'}
            {...indeterminateAttributes}
          />
          <span
            className={backdropClassName}
            onClick={stopPropagation}
            onKeyUp={stopPropagation}
          />
          <span className={styles.Icon}>
            <Icon source={iconSource} />
          </span>
        </span>
      </Choice>
    );
  },
);

function noop() {}

function stopPropagation(
  event: React.MouseEvent | React.KeyboardEvent | React.FormEvent,
) {
  event.stopPropagation();
}
