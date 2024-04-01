import React from 'react';

import {classNames} from '../../utilities/css';

import styles from './Indicator.module.css';

export interface IndicatorProps {
  pulse?: boolean;
}

export function Indicator({pulse = true}: IndicatorProps) {
  const className = classNames(
    styles.Indicator,
    pulse && styles.pulseIndicator,
  );

  return <span className={className} />;
}
