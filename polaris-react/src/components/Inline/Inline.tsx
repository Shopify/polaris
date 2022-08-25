import React, {memo, NamedExoticComponent} from 'react';

import {classNames, variationName} from '../../utilities/css';
import {elementChildren, wrapWithComponent} from '../../utilities/components';

import {Item} from './components';
import styles from './Inline.scss';

type Spacing =
  | 'extraTight'
  | 'tight'
  | 'baseTight'
  | 'loose'
  | 'extraLoose'
  | 'none';

type AlignY = 'top' | 'center' | 'bottom' | 'baseline';

type Align = 'start' | 'center' | 'end';

export interface InlineProps {
  /** Elements to display inside stack */
  children?: React.ReactNode;
  /** Wrap stack elements to additional rows as needed on small screens (Defaults to true) */
  wrap?: boolean;
  /** Adjust spacing between elements */
  spacing?: Spacing;
  /** Adjust vertical alignment of elements */
  alignY?: AlignY;
  /** Adjust horizontal alignment of elements */
  align?: Align;
}

export const Inline = memo(function Inline({
  children,
  spacing,
  align,
  alignY,
  wrap,
}: InlineProps) {
  const className = classNames(
    styles.Inline,
    spacing && styles[variationName('spacing', spacing)],
    align && styles[variationName('align', align)],
    alignY && styles[variationName('alignY', alignY)],
    wrap === false && styles.noWrap,
  );

  const itemMarkup = elementChildren(children).map((child, index) => {
    const props = {key: index};
    return wrapWithComponent(child, Item, props);
  });

  return <div className={className}>{itemMarkup}</div>;
}) as NamedExoticComponent<InlineProps> & {
  Item: typeof Item;
};

Inline.Item = Item;
