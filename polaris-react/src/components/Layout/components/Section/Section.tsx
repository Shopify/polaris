import React from 'react';

import {classNames} from '../../../../utilities/css';
import styles from '../../Layout.scss';

interface Columns {
  /** Number of columns the section should span on small screens */
  small: 1 | 2 | 3 | 4;
  /** Number of columns the section should span on large screens */
  large: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export interface SectionProps {
  /** Spans the full width of the grid */
  fullWidth?: boolean;
  /** Spans one third of the grid, full width on small screens */
  secondary?: boolean;
  /** Spans one half of the grid, full width on small screens */
  oneHalf?: boolean;
  /** Spans one third of the grid, full width on small screens */
  oneThird?: boolean;
  /** Number of columns the section should span. Accepts values for small and large screens */
  columns?: Columns;
  children?: React.ReactNode;
}

export function Section({
  fullWidth,
  secondary,
  oneHalf,
  oneThird,
  columns,
  children,
}: SectionProps) {
  const className = classNames(
    styles.Section,
    fullWidth && styles.fullWidth,
    secondary && styles.secondary,
    oneHalf && styles.oneHalf,
    oneThird && styles.oneThird,
    columns?.small && styles[`grid-${columns?.small}-column`],
    columns?.large && styles[`grid-${columns?.large}-large-column`],
  );

  return <div className={className}>{children}</div>;
}
