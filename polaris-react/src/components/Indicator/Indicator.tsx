import React from 'react';

import {classNames} from '../../utilities/css';
import {usePerformanceBenchmark} from '../../utilities/use-performance-benchmark';

import styles from './Indicator.scss';

export interface IndicatorProps {
  pulse?: boolean;
}

export function Indicator({pulse = true}: IndicatorProps) {
  usePerformanceBenchmark('Indicator');
  const className = classNames(
    styles.Indicator,
    pulse && styles.pulseIndicator,
  );

  return <span className={className} />;
}
