import React from 'react';

import {classNames} from '../../../../utilities/css';

import styles from './Cell.scss';

type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type Cell = {
  [Breakpoint in Breakpoints]?: string;
};

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
  column?: Cell;
  columnSpan?: Columns;
  row?: Cell;
  children?: React.ReactNode;
}

export function Cell({
  area: gridArea,
  column,
  columnSpan,
  row,
  children,
}: CellProps) {
  const className = classNames(
    styles.Cell,
    columnSpan?.xs && styles[`Cell-${columnSpan.xs}-column-xs`],
    columnSpan?.sm && styles[`Cell-${columnSpan.sm}-column-sm`],
    columnSpan?.md && styles[`Cell-${columnSpan.md}-column-md`],
    columnSpan?.lg && styles[`Cell-${columnSpan.lg}-column-lg`],
    columnSpan?.xl && styles[`Cell-${columnSpan.xl}-column-xl`],
  );

  const style = {
    gridArea,
    '--pc-column-xs': column?.xs,
    '--pc-column-sm': column?.sm,
    '--pc-column-md': column?.md,
    '--pc-column-lg': column?.lg,
    '--pc-column-xl': column?.xl,
    '--pc-row-xs': row?.xs,
    '--pc-row-sm': row?.sm,
    '--pc-row-md': row?.md,
    '--pc-row-lg': row?.lg,
    '--pc-row-xl': row?.xl,
  };

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
