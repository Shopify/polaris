import React from 'react';
import type {SpacingSpaceScale} from '@shopify/polaris-tokens';

import {classNames} from '../../utilities/css';

import styles from './AlphaStack.scss';

type Align = 'start' | 'end' | 'center';

export interface AlphaStackProps {
  /** Elements to display inside stack */
  children?: React.ReactNode;
  /** Adjust spacing between elements */
  spacing?: SpacingSpaceScale;
  /** Adjust vertical alignment of elements */
  align?: Align;
}

export const AlphaStack = ({
  children,
  spacing = '4',
  align = 'start',
}: AlphaStackProps) => {
  const className = classNames(styles.AlphaStack);

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
