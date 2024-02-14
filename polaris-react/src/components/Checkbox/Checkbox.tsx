import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useContext,
  useId,
} from 'react';
import {MinusIcon} from '@shopify/polaris-icons';

import {classNames, variationName} from '../../utilities/css';
import type {ResponsiveProp} from '../../utilities/css';
import type {ChoiceBleedProps} from '../Choice';
import {Choice, helpTextID} from '../Choice';
import {errorTextID} from '../InlineError';
import {Icon} from '../Icon';
import type {Error, CheckboxHandles} from '../../types';
import {WithinListboxContext} from '../../utilities/listbox/context';

import styles from './Checkbox.module.scss';

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
  /** Indicates the tone of the checkbox */
  tone?: 'magic';
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
      tone,
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

    const iconSource = (
      <svg
        viewBox="0 0 16 16"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
      >
        <path
          className={classNames(checked && styles.checked)}
          d="M1.5,5.5L3.44655,8.22517C3.72862,8.62007,4.30578,8.64717,4.62362,8.28044L10.5,1.5"
          transform="translate(2 2.980376)"
          opacity="0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="1"
        />
      </svg>
    );

    const inputClassName = classNames(
      styles.Input,
      isIndeterminate && styles['Input-indeterminate'],
      tone && styles[variationName('tone', tone)],
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
        tone={tone}
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
          <span
            className={classNames(
              styles.Icon,
              !isIndeterminate && styles.animated,
            )}
          >
            {isIndeterminate ? <Icon source={MinusIcon} /> : iconSource}
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
