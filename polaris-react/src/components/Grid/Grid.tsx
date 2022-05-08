import React, {useState, useMemo} from 'react';

import {tokens} from '../../tokens';
import {debounce} from '../../utilities/debounce';
import {EventListener} from '../EventListener';

import {Column} from './components';
import styles from './Grid.scss';

interface Columns {
  small?: number;
  medium?: number;
  large?: number;
}

interface Areas {
  small: string[];
  medium: string[];
  large: string[];
}

export interface GridProps {
  /* Grid gap */
  gap?: string;
  /* Set grid-template-areas */
  areas?: Areas;
  /* Must be less than 12 to work with the grid system */
  columns?: Columns;
  children?: React.ReactNode;
}

export const Grid: React.FunctionComponent<GridProps> & {
  Column: typeof Column;
} = function Grid({
  gap = 'var(--p-space-4)',
  areas,
  children,
  columns = {small: 2, medium: 4, large: 12},
}: GridProps) {
  const [gridTemplateAreas, setGridTemplateAreas] = useState(getAreas(areas));
  const style = {
    '--pc-grid-columns-small': columns?.small,
    '--pc-grid-columns-medium': columns?.medium,
    '--pc-grid-columns-large': columns?.large,
    gap,
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

  const large = window.matchMedia(
    `(min-width: ${tokens.breakpoints['breakpoints-md']})`,
  ).matches;

  const medium = window.matchMedia(
    `(min-width: ${tokens.breakpoints['breakpoints-sm']})`,
  ).matches;

  switch (true) {
    case large:
      return formatAreas(areas.large);

    case medium:
      return formatAreas(areas.medium);

    default:
      return formatAreas(areas.small);
  }
}

Grid.Column = Column;

export function formatAreas(areas: string[]) {
  return `'${areas.join(`' '`)}'`;
}
