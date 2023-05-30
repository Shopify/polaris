import React from 'react';
import type {SpaceScale} from '@shopify/polaris-tokens';

import {getResponsiveProps} from '../../utilities/css';
import type {ResponsiveProp} from '../../utilities/css';

import styles from './HorizontalStack.scss';

type Align =
  | 'start'
  | 'center'
  | 'end'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';
type BlockAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';

type Gap = ResponsiveProp<SpaceScale>;

export interface HorizontalStackProps extends React.AriaAttributes {
  children?: React.ReactNode;
  /** Horizontal alignment of children */
  align?: Align;
  /** Vertical alignment of children */
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
}

export const HorizontalStack = function HorizontalStack({
  align,
  blockAlign,
  gap,
  wrap = true,
  children,
}: HorizontalStackProps) {
  const style = {
    '--pc-horizontal-stack-align': align,
    '--pc-horizontal-stack-block-align': blockAlign,
    '--pc-horizontal-stack-wrap': wrap ? 'wrap' : 'nowrap',
    ...getResponsiveProps('horizontal-stack', 'gap', 'space', gap),
  } as React.CSSProperties;

  return (
    <div className={styles.HorizontalStack} style={style}>
      {children}
    </div>
  );
};
