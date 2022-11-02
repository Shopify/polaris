import React from 'react';

import styles from './Caption.scss';

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
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn(
      'Deprecation: The `Caption` component has been deprecated. Use the `Text` component instead. See the Polaris component guide on how to use `Text`. https://polaris.shopify.com/components/text',
    );
  }

  return <p className={styles.Caption}>{children}</p>;
}
