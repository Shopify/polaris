import React from 'react';

import type {HeadingTagName} from '../../types';

import styles from './Heading.scss';

export interface HeadingProps {
  /**
   * The element name to use for the heading
   * @default 'h2'
   */
  element?: HeadingTagName;
  /** The content to display inside the heading */
  children?: React.ReactNode;
}

export function Heading({element: Element = 'h2', children}: HeadingProps) {
  return <Element className={styles.Heading}>{children}</Element>;
}
