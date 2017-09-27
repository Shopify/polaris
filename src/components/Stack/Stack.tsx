import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import {elementChildren, wrapWithComponent} from '@shopify/react-utilities/components';

import * as styles from './Stack.scss';
import Item, {Props as ItemProps} from './Item';

export type Spacing = 'extraTight' | 'tight' | 'loose' | 'extraLoose' | 'none';
export type Alignment = 'leading' | 'trailing' | 'center' | 'fill' | 'baseline';
export type Distribution = 'equalSpacing' | 'leading' | 'trailing' | 'center' | 'fill' | 'fillEvenly';

export interface Props {
  children?: any,
  wrap?: boolean,
  vertical?: boolean,
  spacing?: Spacing,
  alignment?: Alignment,
  distribution?: Distribution,
}

export default class Stack extends React.PureComponent<Props, never> {
  static Item = Item;

  render() {
    const {
      children,
      vertical,
      spacing,
      distribution,
      alignment,
      wrap,
    } = this.props;

    const className = classNames(
      styles.Stack,
      vertical && styles.vertical,
      spacing && styles[variationName('spacing', spacing)],
      distribution && styles[variationName('distribution', distribution)],
      alignment && styles[variationName('alignment', alignment)],
      wrap === false && styles.noWrap,
    );

    const itemMarkup = elementChildren(children)
      .map((child, index) => wrapWithComponent(child, Item, {key: index} as ItemProps));

    return <div className={className}>{itemMarkup}</div>;
  }
}
