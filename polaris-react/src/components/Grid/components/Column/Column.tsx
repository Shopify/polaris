import React from 'react';

import {classNames} from '../../../../utilities/css';
import styles from '../../Grid.scss';

interface Columns {
  /** Number of columns the section should span on extra small screens */
  xs?: 1 | 2;
  /** Number of columns the section should span on small screens */
  sm?: 1 | 2 | 3 | 4;
  /** Number of columns the section should span on medium screens */
  md?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Number of columns the section should span on large screens */
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** Number of columns the section should span on extra large screens */
  xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export interface ColumnProps {
  columns?: Columns;
  area?: string;
  children?: React.ReactNode;
}

export function Column({area: gridArea, children, columns}: ColumnProps) {
  const className = classNames(
    styles.Column,
    columns?.xs && styles[`grid-${columns?.xs}-column-xs`],
    columns?.sm && styles[`grid-${columns?.sm}-column-sm`],
    columns?.md && styles[`grid-${columns?.md}-column-md`],
    columns?.lg && styles[`grid-${columns?.lg}-column-lg`],
    columns?.xl && styles[`grid-${columns?.xl}-column-xl`],
  );
  return (
    <div className={className} style={{gridArea}}>
      {children}
    </div>
  );
}
