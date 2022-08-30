import React from 'react';

import styles from './Columns.scss';

type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type Columns = {
  [Breakpoint in Breakpoints]?: number;
};

type Gap = {
  [Breakpoint in Breakpoints]?: string;
};

type Templates = {
  [Breakpoint in Breakpoints]?: string;
};

interface NonMutuallyExclusiveProps {
  gap?: Gap;
  children?: React.ReactNode;
}

export type ColumnsProps = NonMutuallyExclusiveProps &
  (
    | {columns?: Columns; templates?: undefined}
    | {templates?: Templates; columns?: undefined}
  );

export function Columns({columns, templates, children, gap}: ColumnsProps) {
  const style = {
    '--pc-columns-xs': columns?.xs,
    '--pc-columns-sm': columns?.sm,
    '--pc-columns-md': columns?.md,
    '--pc-columns-lg': columns?.lg,
    '--pc-columns-xl': columns?.xl,
    '--pc-columns-gap-xs': gap?.xs,
    '--pc-columns-gap-sm': gap?.sm,
    '--pc-columns-gap-md': gap?.md,
    '--pc-columns-gap-lg': gap?.lg,
    '--pc-columns-gap-xl': gap?.xl,
    '--pc-columns-templates-xs': templates?.xs,
    '--pc-columns-templates-sm': templates?.sm,
    '--pc-columns-templates-md': templates?.md,
    '--pc-columns-templates-lg': templates?.lg,
    '--pc-columns-templates-xl': templates?.xl,
  } as React.CSSProperties;

  return (
    <div className={styles.Columns} style={style}>
      {children}
    </div>
  );
}
