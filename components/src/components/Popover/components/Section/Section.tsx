import React from 'react';

import styles from '../../Popover.scss';

export interface SectionProps {
  children?: React.ReactNode;
}

export function Section({children}: SectionProps) {
  return <div className={styles.Section}>{children}</div>;
}
