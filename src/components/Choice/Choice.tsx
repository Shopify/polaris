import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import {Error} from '../../types';
import InlineError from '../InlineError';

import * as styles from './Choice.scss';

export interface Props {
  /** A unique identifier for the choice */
  id: string;
  /**	Label for the choice */
  label: React.ReactNode;
  /** Whether the associated form control is disabled */
  disabled?: Boolean;
  /** Display an error message */
  error?: Error;
  /** Visually hide the label */
  labelHidden?: boolean;
  /**  Content to display inside the choice */
  children?: React.ReactNode;
  /** Additional text to aide in use */
  helpText?: React.ReactNode;
}

export default function Choice({
  id,
  label,
  disabled,
  error,
  children,
  labelHidden,
  helpText,
}: Props) {
  const className = classNames(
    styles.Choice,
    labelHidden && styles.labelHidden,
    disabled && styles.disabled,
  );

  const labelMarkup = (
    <label className={className} htmlFor={id}>
      <span className={styles.Control}>{children}</span>
      <span className={styles.Label}>{label}</span>
    </label>
  );

  const helpTextMarkup = helpText ? (
    <div className={styles.HelpText} id={helpTextID(id)}>
      {helpText}
    </div>
  ) : null;

  const errorMarkup = error && (
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
