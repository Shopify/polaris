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

type Spacing = ResponsiveProp<SpacingSpaceScale>;

export interface AlphaStackProps {
  /** HTML Element type */
  as?: Element;
  /** Elements to display inside stack */
  children?: React.ReactNode;
  /** Adjust vertical alignment of elements */
  align?: Align;
  /** Toggle elements to be full width */
  fullWidth?: boolean;
  /** Adjust spacing between elements */
  spacing?: Spacing;
}

export const AlphaStack = ({
  as = 'div',
  children,
  align = 'start',
  fullWidth,
  spacing = '4',
}: AlphaStackProps) => {
  const className = classNames(
    styles.AlphaStack,
    fullWidth && styles.fullWidth,
    as === 'ul' && styles.listReset,
  );

  const style = {
    '--pc-stack-align': align ? `${align}` : '',
    ...getResponsiveProps('stack', 'spacing', 'space', spacing),
  } as React.CSSProperties;

  return createElement(
    as,
    {
      className,
      style: sanitizeCustomProperties(style),
    },
    children,
  );
};
