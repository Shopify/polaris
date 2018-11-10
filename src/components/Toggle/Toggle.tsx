import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import Labelled from '../Labelled';

import * as styles from './Toggle.scss';

export interface Props {
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** Toggles between enabled and disabled */
  checked?: boolean;
  /** Disables the toggle, disallowing interaction */
  disabled?: boolean;
  /** A unique identifier for the toggle */
  id?: string;
  /** Label for the toggle */
  label: string;
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Element to display before the input */
  prefix?: React.ReactNode;
  /** Element to display after the input */
  suffix?: React.ReactNode;
  /** Callback when the toggle value is changed */
  onChange(newChecked: boolean): void;
}

const getUniqueID = createUniqueIDFactory('Toggle');

export default function Toggle({
  id = getUniqueID(),
  checked = false,
  disabled = false,
  onChange,
  accessibilityLabel,
  label,
  labelHidden = false,
  prefix,
  suffix,
}: Props) {
  const className = classNames(
    styles.Toggle,
    checked && styles.ToggleChecked,
    disabled && styles.ToggleDisabled,
  );

  const inputClassName = classNames(
    styles.Input,
    checked && styles.ToggleChecked,
    disabled && styles.ToggleDisabled,
  );

  function handleChange(event: React.MouseEvent<HTMLButtonElement>) {
    if (disabled || !onChange) {
      return;
    }

    const isButtonChecked =
      event.currentTarget.getAttribute('aria-checked') === 'true';

    onChange(!isButtonChecked);
  }

  const prefixMarkup = prefix && <div className={styles.Prefix}>{prefix}</div>;

  const suffixMarkup = suffix && <div className={styles.Suffix}>{suffix}</div>;

  return (
    <Labelled id={id} label={label} labelHidden={labelHidden}>
      <div className={className}>
        {prefixMarkup}
        <button
          id={id}
          type="button"
          className={inputClassName}
          onClick={handleChange}
          aria-checked={checked}
          aria-disabled={disabled}
          aria-label={accessibilityLabel}
          role="switch"
        >
          <div className={styles.ToggleTrack} />
          <div className={styles.ToggleThumb} />
        </button>
        {suffixMarkup}
      </div>
    </Labelled>
  );
}
