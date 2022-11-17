import React from 'react';
import type {
  BreakpointsAlias,
  SpacingSpaceScale,
} from '@shopify/polaris-tokens';

import {sanitizeCustomProperties} from '../../utilities/css';

import styles from './Columns.scss';

type Columns = {
  [Breakpoint in BreakpointsAlias]?: number | string;
};

type Gap = {
  [Breakpoint in BreakpointsAlias]?: SpacingSpaceScale;
};

export interface ColumnsProps {
  /** The spacing between columns
   * @default '4'
   */
  gap?: Gap;
  /** The number of columns to display
   * @default {xs: 6, sm: 6, md: 6, lg: 6, xl: 6}
   */
  columns?: Columns;
  /** Elements to display inside columns */
  children?: React.ReactNode;
}

export function Columns({columns, children, gap}: ColumnsProps) {
  const style = {
    '--pc-columns-xs': formatColumns(columns?.xs || 6),
    '--pc-columns-sm': formatColumns(columns?.sm),
    '--pc-columns-md': formatColumns(columns?.md),
    '--pc-columns-lg': formatColumns(columns?.lg),
    '--pc-columns-xl': formatColumns(columns?.xl),
    '--pc-columns-gap-xs': gap?.xs ? `var(--p-space-${gap?.xs})` : undefined,
    '--pc-columns-gap-sm': gap?.sm ? `var(--p-space-${gap?.sm})` : undefined,
    '--pc-columns-gap-md': gap?.md ? `var(--p-space-${gap?.md})` : undefined,
    '--pc-columns-gap-lg': gap?.lg ? `var(--p-space-${gap?.lg})` : undefined,
    '--pc-columns-gap-xl': gap?.xl ? `var(--p-space-${gap?.xl})` : undefined,
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
