import React from 'react';
import type {spacing} from '@shopify/polaris-tokens';

import {classNames, variationName} from '../../utilities/css';
import {elementChildren, wrapWithComponent} from '../../utilities/components';

import styles from './Stack.scss';
import {Item} from './components';

type SpacingTokenGroup = typeof spacing;
type SpacingTokenName = keyof SpacingTokenGroup;

// TODO: Bring this logic into tokens
type Spacing = SpacingTokenName extends `space-${infer Scale}` ? Scale : never;

type Alignment = 'left' | 'right' | 'center';

export interface AlphaStackProps {
  /** Elements to display inside stack */
  children?: React.ReactNode;
  /** Adjust spacing between elements */
  spacing?: Spacing;
  /** Adjust vertical alignment of elements */
  alignment?: Alignment;
}

export const AlphaStack = ({children, spacing, alignment}: AlphaStackProps) => {
  const className = classNames(
    styles.Stack,
    spacing && styles[variationName('spacing', spacing)],
    alignment && styles[variationName('alignment', alignment)],
  );

  const itemMarkup = elementChildren(children).map((child, index) => {
    const props = {key: index};
    return wrapWithComponent(child, Item, props);
  });

  return <div className={className}>{itemMarkup}</div>;
};
