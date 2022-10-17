import React, {PropsWithChildren} from 'react';
import type {
  BreakpointsAlias,
  SpacingSpaceScale,
} from '@shopify/polaris-tokens';

import {sanitizeCustomProperties} from '../../utilities/css';

import styles from './Columns.scss';

type Columns = {
  [Breakpoint in BreakpointsAlias]?: number | string;
};

type Spacing = {
  [Breakpoint in BreakpointsAlias]?: SpacingSpaceScale;
};

export interface ColumnsProps extends PropsWithChildren {
  /** The space between columns */
  spacing?: Spacing;
  /** The number of columns to display
   * @default {xs: 6, sm: 6, md: 6, lg: 6, xl: 6}
   */
  columns?: Columns;
}

export function Columns({columns, children, spacing}: ColumnsProps) {
  const style = {
    '--pc-columns-xs': formatColumns(columns?.xs || 6),
    '--pc-columns-sm': formatColumns(columns?.sm),
    '--pc-columns-md': formatColumns(columns?.md),
    '--pc-columns-lg': formatColumns(columns?.lg),
    '--pc-columns-xl': formatColumns(columns?.xl),
    '--pc-columns-space-xs': spacing?.xs
      ? `var(--p-space-${spacing?.xs})`
      : undefined,
    '--pc-columns-space-sm': spacing?.sm
      ? `var(--p-space-${spacing?.sm})`
      : undefined,
    '--pc-columns-space-md': spacing?.md
      ? `var(--p-space-${spacing?.md})`
      : undefined,
    '--pc-columns-space-lg': spacing?.lg
      ? `var(--p-space-${spacing?.lg})`
      : undefined,
    '--pc-columns-space-xl': spacing?.xl
      ? `var(--p-space-${spacing?.xl})`
      : undefined,
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
