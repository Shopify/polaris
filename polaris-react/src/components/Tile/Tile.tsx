import React, {Children} from 'react';
import type {spacing} from '@shopify/polaris-tokens';

import {Box} from '../Box';
import {classNames} from '../../utilities/css';

import styles from './Tile.scss';

type SpacingTokenGroup = typeof spacing;
type SpacingTokenName = keyof SpacingTokenGroup;

// TODO: Bring this logic into tokens
type Spacing = SpacingTokenName extends `space-${infer Scale}` ? Scale : never;

type Columns =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12';

export interface TileProps {
  /** Elements to display inside tile */
  children: React.ReactNode;
  /** Adjust spacing between elements */
  spacing: Spacing;
  /** Adjust number of columns */
  columns: Columns;
}

export const Tile = ({children, spacing, columns}: TileProps) => {
  const className = classNames(styles.Tile);

  const style = {
    '--pc-tile-column-number': `repeat(${columns}, 1fr)`,
    ...(spacing ? {'--pc-tile-spacing': `var(--p-space-${spacing})`} : {}),
  } as React.CSSProperties;

  return (
    <div className={className} style={style}>
      {Children.map(children, (child) => (
        <Box>{child}</Box>
      ))}
    </div>
  );
};
