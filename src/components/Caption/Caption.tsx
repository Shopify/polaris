import * as React from 'react';
import * as styles from './Caption.scss';

export interface Props {
  children?: React.ReactNode,
}

export default function Caption({children}: Props) {
  return <p className={styles.Caption}>{children}</p>;
}
