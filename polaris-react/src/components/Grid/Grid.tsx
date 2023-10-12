import React from 'react';
import type {SpaceScale} from '@shopify/polaris-tokens';

import {
  getResponsiveProps,
  getResponsiveValue,
  mapResponsivePropValues,
} from '../../utilities/css';
import type {ResponsiveProp} from '../../utilities/css';

import {Cell} from './components';
import styles from './Grid.scss';

type Area = string[];

export interface GridProps {
  /**
   * Set grid-template-areas
   * @deprecated To avoid a11y issues, nest layout components in individual grid
   * cells instead. See:
   * https://polaris.shopify.com/components/layout-and-structure
   */
  areas?: ResponsiveProp<Area>;
  /* Number of columns */
  columns?: ResponsiveProp<number>;
  /* Grid gap */
  gap?: ResponsiveProp<SpaceScale>;
  children?: React.ReactNode;
}

export const Grid: React.FunctionComponent<GridProps> & {
  Cell: typeof Cell;
} = function Grid({gap, areas, children, columns}: GridProps) {
  const style = {
    ...getResponsiveProps('grid', 'gap', 'space', gap),
    ...getResponsiveValue('grid', 'columns', columns),
    ...getResponsiveValue(
      'grid',
      'areas',
      mapResponsivePropValues(areas, formatAreas),
    ),
  } as React.CSSProperties;

  return (
    <div className={styles.Grid} style={style}>
      {children}
    </div>
  );
};

export function formatAreas(areas?: Area) {
  if (!areas) return;
  return `'${areas?.join(`' '`)}'`;
}

Grid.Cell = Cell;
