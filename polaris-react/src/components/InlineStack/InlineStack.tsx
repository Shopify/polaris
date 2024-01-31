import React from 'react';
import type {SpaceScale} from '@shopify/polaris-tokens';

import {getResponsiveProps, getResponsiveValue} from '../../utilities/css';
import type {ResponsiveProp} from '../../utilities/css';

import styles from './InlineStack.module.scss';

type Align =
  | 'start'
  | 'center'
  | 'end'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';
type BlockAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';

type Gap = ResponsiveProp<SpaceScale>;
type Direction = ResponsiveProp<'row' | 'row-reverse'>;
type Element = 'div' | 'span' | 'li' | 'ol' | 'ul';
export interface InlineStackProps extends React.AriaAttributes {
  children?: React.ReactNode;
  /** HTML Element type
   * @default 'div'
   */
  as?: Element;
  /** Horizontal alignment of children */
  align?: Align;
  /** Horizontal direction in which children are laid out */
  direction?: Direction;
  /** Vertical alignment of children */
  blockAlign?: BlockAlign;
  /** The spacing between elements. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * gap='200'
   * gap={{xs: '200', sm: '300', md: '400', lg: '500', xl: '600'}}
   */
  gap?: Gap;
  /** Wrap stack elements to additional rows as needed on small screens
   * @default true
   */
  wrap?: boolean;
}

export const InlineStack = function InlineStack({
  as: Element = 'div',
  align,
  direction = 'row',
  blockAlign,
  gap,
  wrap = true,
  children,
}: InlineStackProps) {
  const style = {
    '--pc-inline-stack-align': align,
    '--pc-inline-stack-block-align': blockAlign,
    '--pc-inline-stack-wrap': wrap ? 'wrap' : 'nowrap',
    ...getResponsiveProps('inline-stack', 'gap', 'space', gap),
    ...getResponsiveValue('inline-stack', 'flex-direction', direction),
  } as React.CSSProperties;

  return (
    <Element className={styles.InlineStack} style={style}>
      {children}
    </Element>
  );
};
