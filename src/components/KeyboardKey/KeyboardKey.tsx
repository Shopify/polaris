import * as React from 'react';
import * as styles from './KeyboardKey.scss';

export interface Props {
  children?: React.ReactNode,
}

export default function KeyboardKey({children}: Props) {
  return <span className={styles.KeyboardKey}>{children}</span>;
}
