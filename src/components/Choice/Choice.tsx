import * as React from 'react';
import * as styles from './Choice.scss';

export interface Props {
  label: React.ReactNode,
  id: string,
  children?: React.ReactNode,
}

export default function Choice({children, label, id}: Props) {
  return (
    <label className={styles.Choice} htmlFor={id}>
      <div className={styles.Control}>{children}</div>
      <div className={styles.Label}>{label}</div>
    </label>
  );
}
