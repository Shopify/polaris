import * as React from 'react';
import styles from './SkeletonBodyText.scss';

export interface Props {
  /**
   * Number of lines to display
   * @default 3
   */
  lines?: number;
}

export default function SkeletonBodyText({lines = 3}: Props) {
  const bodyTextLines = [];

  for (let i = 0; i < lines; i++) {
    bodyTextLines.push(<div className={styles.SkeletonBodyText} key={i} />);
  }

  return (
    <div className={styles.SkeletonBodyTextContainer}>{bodyTextLines}</div>
  );
}
