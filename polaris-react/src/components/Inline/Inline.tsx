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
  /** Adjust horizontal alignment of elements
   * @default 'start'
   */
  align?: Align;
  /** Adjust vertical alignment of elements
   * @default 'center'
   */
  blockAlign?: BlockAlign;
  /** The spacing between elements. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @default '4'
   * @example
   * gap='2'
   * gap={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  gap?: Gap;
  /** Wrap stack elements to additional rows as needed on small screens
   * @default true
   */
  wrap?: boolean;
  /** Elements to display inside stack */
  children?: React.ReactNode;
}

export const Inline = function Inline({
  align = 'start',
  blockAlign = 'center',
  gap = '4',
  wrap = true,
  children,
}: InlineProps) {
  const style = {
    '--pc-inline-align': align,
    '--pc-inline-block-align': blockAlign,
    '--pc-inline-wrap': wrap ? 'wrap' : 'nowrap',
    ...getResponsiveProps('inline', 'gap', 'space', gap),
  } as React.CSSProperties;

  return (
    <div className={styles.Inline} style={style}>
      {children}
    </div>
  );
};
