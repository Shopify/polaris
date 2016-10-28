// @flow

import React from 'react';
import {classNames} from '@shopify/react-utilities';

import {noop} from '../../utilities/other';

import styles from './Button.scss';

type Props = {
  children?: any,
  primary?: boolean,
  destructive?: boolean,
  disabled?: boolean,
  link?: boolean,
  onClick?: (event: Object) => void,
  fullWidth?: boolean,
};

export default function Button({
  disabled,
  children,
  onClick = noop,
  primary = false,
  destructive = false,
  link = false,
  fullWidth = false,
}: Props) {
  const className = classNames(
    styles.Button,
    primary && styles.primary,
    destructive && styles.destructive,
    disabled && styles.disabled,
    link && styles.link,
    fullWidth && styles.fullWidth,
  );

  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  );
}
