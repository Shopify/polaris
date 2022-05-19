import React from 'react';

import {usePerformanceBenchmark} from '../../utilities/use-performance-benchmark';

import styles from './MessageIndicator.scss';

export interface MessageIndicatorProps {
  children?: React.ReactNode;
  active?: boolean;
}

export function MessageIndicator({children, active}: MessageIndicatorProps) {
  usePerformanceBenchmark('MessageIndicator');
  const indicatorMarkup = active && <div className={styles.MessageIndicator} />;

  return (
    <div className={styles.MessageIndicatorWrapper}>
      {indicatorMarkup}
      {children}
    </div>
  );
}
