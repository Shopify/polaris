import React from 'react';

import {usePerformanceBenchmark} from '../../utilities/use-performance-benchmark';

import styles from './VisuallyHidden.scss';

export interface VisuallyHiddenProps {
  /** The content to be hidden visually */
  children?: React.ReactNode;
}

export function VisuallyHidden({children}: VisuallyHiddenProps) {
  usePerformanceBenchmark('VisuallyHidden');
  return <span className={styles.VisuallyHidden}>{children}</span>;
}
