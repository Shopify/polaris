import React from 'react';
import type {SpacingSpaceScale} from '@shopify/polaris-tokens';

import {getResponsiveProps} from '../../utilities/css';
import type {ResponsiveProp} from '../../utilities/css';

import styles from './Inline.scss';

type Align =
  | 'start'
  | 'center'
  | 'end'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';
type BlockAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';

type Gap = ResponsiveProp<SpacingSpaceScale>;

export interface InlineProps {
  children?: React.ReactNode;
  /** Horizontal alignment of children
   * @default 'start'
   */
  align?: Align;
  /** Vertical alignment of children
   * @default 'center'
   */
  blockAlign?: BlockAlign;
  /** The spacing between elements. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * gap='2'
   * gap={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  gap?: Gap;
  /** Wrap stack elements to additional rows as needed on small screens
   * @default true
   */
  wrap?: boolean;
  /**
   * Fills the width of the container
   */
  fill?: boolean;
}

export const Inline = function Inline({
  align = 'start',
  blockAlign = 'center',
  gap,
  wrap = true,
  fill,
  children,
}: InlineProps) {
  const style = {
    '--pc-inline-align': align,
    '--pc-inline-block-align': blockAlign,
    '--pc-inline-wrap': wrap ? 'wrap' : 'nowrap',
    width: fill ? '100%' : undefined,
    ...getResponsiveProps('inline', 'gap', 'space', gap),
  } as React.CSSProperties;

  return (
    <div className={styles.Inline} style={style}>
      {children}
    </div>
  );
};
