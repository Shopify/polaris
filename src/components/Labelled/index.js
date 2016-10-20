// @flow

import React from 'react';

import Label from '../Label';
// eslint-disable-next-line no-duplicate-imports
import type {Props as LabelProps} from '../Label';
import {css} from '../../utilities/styles';

import styles from './index.scss';

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
