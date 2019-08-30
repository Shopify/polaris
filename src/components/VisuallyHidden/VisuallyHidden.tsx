import React from 'react';
import styles from './VisuallyHidden.scss';

export interface Props {
  /** The content to be hidden visually */
  children?: React.ReactNode;
}

export default function VisuallyHidden({children}: Props) {
  return <span className={styles.VisuallyHidden}>{children}</span>;
}
