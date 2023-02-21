import React from 'react';
import type {
  BreakpointsAlias,
  SpacingSpaceScale,
} from '@shopify/polaris-tokens';

import {
  getResponsiveProps,
  getResponsiveValue,
  sanitizeCustomProperties,
  ResponsiveValue,
} from '../../utilities/css';
import type {ResponsiveProp} from '../../utilities/css';

import styles from './Columns.scss';

type ColumnWidths = 'oneThird' | 'oneHalf' | 'twoThirds';
type ColumnTypes = number | string | ColumnWidths[];

type Columns =
  | ColumnTypes
  | {
      [Breakpoint in BreakpointsAlias]?: ColumnTypes;
    };

type Gap = ResponsiveProp<SpacingSpaceScale>;

export interface ColumnsProps {
  children?: React.ReactNode;
  /** The number of columns to display. Accepts either a single value or an object of values for different screen sizes.
   * @default {xs: 6, sm: 6, md: 6, lg: 6, xl: 6}
   * @example
   * columns={6}
   * columns={{xs: 1, sm: 1, md: 3, lg: 6, xl: 6}}
   */
  columns?: Columns;
  /** The spacing between children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @default '4'
   * @example
   * gap='2'
   * gap={{xs: '1', sm: '2', md: '3', lg: '4', xl: '5'}}
   */
  gap?: Gap;
}

export function Columns({children, columns, gap = '4'}: ColumnsProps) {
  const style = {
    ...getResponsiveValue(
      'columns',
      'grid-template-columns',
      formatColumns(columns),
    ),
    ...getResponsiveProps('columns', 'gap', 'space', gap),
  } as React.CSSProperties;

  return (
    <div className={styles.Columns} style={sanitizeCustomProperties(style)}>
      {children}
    </div>
  );
}

function formatColumns(columns?: Columns): ResponsiveValue {
  if (
    typeof columns === 'object' &&
    columns !== null &&
    !Array.isArray(columns)
  ) {
    return Object.fromEntries(
      Object.entries(columns).map(([breakpointAlias, breakpointColumns]) => [
        breakpointAlias,
        getColumnValue(breakpointColumns),
      ]),
    );
  }

  return getColumnValue(columns);
}

function getColumnValue(columns?: ColumnTypes) {
  if (!columns) return undefined;

  if (typeof columns === 'string') return columns;

  if (typeof columns === 'number') {
    return `repeat(${columns}, minmax(0, 1fr))`;
  }

  return columns
    .map((column) => {
      switch (column) {
        case 'oneThird':
        case 'oneHalf':
          return 'minmax(0, 1fr)';
        case 'twoThirds':
          return 'minmax(0, 2fr)';
        default:
          return column;
      }
    })
    .join(' ');
}
