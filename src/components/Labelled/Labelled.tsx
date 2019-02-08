import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import {Action, Error} from '../../types';

import {buttonFrom} from '../Button';
import Label, {Props as LabelProps, labelID} from '../Label';
import InlineError from '../InlineError';

import styles from './Labelled.scss';

export {Action, labelID};

export interface Props {
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

export default function Labelled({
  id,
  label,
  error,
  action,
  helpText,
  children,
  labelHidden,
  ...rest
}: Props) {
  const className = classNames(labelHidden && styles.hidden);

  const actionMarkup = action ? buttonFrom(action, {plain: true}) : null;

  const helpTextMarkup = helpText ? (
    <div className={styles.HelpText} id={helpTextID(id)}>
      {helpText}
    </div>
  ) : null;

  const errorMarkup = error &&
    typeof error !== 'boolean' && (
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
