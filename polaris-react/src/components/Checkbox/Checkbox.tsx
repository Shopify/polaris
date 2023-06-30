import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useContext,
  useId,
} from 'react';
import {MinusMinor, TickSmallMinor} from '@shopify/polaris-icons';

import {classNames} from '../../utilities/css';
import {useToggle} from '../../utilities/use-toggle';
import {Choice, helpTextID} from '../Choice';
import {errorTextID} from '../InlineError';
import {Icon} from '../Icon';
import type {Error, CheckboxHandles} from '../../types';
import {WithinListboxContext} from '../../utilities/listbox/context';

import styles from './Checkbox.scss';

interface BaseCheckboxProps {
  /** Indicates the ID of the element that is controlled by the checkbox */
  ariaControls?: string;
  /** Indicates the ID of the element that describes the checkbox */
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
  /** Callback when checkbox is focused */
  onFocus?(): void;
  /** Callback when focus is removed */
  onBlur?(): void;
}

interface ControlledHoverProps extends BaseCheckboxProps {
  /** Cannot set onMouseOver when hovered is set */
  onMouseOver?: never;
  /** Cannot set onMouseOut when hovered is set*/
  onMouseOut?: never;
  /** Control the hovered state of the choice */
  hovered: boolean;
}

interface UncontrolledHoverProps extends BaseCheckboxProps {
  /** Callback when mouse over */
  onMouseOver?(): void;
  /** Callback when mouse out */
  onMouseOut?(): void;
  /** Cannot control hovered when onMouseOver or onMouseOut set */
  hovered?: never;
}

export type CheckboxProps = ControlledHoverProps | UncontrolledHoverProps;

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
      hovered,
      onMouseOver,
      onMouseOut,
    }: CheckboxProps,
    ref,
  ) {
    const inputNode = useRef<HTMLInputElement>(null);
    const uniqId = useId();
    const id = idProp ?? uniqId;
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
      (typeof hovered !== 'undefined' ? hovered : mouseOver) && styles.hover,
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
        onMouseOver={
          typeof hovered !== 'undefined'
            ? undefined
            : () => {
                handleMouseOver();
                onMouseOver?.();
              }
        }
        onMouseOut={
          typeof hovered !== 'undefined'
            ? undefined
            : () => {
                handleMouseOut();
                onMouseOut?.();
              }
        }
        hovered={typeof hovered !== 'undefined' ? hovered : undefined}
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
