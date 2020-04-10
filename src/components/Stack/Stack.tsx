import React, {memo, NamedExoticComponent} from 'react';

import {classNames, variationName} from '../../utilities/css';
import {elementChildren, wrapWithComponent} from '../../utilities/components';

import {Item} from './components';
import styles from './Stack.scss';

type Spacing = 'extraTight' | 'tight' | 'loose' | 'extraLoose' | 'none';

type Alignment = 'leading' | 'trailing' | 'center' | 'fill' | 'baseline';

type Distribution =
  | 'equalSpacing'
  | 'leading'
  | 'trailing'
  | 'center'
  | 'fill'
  | 'fillEvenly';

export interface StackProps {
  /** Elements to display inside stack */
  children?: React.ReactNode;
  /** Wrap stack elements to additional rows as needed on small screens (Defaults to true) */
  wrap?: boolean;
  /** Stack the elements vertically */
  vertical?: boolean;
  /** Adjust spacing between elements */
  spacing?: Spacing;
  /** Adjust vertical alignment of elements */
  alignment?: Alignment;
  /** Adjust horizontal alignment of elements */
  distribution?: Distribution;
}

export const Stack = memo(function Stack({
  children,
  vertical,
  spacing,
  distribution,
  alignment,
  wrap,
}: StackProps) {
  const className = classNames(
    styles.Stack,
    vertical && styles.vertical,
    spacing && styles[variationName('spacing', spacing)],
    distribution && styles[variationName('distribution', distribution)],
    alignment && styles[variationName('alignment', alignment)],
    wrap === false && styles.noWrap,
  );

  const itemMarkup = elementChildren(children).map((child, index) => {
    const props = {key: index};
    return wrapWithComponent(child, Item, props);
  });

  return <div className={className}>{itemMarkup}</div>;
}) as NamedExoticComponent<StackProps> & {
  Item: typeof Item;
};

Stack.Item = Item;
