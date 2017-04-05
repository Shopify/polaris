import * as React from 'react';
import * as styles from './VisuallyHidden.scss';

export interface Props {
  children?: React.ReactNode,
}

export default function VisuallyHidden({children}: Props) {
  return (
    <span className={styles.VisuallyHidden}>{children}</span>
  );
}
