import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import Label, {Props as LabelProps, Action} from '../Label';

import * as styles from './Labelled.scss';

export {Action};

export interface Props extends LabelProps {
  children?: React.ReactNode,
  labelHidden?: boolean,
  label?: React.ReactNode,
  helpText?: React.ReactNode,
};

export default function Labelled({
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
    ? <div className={styles.HelpText}>{helpText}</div>
    : null;

  const labelMarkup = label
    ? (
      <div className={styles.LabelWrapper}>
        <Label {...rest}>{label}</Label>
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
