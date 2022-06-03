import React from 'react';

import {classNames} from '../../../../utilities/css';
import styles from '../../Grid.scss';

interface Columns {
  /** Number of columns the section should span on extra small screens */
  xs?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Number of columns the section should span on small screens */
  sm?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Number of columns the section should span on medium screens */
  md?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Number of columns the section should span on large screens */
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** Number of columns the section should span on extra large screens */
  xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export interface CellProps {
  area?: string;
  columnSpan?: Columns;
  children?: React.ReactNode;
}

export function Cell({area: gridArea, columnSpan, children}: CellProps) {
  const className = classNames(
    styles.Cell,
    columnSpan?.xs && styles[`grid-${columnSpan?.xs}-column-xs`],
    columnSpan?.sm && styles[`grid-${columnSpan?.sm}-column-sm`],
    columnSpan?.md && styles[`grid-${columnSpan?.md}-column-md`],
    columnSpan?.lg && styles[`grid-${columnSpan?.lg}-column-lg`],
    columnSpan?.xl && styles[`grid-${columnSpan?.xl}-column-xl`],
  );

  return (
    <div className={className} style={{gridArea}}>
      {children}
    </div>
  );
}
