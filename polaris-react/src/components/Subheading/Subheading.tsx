import React from 'react';

import type {HeadingTagName} from '../../types';

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
/**
 * @deprecated The Subheading component will be removed in the next
 * major version. Use the Text componant instead. See the
 * Polaris componant guide on how to use Text.
 *
 * https://polaris.shopify.com/components/text
 */
export function Subheading({
  element: Element = 'h3',
  children,
}: SubheadingProps) {
  const ariaLabel = typeof children === 'string' ? children : undefined;

  if (process.env.NODE_ENV === 'development') {
    console.warn(
      'Deprecation: The `Subheading` component has been deprecated. Use the `Text` componant instead. See the Polaris componant guide on how to use `Text`. https://polaris.shopify.com/components/text',
    );
  }

  return (
    <Element aria-label={ariaLabel} className={styles.Subheading}>
      {children}
    </Element>
  );
}
