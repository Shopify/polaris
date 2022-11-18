import React from 'react';
import type {
  BreakpointsAlias,
  SpacingSpaceScale,
} from '@shopify/polaris-tokens';

import styles from './Tiles.scss';

type Columns = {
  [Breakpoint in BreakpointsAlias]?: number | string;
};

type Gap = {
  [Breakpoint in BreakpointsAlias]?: SpacingSpaceScale;
};

export interface TilesProps {
  children?: React.ReactNode;
  /** The number of columns to display
   * @default {xs: 6, sm: 6, md: 6, lg: 6, xl: 6}
   */
  columns?: Columns;
  /** The spacing between children. Accepts an object of spacing tokens for different screen sizes.
   * @default {xs: 4, sm: 4, md: 4, lg: 4, xl: 4}
   * @example gap={{xs: '1', sm: '2', md: '3', lg: '4', xl: '5'}}
   */
  gap?: Gap;
}

export const Tiles = ({children, columns, gap}: TilesProps) => {
  const style = {
    '--pc-tile-gap-xs': gap?.xs ? `var(--p-space-${gap?.xs})` : undefined,
    '--pc-tile-gap-sm': gap?.sm ? `var(--p-space-${gap?.sm})` : undefined,
    '--pc-tile-gap-md': gap?.md ? `var(--p-space-${gap?.md})` : undefined,
    '--pc-tile-gap-lg': gap?.lg ? `var(--p-space-${gap?.lg})` : undefined,
    '--pc-tile-gap-xl': gap?.xl ? `var(--p-space-${gap?.xl})` : undefined,
    '--pc-tile-xs': formatColumns(columns?.xs),
    '--pc-tile-sm': formatColumns(columns?.sm),
    '--pc-tile-md': formatColumns(columns?.md),
    '--pc-tile-lg': formatColumns(columns?.lg),
    '--pc-tile-xl': formatColumns(columns?.xl),
  } as React.CSSProperties;

  return (
    <div className={styles.Tiles} style={style}>
      {children}
    </div>
  );
};

function formatColumns(columns?: number | string) {
  if (!columns) return undefined;

  return typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns;
}
