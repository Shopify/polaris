import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import {Action, Error} from '../../types';

import {buttonFrom} from '../Button';
import Label, {Props as LabelProps, labelID} from '../Label';
import Icon from '../Icon';

import * as styles from './Labelled.scss';

export {Action, labelID};

export interface Props {
  id: LabelProps['id'];
  label: string;
  error?: Error;
  action?: Action;
  helpText?: React.ReactNode;
  children?: React.ReactNode;
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

  const errorMarkup = error && (
    <div id={errorID(id)} className={styles.Error}>
      <div className={styles.ErrorIcon}>
        <Icon source="alert" />
      </div>
      {error}
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
