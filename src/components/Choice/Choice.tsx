import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import * as styles from './Choice.scss';

export interface Props {
  id: string,
  label: string,
  labelHidden?: boolean,
  children?: string,
  helpText?: React.ReactNode,
}

export default function Choice({children, label, id, labelHidden, helpText}: Props) {
  const className = classNames(styles.Choice, labelHidden && styles.labelHidden);
  const labelMarkup = (
    <label className={className} htmlFor={id}>
      <div className={styles.Control}>{children}</div>
      <div className={styles.Label}>{label}</div>
    </label>
  );

  return helpText
    ? (
      <div>
        {labelMarkup}
        <div className={styles.HelpText} id={helpTextID(id)}>{helpText}</div>
      </div>
    )
    : labelMarkup;
}

export function helpTextID(id: string) {
  return `${id}HelpText`;
}
