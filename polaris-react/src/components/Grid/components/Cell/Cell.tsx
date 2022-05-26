import React, {useContext} from 'react';

import {classNames} from '../../../../utilities/css';
import {GridContext} from '../../context';
import type {Breakpoints} from '../../Grid';
import styles from '../../Grid.scss';

interface Columns {
  /** Number of columns the cell should span on extra small screens */
  xs?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Number of columns the cell should span on small screens */
  sm?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Number of columns the cell should span on medium screens */
  md?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Number of columns the cell should span on large screens */
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** Number of columns the cell should span on extra large screens */
  xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

type Column = {
  [Breakpoint in Breakpoints]?: string;
};

type Row = {
  [Breakpoint in Breakpoints]?: string;
};
export interface CellProps {
  area?: string;
  column?: Column;
  columnSpan?: Columns;
  row?: Row;
  children?: React.ReactNode;
}

export function Cell({
  area: gridArea,
  columnSpan,
  column,
  row,
  children,
}: CellProps) {
  const size = useContext(GridContext);
  const className = classNames(
    styles.Cell,
    columnSpan?.xs && styles[`grid-${columnSpan?.xs}-column-xs`],
    columnSpan?.sm && styles[`grid-${columnSpan?.sm}-column-sm`],
    columnSpan?.md && styles[`grid-${columnSpan?.md}-column-md`],
    columnSpan?.lg && styles[`grid-${columnSpan?.lg}-column-lg`],
    columnSpan?.xl && styles[`grid-${columnSpan?.xl}-column-xl`],
  );

  const style = {
    gridArea,
    ...(column ? {gridColumn: column[size]} : {}),
    ...(row ? {gridRow: row[size]} : {}),
  };

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
