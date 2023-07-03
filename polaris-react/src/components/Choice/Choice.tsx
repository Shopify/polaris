import React from 'react';

import {classNames} from '../../utilities/css';
import type {Error} from '../../types';
import {InlineError} from '../InlineError';
import {Text} from '../Text';
import {useFeatures} from '../../utilities/features';

import styles from './Choice.scss';

export interface ChoiceProps {
  /** A unique identifier for the choice */
  id: string;
  /**	Label for the choice */
  label: React.ReactNode;
  /** Whether the associated form control is disabled */
  disabled?: boolean;
  /** Display an error message */
  error?: Error | boolean;
  /** Visually hide the label */
  labelHidden?: boolean;
  /**  Content to display inside the choice */
  children?: React.ReactNode;
  /** Additional text to aide in use */
  helpText?: React.ReactNode;
  /** Callback when clicked */
  onClick?(): void;
  /** Added to the wrapping label */
  labelClassName?: string;
}

export function Choice({
  id,
  label,
  disabled,
  error,
  children,
  labelHidden,
  helpText,
  onClick,
  labelClassName,
}: ChoiceProps) {
  const {polarisSummerEditions2023} = useFeatures();
  const className = classNames(
    styles.Choice,
    labelHidden && styles.labelHidden,
    disabled && styles.disabled,
    labelClassName,
  );

  const labelMarkup = (
    <label className={className} htmlFor={id} onClick={onClick}>
      <span className={styles.Control}>{children}</span>
      <span className={styles.Label}>
        <span>{label}</span>
      </span>
    </label>
  );

  const helpTextMarkup = helpText ? (
    <div className={styles.HelpText} id={helpTextID(id)}>
      <Text
        as="span"
        // `undefined` means color: inherit
        // the nearest ancestor with a specified color is .Descriptions in Choice.scss
        color={disabled && polarisSummerEditions2023 ? undefined : 'subdued'}
      >
        {helpText}
      </Text>
    </div>
  ) : null;

  const errorMarkup = error && typeof error !== 'boolean' && (
    <div className={styles.Error}>
      <InlineError message={error} fieldID={id} />
    </div>
  );

  const descriptionMarkup =
    helpTextMarkup || errorMarkup ? (
      <div className={styles.Descriptions}>
        {errorMarkup}
        {helpTextMarkup}
      </div>
    ) : null;

  return descriptionMarkup ? (
    <div>
      {labelMarkup}
      {descriptionMarkup}
    </div>
  ) : (
    labelMarkup
  );
}

export function helpTextID(id: string) {
  return `${id}HelpText`;
}
