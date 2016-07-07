// @flow

import React from 'react';
import styles from './index.scss';

import Label from '../Label';
// eslint-disable-next-line
import type {Props as LabelProps} from '../Label';

import {css} from '../../utilities/styles';

type Props = LabelProps & {
  children?: any,
  labelHidden?: boolean,
  label?: any,
};

export default function Labelled(props: Props) {
  const {label, children, ...rest} = props;

  return (
    <div className={classNameForLabelled(props)}>
      <div className={styles.LabelWrapper}>
        <Label {...rest}>{label}</Label>
      </div>

      {children}
    </div>
  );
}

function classNameForLabelled({labelHidden}) {
  return css([
    styles.Labelled,
    labelHidden && styles.hidden,
  ]);
}
