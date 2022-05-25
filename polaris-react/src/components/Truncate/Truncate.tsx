import React from 'react';

import {usePerformanceBenchmark} from '../../utilities/use-performance-benchmark';

import styles from './Truncate.scss';

export interface TruncateProps {
  children: React.ReactNode;
}

export function Truncate({children}: TruncateProps) {
  usePerformanceBenchmark('Truncate');
  return <span className={styles.Truncate}>{children}</span>;
}
