import React from 'react';

import type {HeadingTagName} from '../../types';
import {usePerformanceBenchmark} from '../../utilities/use-performance-benchmark';

import styles from './Heading.scss';

export interface HeadingProps {
  /**
   * The element name to use for the heading
   * @default 'h2'
   */
  element?: HeadingTagName;
  /** The content to display inside the heading */
  children?: React.ReactNode;
  /** A unique identifier for the heading, used for reference in anchor links  */
  id?: string;
}

export function Heading({element: Element = 'h2', children, id}: HeadingProps) {
  usePerformanceBenchmark('Heading');
  return (
    <Element className={styles.Heading} id={id}>
      {children}
    </Element>
  );
}
