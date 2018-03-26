import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import Icon from '../Icon';
import * as styles from './Choice.scss';

export type Error = boolean | string;

export interface Props {
  id: string;
  label: React.ReactNode;
  error?: Error;
  labelHidden?: boolean;
  children?: React.ReactNode;
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
      <div className={styles.Control}>{children}</div>
      <span className={styles.Label}>{label}</span>
    </label>
  );

  const helpTextMarkup = helpText ? (
    <div className={styles.HelpText} id={helpTextID(id)}>
      {helpText}
    </div>
  ) : null;

  const errorMarkup =
    typeof error === 'string' ? (
      <div className={styles.Error} id={errorID(id)}>
        <div className={styles.ErrorIcon}>
          <Icon source="alert" />
        </div>
        {error}
      </div>
    ) : null;

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
