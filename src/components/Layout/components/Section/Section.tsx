import React from 'react';

import {classNames} from '../../../../utilities/css';
import styles from '../../Layout.scss';

export interface SectionProps {
  children?: React.ReactNode;
  secondary?: boolean;
  fullWidth?: boolean;
  oneHalf?: boolean;
  oneThird?: boolean;
  hideOnPrint?: boolean;
}

export function Section({
  children,
  secondary,
  fullWidth,
  oneHalf,
  oneThird,
  hideOnPrint,
}: SectionProps) {
  const className = classNames(
    styles.Section,
    secondary && styles['Section-secondary'],
    fullWidth && styles['Section-fullWidth'],
    oneHalf && styles['Section-oneHalf'],
    oneThird && styles['Section-oneThird'],
    hideOnPrint && styles['Section-hideOnPrint'],
  );

  return <div className={className}>{children}</div>;
}
