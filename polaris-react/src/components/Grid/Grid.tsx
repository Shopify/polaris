import React, {useState, useMemo, useRef} from 'react';

import breakpoints from '../../tokens/token-groups/breakpoints.json';
import {debounce} from '../../utilities/debounce';
import {useEventListener} from '../../utilities/use-event-listener';

import {Cell} from './components';
import {GridContext} from './context';
import styles from './Grid.scss';

export type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '';

type Columns = {
  [Breakpoint in Breakpoints]?: number;
};

type Areas = {
  [Breakpoint in Breakpoints]?: string[];
};

type Gap = {
  [Breakpoint in Breakpoints]?: string;
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

/** **Experimental!** This component is in alpha. Use with caution. */
export const Grid: React.FunctionComponent<GridProps> & {
  Cell: typeof Cell;
} = function Grid({gap, areas, children, columns}: GridProps) {
  const breakpointRef = useRef<Breakpoints>(getMedia());
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
    () => debounce(() => setGridTemplateAreas(getAreas(areas)), 50),
    [areas],
  );

  useEventListener('resize', handleResize);

  return (
    <GridContext.Provider value={breakpointRef.current}>
      <div className={styles.Grid} style={style}>
        {children}
      </div>
    </GridContext.Provider>
  );

  function getAreas(areas?: Areas) {
    if (areas === undefined) return;

    const breakpoint = getMedia();
    breakpointRef.current = breakpoint;
    return formatAreas(areas[breakpoint]);
  }
};

export function formatAreas(areas?: string[]) {
  return `'${areas?.join(`' '`)}'`;
}

Grid.Cell = Cell;

function getMedia() {
  const xl = window.matchMedia(
    `(min-width: ${breakpoints['breakpoints-xl']})`,
  ).matches;

  const lg = window.matchMedia(
    `(min-width: ${breakpoints['breakpoints-lg']})`,
  ).matches;

  const md = window.matchMedia(
    `(min-width: ${breakpoints['breakpoints-md']})`,
  ).matches;

  const sm = window.matchMedia(
    `(min-width: ${breakpoints['breakpoints-sm']})`,
  ).matches;

  switch (true) {
    case xl:
      return 'xl';

    case lg:
      return 'lg';

    case md:
      return 'md';

    case sm:
      return 'sm';

    default:
      return 'xs';
  }
}
