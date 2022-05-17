import React, {useState, useMemo} from 'react';
import {tokens} from '../../tokens';

import type breakpoints from '../../tokens/token-groups/breakpoints.json';
import {debounce} from '../../utilities/debounce';
import {EventListener} from '../EventListener';

import {Column} from './components';
import styles from './Grid.scss';

type Breakpoints =
  keyof typeof breakpoints extends `breakpoints-${infer Breakpoint}`
    ? Breakpoint
    : never;

type Columns = {
  [Breakpoint in Breakpoints]: number;
};

type Areas = {
  [Breakpoint in Breakpoints]: string[];
};

type Gap = {
  [Breakpoint in Breakpoints]: string;
};

export interface GridProps {
  /* Grid gap */
  gap?: Gap;
  /* Set grid-template-areas */
  areas?: Areas;
  /* Must be less than 12 to work with the grid system */
  columns?: Columns;
  children?: React.ReactNode;
}

export const Grid: React.FunctionComponent<GridProps> & {
  Column: typeof Column;
} = function Grid({
  gap = {
    xs: 'var(--p-space-4)',
    sm: 'var(--p-space-4)',
    md: 'var(--p-space-4)',
    lg: 'var(--p-space-4)',
    xl: 'var(--p-space-4)',
  },
  areas,
  children,
  columns = {xs: 2, sm: 4, md: 6, lg: 12, xl: 12},
}: GridProps) {
  const [gridTemplateAreas, setGridTemplateAreas] = useState(getAreas(areas));
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
    gridTemplateAreas,
  };

  const handleResize = useMemo(
    () =>
      debounce(() => {
        setGridTemplateAreas(getAreas(areas));
      }, 50),
    [areas],
  );

  return (
    <div className={styles.Grid} style={style}>
      {children}
      <EventListener event="resize" handler={handleResize} />
    </div>
  );
};

function getAreas(areas?: Areas) {
  if (areas === undefined) return;

  const xl = window.matchMedia(
    `(min-width: ${tokens.breakpoints['breakpoints-xl']})`,
  ).matches;

  const lg = window.matchMedia(
    `(min-width: ${tokens.breakpoints['breakpoints-lg']})`,
  ).matches;

  const md = window.matchMedia(
    `(min-width: ${tokens.breakpoints['breakpoints-md']})`,
  ).matches;

  const sm = window.matchMedia(
    `(min-width: ${tokens.breakpoints['breakpoints-sm']})`,
  ).matches;

  switch (true) {
    case xl:
      return formatAreas(areas.xl);

    case lg:
      return formatAreas(areas.lg);

    case md:
      return formatAreas(areas.md);

    case sm:
      return formatAreas(areas.sm);

    default:
      return formatAreas(areas.xs);
  }
}

export function formatAreas(areas: string[]) {
  return `'${areas.join(`' '`)}'`;
}

Grid.Column = Column;
