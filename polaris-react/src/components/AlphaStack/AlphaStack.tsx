import React from 'react';
import type {SpacingSpaceScale} from '@shopify/polaris-tokens';

import {classNames} from '../../utilities/css';

import styles from './AlphaStack.scss';

type Align = 'start' | 'end' | 'center';

export interface AlphaStackProps {
  /** Elements to display inside stack */
  children?: React.ReactNode;
  /** Adjust vertical alignment of elements */
  align?: Align;
  /** Toogle elements to be full width */
  fullWidth?: boolean;
  /** Adjust spacing between elements */
  spacing?: SpacingSpaceScale;
}

export const AlphaStack = ({
  children,
  align = 'start',
  fullWidth,
  spacing = '4',
}: AlphaStackProps) => {
  const className = classNames(
    styles.AlphaStack,
    fullWidth && styles.fullWidth,
  );

  const style = {
    '--pc-stack-align': align ? `${align}` : '',
    ...(spacing ? {'--pc-stack-spacing': `var(--p-space-${spacing})`} : {}),
  } as React.CSSProperties;

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};
