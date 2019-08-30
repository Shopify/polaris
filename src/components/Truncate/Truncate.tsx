import React from 'react';
import styles from './Truncate.scss';

export interface Props {
  children: React.ReactNode;
}

export default function Truncate({children}: Props) {
  return <span className={styles.Truncate}>{children}</span>;
}
