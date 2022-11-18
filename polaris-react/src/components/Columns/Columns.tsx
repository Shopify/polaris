import React from 'react';
import type {
  BreakpointsAlias,
  SpacingSpaceScale,
} from '@shopify/polaris-tokens';

import {
  getResponsiveProps,
  sanitizeCustomProperties,
} from '../../utilities/css';
import type {ResponsiveProp} from '../../utilities/css';

import styles from './Columns.scss';

type Columns = {
  [Breakpoint in BreakpointsAlias]?: number | string;
};

type Gap = ResponsiveProp<SpacingSpaceScale>;

export interface ColumnsProps {
  /** Elements to display inside columns */
  children?: React.ReactNode;
  /** The number of columns to display
   * @default {xs: 6, sm: 6, md: 6, lg: 6, xl: 6}
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
    '--pc-columns-xs': formatColumns(columns?.xs || 6),
    '--pc-columns-sm': formatColumns(columns?.sm),
    '--pc-columns-md': formatColumns(columns?.md),
    '--pc-columns-lg': formatColumns(columns?.lg),
    '--pc-columns-xl': formatColumns(columns?.xl),
    ...getResponsiveProps('columns', 'gap', 'space', gap),
  } as React.CSSProperties;

  return (
    <div className={styles.Columns} style={sanitizeCustomProperties(style)}>
      {children}
    </div>
  );
}

function formatColumns(columns?: number | string) {
  if (!columns) return undefined;

  return typeof columns === 'number'
    ? `repeat(${columns}, minmax(0, 1fr))`
    : columns;
}
