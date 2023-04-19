import React from 'react';
import type {SpaceScale} from '@shopify/polaris-tokens';

import {
  classNames,
  sanitizeCustomProperties,
  getResponsiveProps,
} from '../../utilities/css';
import type {ResponsiveProp} from '../../utilities/css';

import styles from './VerticalStack.scss';

type Align =
  | 'start'
  | 'center'
  | 'end'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';

type InlineAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';

type Element = 'div' | 'ul' | 'ol' | 'fieldset';

type Gap = ResponsiveProp<SpaceScale>;

export interface VerticalStackProps extends React.AriaAttributes {
  children?: React.ReactNode;
  /** HTML Element type
   * @default 'div'
   */
  as?: Element;
  /** Vertical alignment of children */
  align?: Align;
  /** Horizontal alignment of children */
  inlineAlign?: InlineAlign;
  /** The spacing between children */
  gap?: Gap;
  /** HTML id attribute */
  id?: string;
  /** Reverse the render order of child items
   * @default false
   */
  reverseOrder?: boolean;
}

export const VerticalStack = ({
  as = 'div',
  children,
  align,
  inlineAlign,
  gap,
  id,
  reverseOrder = false,
  ...restProps
}: VerticalStackProps) => {
  const className = classNames(
    styles.VerticalStack,
    (as === 'ul' || as === 'ol') && styles.listReset,
    as === 'fieldset' && styles.fieldsetReset,
  );

  const style = {
    '--pc-vertical-stack-align': align ? `${align}` : '',
    '--pc-vertical-stack-inline-align': inlineAlign ? `${inlineAlign}` : '',
    '--pc-vertical-stack-order': reverseOrder ? 'column-reverse' : 'column',
    ...getResponsiveProps('vertical-stack', 'gap', 'space', gap),
  } as React.CSSProperties;

  return React.createElement(
    as,
    {
      className,
      style: sanitizeCustomProperties(style),
      ...restProps,
    },
    children,
  );
};
