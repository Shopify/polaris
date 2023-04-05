import React from 'react';

import styles from '../../Card.module.scss';

export interface CardSubsectionProps {
  children?: React.ReactNode;
}

/** @deprecated Use LegacyCard or AlphaCard instead. */
export function Subsection({children}: CardSubsectionProps) {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn(
      'Deprecation: <Card /> is deprecated. This component will be removed in a future major version of Polaris. Use <LegacyCard /> or <AlphaCard /> instead.',
    );
  }

  return <div className={styles.Subsection}>{children}</div>;
}
