import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import Labelled from '../Labelled';
import Icon from '../Icon';

import * as styles from './Toggle.scss';

export interface Props {
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
  checked,
  disabled,
  onChange,
  label,
  labelHidden,
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

  function handleChange(event: React.MouseEvent<HTMLElement>) {
    if (disabled) {
      return;
    }

    const buttonNotChecked =
      event.currentTarget.getAttribute('aria-checked') === 'true';

    onChange(!buttonNotChecked);
  }

  const prefixMarkup = prefix ? (
    <div className={styles.Prefix}>{prefix}</div>
  ) : null;
  const suffixMarkup = suffix ? (
    <div className={styles.Suffix}>{suffix}</div>
  ) : null;

  const iconMarkup = checked ? (
    <Icon source="checkmark" color="indigo" />
  ) : (
    <div className={styles.IconReducedSize}>
      <Icon source="cancelSmall" color="inkLighter" />
    </div>
  );

  return (
    <Labelled id={id} label={label} labelHidden={labelHidden}>
      <div className={className}>
        {prefixMarkup}
        <div
          id={id}
          tabIndex={0}
          className={inputClassName}
          onClick={handleChange}
          aria-checked={checked}
          aria-disabled={disabled}
          aria-label={label}
          role="checkbox"
        >
          <div className={styles.ToggleTrack} />
          <div className={styles.ToggleThumb}>{iconMarkup}</div>
        </div>
        {suffixMarkup}
      </div>
    </Labelled>
  );
}
