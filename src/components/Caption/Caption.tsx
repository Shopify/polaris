import * as React from 'react';
import * as styles from './Caption.scss';

export interface Props {
  /** The content to use as a graph label or timestamp */
  children?: React.ReactNode,
}

export default function Caption({children}: Props) {
  return <p className={styles.Caption}>{children}</p>;
}
