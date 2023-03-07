import React, {useEffect} from 'react';

// eslint-disable-next-line import/no-deprecated
import {Cell} from './components';
import styles from './Grid.scss';

type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type Areas = {
  [Breakpoint in Breakpoints]?: string[];
};

type Columns = {
  [Breakpoint in Breakpoints]?: number;
};

type Gap = {
  [Breakpoint in Breakpoints]?: string;
};

export interface GridProps {
  /* Set grid-template-areas */
  areas?: Areas;
  /* Number of columns */
  columns?: Columns;
  /* Grid gap */
  gap?: Gap;
  children?: React.ReactNode;
}
/** @deprecated Use `Columns` instead or a combination of layout primitives (`Columns`, `Inline`, and `Stack`) */
export const Grid: React.FunctionComponent<GridProps> & {
  // eslint-disable-next-line import/no-deprecated
  Cell: typeof Cell;
} = function Grid({gap, areas, children, columns}: GridProps) {
  const style = {
    '--pc-grid-gap-xs': gap?.xs,
    '--pc-grid-gap-sm': gap?.sm,
    '--pc-grid-gap-md': gap?.md,
    '--pc-grid-gap-lg': gap?.lg,
    '--pc-grid-gap-xl': gap?.xl,
    '--pc-grid-columns-xs': columns?.xs,
    '--pc-grid-columns-sm': columns?.sm,
    '--pc-grid-columns-md': columns?.md,
    '--pc-grid-columns-lg': columns?.lg,
    '--pc-grid-columns-xl': columns?.xl,
    '--pc-grid-areas-xs': formatAreas(areas?.xs),
    '--pc-grid-areas-sm': formatAreas(areas?.sm),
    '--pc-grid-areas-md': formatAreas(areas?.md),
    '--pc-grid-areas-lg': formatAreas(areas?.lg),
    '--pc-grid-areas-xl': formatAreas(areas?.xl),
  } as React.CSSProperties;

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(
        'Deprecation: <Grid /> is deprecated. This component will be removed in a future major version of Polaris. Use <Columns /> instead or a combination of <Columns />, <Inline />, and <Stack />',
      );
    }
  }, []);

  return (
    <div className={styles.Grid} style={style}>
      {children}
    </div>
  );
};

export function formatAreas(areas?: string[]) {
  if (!areas) return;
  return `'${areas?.join(`' '`)}'`;
}

// eslint-disable-next-line import/no-deprecated
Grid.Cell = Cell;
