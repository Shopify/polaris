import React from 'react';
import type {
  BreakpointsAlias,
  SpacingSpaceScale,
} from '@shopify/polaris-tokens';

import styles from './Tiles.scss';

type Columns = {
  [Breakpoint in BreakpointsAlias]?: number | string;
};

type Spacing = {
  [Breakpoint in BreakpointsAlias]?: SpacingSpaceScale;
};

export interface TilesProps {
  /** Elements to display inside tile */
  children: React.ReactNode;
  /** Adjust spacing between elements
   * @default 'var(--p-space-4)'
   */
  spacing?: Spacing;
  /** Adjust number of columns
   * @default {xs: 6, sm: 6, md: 6, lg: 6, xl: 6}
   */
  columns?: Columns;
}

export const Tiles = ({children, spacing, columns}: TilesProps) => {
  const style = {
    '--pc-tiles-xs': formatColumns(columns?.xs),
    '--pc-tiles-sm': formatColumns(columns?.sm),
    '--pc-tiles-md': formatColumns(columns?.md),
    '--pc-tiles-lg': formatColumns(columns?.lg),
    '--pc-tiles-xl': formatColumns(columns?.xl),
    '--pc-tiles-spacing-xs': spacing?.xs
      ? `var(--p-space-${spacing?.xs})`
      : undefined,
    '--pc-tiles-spacing-sm': spacing?.sm
      ? `var(--p-space-${spacing?.sm})`
      : undefined,
    '--pc-tiles-spacing-md': spacing?.md
      ? `var(--p-space-${spacing?.md})`
      : undefined,
    '--pc-tiles-spacing-lg': spacing?.lg
      ? `var(--p-space-${spacing?.lg})`
      : undefined,
    '--pc-tiles-spacing-xl': spacing?.xl
      ? `var(--p-space-${spacing?.xl})`
      : undefined,
  } as React.CSSProperties;

  return (
    <div className={styles.Tiles} style={style}>
      {children}
    </div>
  );
};

function formatColumns(columns?: string | number) {
  if (!columns) return undefined;

  return typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns;
}
