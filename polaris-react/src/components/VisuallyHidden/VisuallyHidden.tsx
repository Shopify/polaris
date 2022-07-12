import React from 'react';

import styles from './VisuallyHidden.scss';

export interface VisuallyHiddenProps {
  /** The content to be hidden visually */
  children?: React.ReactNode;
}

/**
 * @deprecated The VisuallyHidden component will be removed in the next
 * major version. Use the Text componant instead. See the
 * Polaris componant guide on how to use Text.
 *
 * https://polaris.shopify.com/components/text
 */
export function VisuallyHidden({children}: VisuallyHiddenProps) {
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      'Deprecation: The  VisuallyHidden` component has been deprecated. Use the `Text` componant instead. See the Polaris componant guide on how to use `Text`. https://polaris.shopify.com/components/text',
    );
  }

  return <span className={styles.VisuallyHidden}>{children}</span>;
}
