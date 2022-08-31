import React from 'react';

import styles from './Columns.scss';

type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type Columns = {
  [Breakpoint in Breakpoints]?: number | string;
};

type Gap = {
  [Breakpoint in Breakpoints]?: string;
};

interface ColumnsProps {
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
    '--pc-columns-gap-xs': gap?.xs,
    '--pc-columns-gap-sm': gap?.sm,
    '--pc-columns-gap-md': gap?.md,
    '--pc-columns-gap-lg': gap?.lg,
    '--pc-columns-gap-xl': gap?.xl,
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
