import React, {createElement} from 'react';
import type {SpacingSpaceScale} from '@shopify/polaris-tokens';

import {
  classNames,
  sanitizeCustomProperties,
  getResponsiveProps,
} from '../../utilities/css';
import type {ResponsiveProp} from '../../utilities/css';

import styles from './AlphaStack.scss';

type Align = 'start' | 'end' | 'center';

type Element = 'div' | 'ul' | 'ol' | 'fieldset';

type Gap = ResponsiveProp<SpacingSpaceScale>;

export interface AlphaStackProps extends React.AriaAttributes {
  children?: React.ReactNode;
  /** HTML Element type
   * @default 'div'
   */
  as?: Element;
  /** Vertical alignment of children
   * @default 'start'
   */
  align?: Align;
  /** Toggle children to be full width
   * @default false
   */
  fullWidth?: boolean;
  /** The spacing between children
   * @default '4'
   */
  gap?: Gap;
  /** HTML id attribute */
  id?: string;
}

export const AlphaStack = ({
  as = 'div',
  children,
  align = 'start',
  fullWidth = false,
  gap = '4',
  id,
  ...restProps
}: AlphaStackProps) => {
  const className = classNames(
    styles.AlphaStack,
    fullWidth && styles.fullWidth,
    as === 'ul' && styles.listReset,
    as === 'fieldset' && styles.fieldsetReset,
  );

  const style = {
    '--pc-stack-align': align ? `${align}` : '',
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
