import React from 'react';
import type {spacing} from '@shopify/polaris-tokens';

import styles from './Columns.scss';

type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type SpacingTokenName = keyof typeof spacing;

type SpacingTokenScale = SpacingTokenName extends `space-${infer Scale}`
  ? Scale
  : never;

type Columns = {
  [Breakpoint in Breakpoints]?: number | string;
};

type Gap = {
  [Breakpoint in Breakpoints]?: SpacingTokenScale;
};

export interface ColumnsProps {
  gap?: Gap;
  columns?: Columns;
  children?: React.ReactNode;
}

export function Columns({columns, children, gap}: ColumnsProps) {
  const style = {
    '--pc-columns-xs': formatColumns(columns?.xs),
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
    <div className={styles.Columns} style={style}>
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
