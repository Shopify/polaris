import React from 'react';

import type {HeadingTagName} from '../../types';
import {usePerformanceBenchmark} from '../../utilities/use-performance-benchmark';

import styles from './Subheading.scss';

export interface SubheadingProps {
  /**
   * The element name to use for the subheading
   * @default 'h3'
   */
  element?: HeadingTagName;
  /** Text to display in subheading */
  children?: React.ReactNode;
}

export function Subheading({
  element: Element = 'h3',
  children,
}: SubheadingProps) {
  usePerformanceBenchmark('Subheading');
  const ariaLabel = typeof children === 'string' ? children : undefined;
  return (
    <Element aria-label={ariaLabel} className={styles.Subheading}>
      {children}
    </Element>
  );
}
