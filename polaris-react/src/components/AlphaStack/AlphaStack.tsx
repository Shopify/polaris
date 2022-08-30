import React from 'react';
import type {spacing} from '@shopify/polaris-tokens';

import {classNames, variationName} from '../../utilities/css';
import {elementChildren} from '../../utilities/components';

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

export const AlphaStack = ({children, spacing, align}: AlphaStackProps) => {
  const className = classNames(
    styles.Stack,
    align && styles[variationName('align', align)],
  );

  const style = {
    '--pc-stack-spacing': spacing ? `var(--p-space-${spacing})` : '',
  } as React.CSSProperties;

  const stackItems = elementChildren(children).map((child, index) => {
    return <div key={index}>{child}</div>;
  });

  return (
    <div className={className} style={style}>
      {stackItems}
    </div>
  );
};
