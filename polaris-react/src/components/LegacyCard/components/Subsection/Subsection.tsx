import React from 'react';

import styles from '../../LegacyCard.module.css';

export interface LegacyCardSubsectionProps {
  children?: React.ReactNode;
}

export function Subsection({children}: LegacyCardSubsectionProps) {
  return <div className={styles.Subsection}>{children}</div>;
}
