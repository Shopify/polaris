import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useContext,
  useId,
} from 'react';
import {MinusMinor, TickSmallMinor} from '@shopify/polaris-icons';

import {classNames} from '../../utilities/css';
import type {ResponsiveProp} from '../../utilities/css';
import type {ChoiceBleedProps} from '../Choice';
import {Choice, helpTextID} from '../Choice';
import {errorTextID} from '../InlineError';
import {Icon} from '../Icon';
import type {Error, CheckboxHandles} from '../../types';
import {WithinListboxContext} from '../../utilities/listbox/context';

import styles from './Checkbox.scss';

export interface CheckboxProps extends ChoiceBleedProps {
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
  /** Disable input */
  disabled?: boolean;
  /** ID for form input */
  id?: string;
  /** Name for form input */
  name?: string;
  /** Value for form input */
  value?: string;
  /** Callback when checkbox is toggled */
  onChange?(newChecked: boolean, id: string): void;
  /** Callback when checkbox is focused */
  onFocus?(): void;
  /** Callback when focus is removed */
  onBlur?(): void;
  /** Added to the wrapping label */
  labelClassName?: string;
  /** Grow to fill the space. Equivalent to width: 100%; height: 100% */
  fill?: ResponsiveProp<boolean>;
  /** Additional text to aide in use */
  helpText?: React.ReactNode;
  /** Display an error message */
  error?: Error | boolean;
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
      labelClassName,
      fill,
      bleed,
      bleedBlockStart,
      bleedBlockEnd,
      bleedInlineStart,
      bleedInlineEnd,
    }: CheckboxProps,
    ref,
  ) {
    const inputNode = useRef<HTMLInputElement>(null);
    const uniqId = useId();
    const id = idProp ?? uniqId;
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

    const extraChoiceProps = {
      helpText,
      error,
      bleed,
      bleedBlockStart,
      bleedBlockEnd,
      bleedInlineStart,
      bleedInlineEnd,
    };

    return (
      <Choice
        id={id}
        label={label}
        labelHidden={labelHidden}
        disabled={disabled}
        labelClassName={classNames(styles.ChoiceLabel, labelClassName)}
        fill={fill}
        {...extraChoiceProps}
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
            className={styles.Backdrop}
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
