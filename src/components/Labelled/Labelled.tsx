import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import Label, {Props as LabelProps, Action, labelID} from '../Label';

import * as styles from './Labelled.scss';

export {Action, labelID};

export interface Props {
  children?: React.ReactNode,
  id: LabelProps['id'],
  label: string,
  error: LabelProps['error'],
  action: LabelProps['action'],
  labelHidden?: boolean,
  helpText?: React.ReactNode,
};

export default function Labelled({
  id,
  label,
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
      {helpTextMarkup}
    </div>
  );
}

export function helpTextID(id: string) {
  return `${id}HelpText`;
}
