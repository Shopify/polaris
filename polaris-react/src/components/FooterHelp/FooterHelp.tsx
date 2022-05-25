import React from 'react';

import {usePerformanceBenchmark} from '../../utilities/use-performance-benchmark';

import styles from './FooterHelp.scss';

export interface FooterHelpProps {
  /** The content to display inside the layout. */
  children?: React.ReactNode;
}

export function FooterHelp({children}: FooterHelpProps) {
  usePerformanceBenchmark('FooterHelp');
  return (
    <div className={styles.FooterHelp}>
      <div className={styles.Text}>{children}</div>
    </div>
  );
}
