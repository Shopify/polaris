import React from 'react';
import type {SpaceScale} from '@shopify/polaris-tokens';

import {
  classNames,
  sanitizeCustomProperties,
  getResponsiveProps,
} from '../../utilities/css';
import type {ResponsiveProp} from '../../utilities/css';

import styles from './BlockStack.module.scss';

type Align =
  | 'start'
  | 'center'
  | 'end'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';

type InlineAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';

type Element = 'div' | 'span' | 'ul' | 'ol' | 'li' | 'fieldset';

type Gap = ResponsiveProp<SpaceScale>;

export interface BlockStackProps extends React.AriaAttributes {
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
  /** Aria role */
  role?: Extract<
    React.AriaRole,
    'status' | 'presentation' | 'menu' | 'listbox' | 'combobox' | 'group'
  >;
}

export const BlockStack = ({
  as = 'div',
  children,
  align,
  inlineAlign,
  gap,
  id,
  reverseOrder = false,
  ...restProps
}: BlockStackProps) => {
  const className = classNames(
    styles.BlockStack,
    (as === 'ul' || as === 'ol') && styles.listReset,
    as === 'fieldset' && styles.fieldsetReset,
  );

  const style = {
    '--pc-block-stack-align': align ? `${align}` : null,
    '--pc-block-stack-inline-align': inlineAlign ? `${inlineAlign}` : null,
    '--pc-block-stack-order': reverseOrder ? 'column-reverse' : 'column',
    ...getResponsiveProps('block-stack', 'gap', 'space', gap),
  } as React.CSSProperties;

  return React.createElement(
    as,
    {
      className,
      id,
      style: sanitizeCustomProperties(style),
      ...restProps,
    },
    children,
  );
};
