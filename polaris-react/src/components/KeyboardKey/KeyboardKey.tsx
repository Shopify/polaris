import React from 'react';

import {classNames} from '../../utilities/css';

import styles from './KeyboardKey.scss';

type Color = 'dark';
type Variant = 'small';

export interface KeyboardKeyProps {
  /** The content to display inside the key */
  children?: string;
  color?: Color;
  variant?: Variant;
}
export function KeyboardKey({children, color, variant}: KeyboardKeyProps) {
  let key = children || '';
  key = key.length > 1 ? key.toLowerCase() : key.toUpperCase();

  const className = classNames(
    styles.KeyboardKey,
    color && styles[color],
    variant && styles[variant],
  );

  return <kbd className={className}>{key}</kbd>;
}
