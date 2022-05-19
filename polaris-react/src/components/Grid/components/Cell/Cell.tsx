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
  area?: string;
  column?: string;
  row?: string;
  columnSpan?: Columns;
  children?: React.ReactNode;
}

export function Cell({area, row, column, columnSpan, children}: ColumnProps) {
  const className = classNames(
    styles.Cell,
    columnSpan?.xs && styles[`grid-${columnSpan?.xs}-column-xs`],
    columnSpan?.sm && styles[`grid-${columnSpan?.sm}-column-sm`],
    columnSpan?.md && styles[`grid-${columnSpan?.md}-column-md`],
    columnSpan?.lg && styles[`grid-${columnSpan?.lg}-column-lg`],
    columnSpan?.xl && styles[`grid-${columnSpan?.xl}-column-xl`],
  );

  const style = {
    ...(area ? {gridArea: area} : {}),
    ...(row ? {gridRow: row} : {}),
    ...(column ? {gridColumn: column} : {}),
  };

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
