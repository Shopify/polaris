import React from 'react';
import type {spacing} from '@shopify/polaris-tokens';

import styles from './Tile.scss';

type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type SpacingTokenName = keyof typeof spacing;

// TODO: Bring this logic into tokens
type SpacingScale = SpacingTokenName extends `space-${infer Scale}`
  ? Scale
  : never;

type Columns = {
  [Breakpoint in Breakpoints]?: number | string;
};

type Gap = {
  [Breakpoint in Breakpoints]?: SpacingScale;
};

export interface TileProps {
  /** Elements to display inside tile */
  children: React.ReactNode;
  /** Adjust spacing between elements */
  gap?: Gap;
  /** Adjust number of columns */
  columns: Columns;
}

export const Tile = ({children, gap, columns}: TileProps) => {
  const style = {
    '--pc-tile-gap-xs': gap?.xs ? `var(--p-space-${gap?.xs})` : undefined,
    '--pc-tile-gap-sm': gap?.sm ? `var(--p-space-${gap?.sm})` : undefined,
    '--pc-tile-gap-md': gap?.md ? `var(--p-space-${gap?.md})` : undefined,
    '--pc-tile-gap-lg': gap?.lg ? `var(--p-space-${gap?.lg})` : undefined,
    '--pc-tile-gap-xl': gap?.xl ? `var(--p-space-${gap?.xl})` : undefined,
    '--pc-tile-xs': formatColumns(columns.xs),
    '--pc-tile-sm': formatColumns(columns.sm),
    '--pc-tile-md': formatColumns(columns.md),
    '--pc-tile-lg': formatColumns(columns.lg),
    '--pc-tile-xl': formatColumns(columns.xl),
  } as React.CSSProperties;

  return (
    <div className={styles.Tile} style={style}>
      {children}
    </div>
  );
};

function formatColumns(columns?: number | string) {
  if (!columns) return undefined;

  return typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns;
}
