import React, {createElement} from 'react';
import type {SpacingSpaceScale} from '@shopify/polaris-tokens';

import {
  classNames,
  sanitizeCustomProperties,
  getResponsiveProps,
} from '../../utilities/css';
import type {ResponsiveProp} from '../../utilities/css';

import styles from './Stack.scss';

type Align = 'start' | 'end' | 'center';

type Element = 'div' | 'ul' | 'ol' | 'fieldset';

type Gap = ResponsiveProp<SpacingSpaceScale>;

export interface StackProps extends React.AriaAttributes {
  children?: React.ReactNode;
  /** HTML Element type
   * @default 'div'
   */
  as?: Element;
  /** Horizontal alignment of children */
  align?: Align;
  /** Toggle children to be full width
   * @default false
   */
  fullWidth?: boolean;
  /** The spacing between children */
  gap?: Gap;
  /** HTML id attribute */
  id?: string;
  /** Reverse the render order of child items
   * @default false
   */
  reverseOrder?: boolean;
}

export const Stack = ({
  as = 'div',
  children,
  align,
  fullWidth = false,
  gap,
  id,
  reverseOrder = false,
  ...restProps
}: StackProps) => {
  const className = classNames(
    styles.Stack,
    fullWidth && styles.fullWidth,
    as === 'ul' && styles.listReset,
    as === 'fieldset' && styles.fieldsetReset,
  );

  const style = {
    '--pc-stack-align': align ? `${align}` : '',
    '--pc-stack-order': reverseOrder ? 'column-reverse' : 'column',
    ...getResponsiveProps('stack', 'gap', 'space', gap),
  } as React.CSSProperties;

  return createElement(
    as,
    {
      className,
      style: sanitizeCustomProperties(style),
      ...restProps,
    },
    children,
  );
};
