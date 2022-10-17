import React, {createElement} from 'react';
import type {SpacingSpaceScale} from '@shopify/polaris-tokens';

import {classNames, sanitizeCustomProperties} from '../../utilities/css';

import styles from './AlphaStack.scss';

type Align = 'start' | 'end' | 'center';

type Element = 'div' | 'ul' | 'fieldset';

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
  spacing?: SpacingSpaceScale;
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
    ...(spacing ? {'--pc-stack-spacing': `var(--p-space-${spacing})`} : {}),
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
