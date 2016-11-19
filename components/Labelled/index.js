// @flow

import React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import Label from '../Label';
import type {Props as LabelProps} from '../Label';

import styles from './index.scss';

type Props = LabelProps & {
  children?: any,
  labelHidden?: boolean,
  label?: any,
};

export default function Labelled({label, children, labelHidden, ...rest}: Props) {
  const className = classNames(
    styles.Labelled,
    labelHidden && styles.hidden,
  );

  return (
    <div className={className}>
      <div className={styles.LabelWrapper}>
        <Label {...rest}>{label}</Label>
      </div>

      {children}
    </div>
  );
}
