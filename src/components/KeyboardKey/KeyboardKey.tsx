import * as React from 'react';
import * as styles from './KeyboardKey.scss';

export interface Props {
  /** The content to display inside the key */
  children?: string,
}

export default function KeyboardKey({children}: Props) {
  let key = children || '';
  key = key.length > 1
    ? key.toLowerCase()
    : key.toUpperCase();

  return <kbd className={styles.KeyboardKey}>{key}</kbd>;
}
