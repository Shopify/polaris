import React from 'react';

import {classNames} from '../../../../utilities/css';
import styles from '../../Layout.scss';

export interface SectionProps {
  children?: React.ReactNode;
  /** @deprecated Use `variant === 'oneThird'` instead */
  secondary?: boolean;
  /** @deprecated Use `variant === 'fullWidth'` instead */
  fullWidth?: boolean;
  /** @deprecated Use `variant === 'oneHalf'` instead */
  oneHalf?: boolean;
  /** @deprecated Use `variant === 'oneThird'` instead */
  oneThird?: boolean;
  variant?: 'oneHalf' | 'oneThird' | 'fullWidth';
}

export function Section({
  children,
  secondary,
  fullWidth,
  oneHalf,
  oneThird,
  variant,
}: SectionProps) {
  const className = classNames(
    styles.Section,
    secondary && styles['Section-secondary'],
    (oneHalf || variant === 'oneHalf') && styles['Section-oneHalf'],
    (oneThird || variant === 'oneThird') && styles['Section-oneThird'],
    (fullWidth || variant === 'fullWidth') && styles['Section-fullWidth'],
  );

  return <div className={className}>{children}</div>;
}
