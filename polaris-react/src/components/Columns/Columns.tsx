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

type Spacing = {
  [Breakpoint in BreakpointsAlias]?: SpacingSpaceScale;
};

export interface ColumnsProps {
  spacing?: Spacing;
  columns?: Columns;
  children?: React.ReactNode;
}

export function Columns({columns, children, spacing}: ColumnsProps) {
  const style = {
    '--pc-columns-xs': formatColumns(columns?.xs),
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
