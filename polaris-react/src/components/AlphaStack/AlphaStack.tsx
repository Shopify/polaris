import React, {createElement} from 'react';
import type {SpacingSpaceScale} from '@shopify/polaris-tokens';

import {
  classNames,
  sanitizeCustomProperties,
  getResponsiveProps,
} from '../../utilities/css';
import {getAriaAttributes} from '../../utilities/get-aria-attributes';
import type {ResponsiveProp} from '../../utilities/css';

import styles from './AlphaStack.scss';

type Align = 'start' | 'end' | 'center';

type Element = 'div' | 'ul' | 'ol' | 'fieldset';

type Gap = ResponsiveProp<SpacingSpaceScale>;

export interface AlphaStackProps extends React.AriaAttributes {
  /** HTML Element type
   * @default 'div'
   */
  as?: Element;
  /** Elements to display inside stack */
  children?: React.ReactNode;
  /** The vertical alignment of elements
   * @default 'start'
   */
  align?: Align;
  /** Toggle elements to be full width */
  fullWidth?: boolean;
  /** The spacing between elements
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
  fullWidth,
  gap = '4',
  id,
  ...restProps
}: AlphaStackProps) => {
  const className = classNames(
    styles.AlphaStack,
    fullWidth && styles.fullWidth,
    as === 'ul' && styles.listReset,
  );

  const style = {
    '--pc-stack-align': align ? `${align}` : '',
    ...getResponsiveProps('stack', 'gap', 'space', gap),
  } as React.CSSProperties;

  const ariaAttrs = getAriaAttributes(restProps);

  return createElement(
    as,
    {
      className,
      style: sanitizeCustomProperties(style),
      ...ariaAttrs,
    },
    children,
  );
};
