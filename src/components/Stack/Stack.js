// @flow

import React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import {elementChildren, wrapWithComponent} from '@shopify/react-utilities/components';

import styles from './Stack.scss';
import Item from './Item';

type Props = {
  children?: any,
  vertical?: boolean,
  wrap?: boolean,
  spacing?: 'tight' | 'loose' | 'none',
  alignment?: 'leading' | 'trailing' | 'center' | 'fill' | 'baseline',
  distribution?: 'equalSpacing' | 'leading' | 'trailing' | 'center' | 'fill' | 'fillEvenly',
};

export default function Stack({
  children,
  wrap = true,
  vertical,
  spacing,
  distribution,
  alignment,
}: Props) {
  const className = classNames(
    styles.Stack,
    !wrap && styles.noWrap,
    vertical && styles.vertical,
    spacing && styles[variationName('spacing', spacing)],
    distribution && styles[variationName('distribution', distribution)],
    alignment && styles[variationName('alignment', alignment)],
  );

  return (
    <div className={className}>
      {
        elementChildren(children)
          .map((child, index) => wrapWithComponent(child, Item, {key: index}))
      }
    </div>
  );
}

Stack.Item = Item;
