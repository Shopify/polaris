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
  /** A unique identifier for the heading, used for reference in anchor links  */
  id?: string;
}

/**
 * @deprecated The Heading component will be removed in the next
 * major version. Use the Text component instead. See the
 * Polaris component guide on how to use Text.
 *
 * https://polaris.shopify.com/components/text
 */
export function Heading({element: Element = 'h2', children, id}: HeadingProps) {
  return (
    <Element className={styles.Heading} id={id}>
      {children}
    </Element>
  );
}
