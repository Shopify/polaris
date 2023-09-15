import React from 'react';

import {classNames, getResponsiveValue} from '../../../../utilities/css';
import type {ResponsiveProp} from '../../../../utilities/css';

import styles from './Cell.scss';

type Cell = ResponsiveProp;

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
  /**
   * Set grid-template-areas
   * @deprecated To avoid a11y issues, nest layout components in individual grid
   * cells instead. See:
   * https://polaris.shopify.com/components/layout-and-structure
   */
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
    ...getResponsiveValue('grid-cell', 'column', column),
    ...getResponsiveValue('grid-cell', 'row', row),
  };

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
