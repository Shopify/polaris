import React from 'react';

import styles from './Caption.module.scss';

export interface CaptionProps {
  /** The content to use as a graph label or timestamp */
  children?: React.ReactNode;
}

/**
 * @deprecated The Caption component will be removed in the next
 * major version. Use the Text component instead. See the
 * Polaris component guide on how to use Text.
 *
 * https://polaris.shopify.com/components/text
 */
export function Caption({children}: CaptionProps) {
  return <p className={styles.Caption}>{children}</p>;
}
