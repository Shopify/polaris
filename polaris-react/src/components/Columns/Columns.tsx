import React from 'react';
import type {SpacingSpaceScale} from '@shopify/polaris-tokens';

import {
  getResponsiveProps,
  getResponsiveValue,
  sanitizeCustomProperties,
  ResponsiveValue,
} from '../../utilities/css';
import type {ResponsiveProp} from '../../utilities/css';

import styles from './Columns.scss';

type ColumnsAlias = 'oneThird' | 'oneHalf' | 'twoThirds';
type ColumnsType = number | string | ColumnsAlias[];
type Columns = ResponsiveProp<ColumnsType>;
type Gap = ResponsiveProp<SpacingSpaceScale>;

export interface ColumnsProps extends React.AriaAttributes {
  children?: React.ReactNode;
  /** The number of columns to display. Accepts either a single value or an object of values for different screen sizes.
   * @example
   * columns={6}
   * columns={{xs: 1, sm: 1, md: 3, lg: 6, xl: 6}}
   */
  columns?: Columns;
  /** The spacing between children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * gap='2'
   * gap={{xs: '1', sm: '2', md: '3', lg: '4', xl: '5'}}
   */
  gap?: Gap;
}

export function Columns({children, columns, gap}: ColumnsProps) {
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

function getColumnValue(columns?: ColumnsType) {
  if (!columns) return undefined;

  if (typeof columns === 'string') return columns;

  if (typeof columns === 'number') {
    return `repeat(${columns}, minmax(0, 1fr))`;
  }

  return columns
    .map((column) => {
      switch (column) {
        case 'oneThird':
          return 'minmax(0, 1fr)';
        case 'oneHalf':
          return 'minmax(0, 1fr)';
        case 'twoThirds':
          return 'minmax(0, 2fr)';
      }
    })
    .join(' ');
}
