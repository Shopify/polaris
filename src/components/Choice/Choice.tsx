import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {Error} from '../../types';
import Icon from '../Icon';
import * as styles from './Choice.scss';

export interface Props {
  /** A unique identifier for the choice */
  id: string;
  /**	Label for the choice */
  label: React.ReactNode;
  /** Display an error message */
  error?: Error;
  /** Visually hide the label */
  labelHidden?: boolean;
  /**  The content to display inside the choice */
  children?: React.ReactNode;
  /** Additional text to aide in use */
  helpText?: React.ReactNode;
}

export default function Choice({
  id,
  label,
  error,
  children,
  labelHidden,
  helpText,
}: Props) {
  const className = classNames(
    styles.Choice,
    labelHidden && styles.labelHidden,
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
    <div className={styles.Error} id={errorID(id)}>
      <div className={styles.ErrorIcon}>
        <Icon source="alert" />
      </div>
      {error}
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

export function errorID(id: string) {
  return `${id}Error`;
}
