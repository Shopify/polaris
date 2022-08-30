import React from 'react';
import type {spacing} from '@shopify/polaris-tokens';

import {classNames} from '../../utilities/css';

import styles from './Stack.scss';

type SpacingTokenGroup = typeof spacing;
type SpacingTokenName = keyof SpacingTokenGroup;

// TODO: Bring this logic into tokens
type Spacing = SpacingTokenName extends `space-${infer Scale}` ? Scale : never;

type Align = 'start' | 'end' | 'center';

export interface AlphaStackProps {
  /** Elements to display inside stack */
  children?: React.ReactNode;
  /** Adjust spacing between elements */
  spacing?: Spacing;
  /** Adjust vertical alignment of elements */
  align?: Align;
}

export const AlphaStack = ({
  children,
  spacing,
  align = 'start',
}: AlphaStackProps) => {
  const className = classNames(styles.Stack);

  const style = {
    ...(spacing ? {'--pc-stack-spacing': `var(--p-space-${spacing})`} : {}),
    'align-items': align ? `${align}` : '',
  } as React.CSSProperties;

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};
