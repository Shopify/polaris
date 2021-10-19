import React, {
  memo,
  NamedExoticComponent,
  isValidElement,
  Children,
} from 'react';

import {classNames, variationName} from '../../utilities/css';
import {wrapWithComponent} from '../../utilities/components';

import {Item} from './components';
import styles from './Stack.scss';

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

interface ChildProps {
  readonly key: number | string;
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

  const unwrappedComponent = (child: JSX.Element, props: ChildProps) => ({
    ...child,
    props: {
      ...child.props,
      ...props,
    },
  });

  const itemMarkup = Children.map(children, (child, index) => {
    if (!isValidElement(child)) return null;
    const props: ChildProps = {key: child.key || index};
    const isValidChildren = child.props.children;
    return isValidChildren
      ? wrapWithComponent(child, Item, props)
      : unwrappedComponent(child, props);
  });

  return <div className={className}>{itemMarkup}</div>;
}) as NamedExoticComponent<StackProps> & {
  Item: typeof Item;
};

Stack.Item = Item;
