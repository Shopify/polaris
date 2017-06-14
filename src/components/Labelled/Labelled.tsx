import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import Label, {Props as LabelProps, Action, labelID} from '../Label';
import Icon from '../Icon';

import * as styles from './Labelled.scss';

export {Action, labelID};

export type Error = boolean | string;

export interface Props {
  id: LabelProps['id'],
  label: string,
  error?: Error,
  action?: LabelProps['action'],
  helpText?: React.ReactNode,
  children?: React.ReactNode,
  labelHidden?: boolean,
}

export default function Labelled({
  id,
  label,
  error,
  children,
  labelHidden,
  helpText,
  ...rest,
}: Props) {
  const className = classNames(
    labelHidden && styles.hidden,
  );

  const helpTextMarkup = helpText
    ? <div className={styles.HelpText} id={helpTextID(id)}>{helpText}</div>
    : null;

  const errorMarkup = typeof error === 'string'
    ? (
      <div id={errorID(id)} className={styles.Error}>
        <div className={styles.ErrorIcon}>
          <Icon source="alert" />
        </div>
        {error}
      </div>
    )
    : null;

  const labelMarkup = label
    ? (
      <div className={styles.LabelWrapper}>
        <Label id={id} {...rest} hidden={false}>{label}</Label>
      </div>
    )
    : null;

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
