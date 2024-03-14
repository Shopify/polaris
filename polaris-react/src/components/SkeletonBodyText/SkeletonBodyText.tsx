import React from 'react';

import styles from './SkeletonBodyText.module.css';

export interface SkeletonBodyTextProps {
  /**
   * Number of lines to display
   * @default 3
   */
  lines?: number;
}

export function SkeletonBodyText({lines = 3}: SkeletonBodyTextProps) {
  const bodyTextLines = [];

  for (let i = 0; i < lines; i++) {
    bodyTextLines.push(<div className={styles.SkeletonBodyText} key={i} />);
  }

  return (
    <div className={styles.SkeletonBodyTextContainer}>{bodyTextLines}</div>
  );
}
