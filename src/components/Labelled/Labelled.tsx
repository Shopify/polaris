import React from 'react';

import {classNames} from '../../utilities/css';
import {Action, Error} from '../../types';
import {buttonFrom} from '../Button';
import {Label, LabelProps, labelID} from '../Label';
import {InlineError} from '../InlineError';

import styles from './Labelled.scss';

export {labelID};

export interface LabelledProps {
  /** A unique identifier for the label */
  id: LabelProps['id'];
  /** Text for the label */
  label: string;
  /** Error to display beneath the label */
  error?: Error | boolean;
  /** An action */
  action?: Action;
  /** Additional hint text to display */
  helpText?: React.ReactNode;
  /** Content to display inside the connected */
  children?: React.ReactNode;
  /** Visually hide the label */
  labelHidden?: boolean;
}

export function Labelled({
  id,
  label,
  error,
  action,
  helpText,
  children,
  labelHidden,
  ...rest
}: LabelledProps) {
  const className = classNames(labelHidden && styles.hidden);

  const actionMarkup = action ? (
    <div className={styles.Action}>{buttonFrom(action, {plain: true})}</div>
  ) : null;

  const helpTextMarkup = helpText ? (
    <div className={styles.HelpText} id={helpTextID(id)}>
      {helpText}
    </div>
  ) : null;

  const errorMarkup = error && typeof error !== 'boolean' && (
    <div className={styles.Error}>
      <InlineError message={error} fieldID={id} />
    </div>
  );

  const labelMarkup = label ? (
    <div className={styles.LabelWrapper}>
      <Label id={id} {...rest} hidden={false}>
        {label}
      </Label>

      {actionMarkup}
    </div>
  ) : null;

  return (
    <div className={className}>
      {labelMarkup}
      {children}
      {errorMarkup}
      {helpTextMarkup}
    </div>
  );
}

export function errorID(id: string) {
  return `${id}Error`;
}

export function helpTextID(id: string) {
  return `${id}HelpText`;
}
