import React from 'react';

import styles from './VisuallyHidden.scss';

export interface VisuallyHiddenProps {
  /** The content to be hidden visually */
  children?: React.ReactNode;
}

/**
 * @deprecated The VisuallyHidden component will be removed in the next
 * major version. Use the Text component instead. See the
 * Polaris component guide on how to use Text.
 *
 * https://polaris.shopify.com/components/text
 */
export function VisuallyHidden({children}: VisuallyHiddenProps) {
  return <span className={styles.VisuallyHidden}>{children}</span>;
}
