import React from 'react';
import type {
  BreakpointsAlias,
  SpacingSpaceScale,
} from '@shopify/polaris-tokens';

import {
  getResponsiveProps,
  sanitizeCustomProperties,
} from '../../utilities/css';

import styles from './Columns.scss';

type ColumnWidths = 'oneThird' | 'oneHalf' | 'twoThirds';
type ColumnTypes = number | string | ColumnWidths[];

type Columns =
  | number
  | ColumnWidths[]
  | {
      [Breakpoint in BreakpointsAlias]?: ColumnTypes;
    };

type Spacing = {
  [Breakpoint in BreakpointsAlias]?: SpacingSpaceScale;
};

export interface ColumnsProps {
  /** The spacing between columns
   * @default '4'
   */
  spacing?: Spacing;
  /** The number of columns to display
   * @default {xs: 6, sm: 6, md: 6, lg: 6, xl: 6}
   */
  columns?: Columns;
  /** Elements to display inside columns */
  children?: React.ReactNode;
}

export function Columns({columns, children, spacing}: ColumnsProps) {
  const style = {
    ...formatColumns(columns),
    ...getResponsiveProps('columns', 'spacing', 'space', spacing || '4'),
  } as React.CSSProperties;

  return (
    <div className={styles.Columns} style={sanitizeCustomProperties(style)}>
      {children}
    </div>
  );
}

function formatColumns(columns?: Columns) {
  if (typeof columns === 'number') {
    return {
      '--pc-columns-xs': `repeat(${columns}, minmax(0, 1fr))`,
    };
  }

  if (typeof columns === 'string') {
    return {'--pc-columns-xs': columns};
  }

  if (typeof columns === 'object' && 'xs' in columns) {
    return {
      '--pc-columns-xs': formatResponsiveColumns(columns?.xs || 6),
      '--pc-columns-sm': formatResponsiveColumns(columns?.sm),
      '--pc-columns-md': formatResponsiveColumns(columns?.md),
      '--pc-columns-lg': formatResponsiveColumns(columns?.lg),
      '--pc-columns-xl': formatResponsiveColumns(columns?.xl),
    };
  }

  if (Array.isArray(columns)) {
    return {
      '--pc-columns-xs': columns.map(getVerboseProperty).join(' '),
    };
  }
}

function formatResponsiveColumns(columns?: ColumnTypes) {
  if (!columns) return undefined;

  if (Array.isArray(columns)) {
    return columns.map(getVerboseProperty).join(' ');
  }

  return typeof columns === 'number'
    ? `repeat(${columns}, minmax(0, 1fr))`
    : columns;
}

function getVerboseProperty(column: string) {
  return column === 'oneThird' || column === 'oneHalf'
    ? 'minmax(0, 1fr)'
    : 'minmax(0, 2fr)';
}
