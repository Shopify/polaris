import type {ReactNode} from 'react';

import {classNames} from '../../../../utilities/css';
import styles from '../../Layout.scss';

export interface SectionProps {
  children?: ReactNode;
  secondary?: boolean;
  fullWidth?: boolean;
  oneHalf?: boolean;
  oneThird?: boolean;
}

export function Section({
  children,
  secondary,
  fullWidth,
  oneHalf,
  oneThird,
}: SectionProps) {
  const className = classNames(
    styles.Section,
    secondary && styles['Section-secondary'],
    fullWidth && styles['Section-fullWidth'],
    oneHalf && styles['Section-oneHalf'],
    oneThird && styles['Section-oneThird'],
  );

  return <div className={className}>{children}</div>;
}
