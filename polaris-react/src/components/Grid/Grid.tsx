import React from 'react';

import { Cell } from './components';
import styles from './Grid.scss';

import {
  ResponsiveValue,
  ResponsiveProp,
  getResponsiveValue,
  sanitizeCustomProperties,
} from '../../utilities/css';

type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ColumnsType = number | string;

type Areas = {
  [Breakpoint in Breakpoints]?: string[];
};

type Columns = ResponsiveProp<ColumnsType>;

type Gap = {
  [Breakpoint in Breakpoints]?: string;
};

export interface GridProps {
  /**
   * Set grid-template-areas
   * @deprecated Use nested layout components instead
   */
  areas?: Areas;
  /** The number of columns to display. Accepts either a single value or an object of values for different screen sizes.
   * @example
   * columns={6}
   * columns={{xs: 1, sm: 1, md: 3, lg: 6, xl: 6}}
   */
  columns?: Columns;
  /* Grid gap */
  gap?: Gap;
  children?: React.ReactNode;
}
export const Grid: React.FunctionComponent<GridProps> & {
  Cell: typeof Cell;
} = function Grid({ gap, areas, children, columns }: GridProps) {
  const style = {
    ...getResponsiveValue('grid', 'columns', formatColumns(columns)),
    '--pc-grid-gap-xs': gap?.xs,
    '--pc-grid-gap-sm': gap?.sm,
    '--pc-grid-gap-md': gap?.md,
    '--pc-grid-gap-lg': gap?.lg,
    '--pc-grid-gap-xl': gap?.xl,
    // '--pc-grid-columns-xs': columns?.xs,
    // '--pc-grid-columns-sm': columns?.sm,
    // '--pc-grid-columns-md': columns?.md,
    // '--pc-grid-columns-lg': columns?.lg,
    // '--pc-grid-columns-xl': columns?.xl,
    '--pc-grid-areas-xs': formatAreas(areas?.xs),
    '--pc-grid-areas-sm': formatAreas(areas?.sm),
    '--pc-grid-areas-md': formatAreas(areas?.md),
    '--pc-grid-areas-lg': formatAreas(areas?.lg),
    '--pc-grid-areas-xl': formatAreas(areas?.xl),
  } as React.CSSProperties;

  return (
    <div className={styles.Grid} style={sanitizeCustomProperties(style)}>
      {children}
    </div>
  );
};

function formatColumns(columns?: Columns): ResponsiveValue {
  if (typeof columns === 'object' && columns !== null) {
    return Object.fromEntries(
      Object.entries(columns).map(([breakpointAlias, breakpointGrid]) => [
        breakpointAlias,
        getColumnValue(breakpointGrid),
      ]),
    );
  }
  return getColumnValue(columns);
}

function getColumnValue(columns?: ColumnsType) {
  if (!columns) return undefined;

  if (typeof columns === 'number' || !isNaN(Number(columns))) {
    return `repeat(${Number(columns)}, minmax(0, 1fr))`;
  }

  return columns;
}

export function formatAreas(areas?: string[]) {
  if (!areas) return;
  return `'${areas?.join(`' '`)}'`;
}

Grid.Cell = Cell;
