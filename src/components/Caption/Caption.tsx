import React from 'react';

import styles from './Caption.scss';

export interface CaptionProps {
  /** The content to use as a graph label or timestamp */
  children?: React.ReactNode;
}

export function Caption({children}: CaptionProps) {
  return <p className={styles.Caption}>{children}</p>;
}
