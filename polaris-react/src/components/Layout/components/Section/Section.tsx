import React from 'react';

import {classNames} from '../../../../utilities/css';
import styles from '../../Layout.module.css';

export interface SectionProps {
  children?: React.ReactNode;
  variant?: 'oneHalf' | 'oneThird' | 'fullWidth';
}

export function Section({children, variant}: SectionProps) {
  const className = classNames(styles.Section, styles[`Section-${variant}`]);

  return <div className={className}>{children}</div>;
}
