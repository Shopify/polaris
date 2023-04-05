import React, {memo} from 'react';
import type {NamedExoticComponent} from 'react';

import {classNames, variationName} from '../../utilities/css';
import {elementChildren, wrapWithComponent} from '../../utilities/components';

// eslint-disable-next-line import/no-deprecated
import {Item} from './components';
import styles from './Stack.module.scss';

type Spacing =
  | 'extraTight'
  | 'tight'
  | 'baseTight'
  | 'loose'
  | 'extraLoose'
  | 'none';

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

/** @deprecated Use LegacyStack or AlphaStack instead. */
export const Stack = memo(function Stack({
  children,
  vertical,
  spacing,
  distribution,
  alignment,
  wrap,
}: StackProps) {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn(
      'Deprecation: <Stack /> is deprecated. This component will be removed in a future major version of Polaris. Use <LegacyStack /> or <AlphaStack /> instead.',
    );
  }

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
    // eslint-disable-next-line import/no-deprecated
    return wrapWithComponent(child, Item, props);
  });

  return <div className={className}>{itemMarkup}</div>;
}) as NamedExoticComponent<StackProps> & {
  // eslint-disable-next-line import/no-deprecated
  Item: typeof Item;
};

// eslint-disable-next-line import/no-deprecated
Stack.Item = Item;
