import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import {elementChildren, wrapWithComponent} from '@shopify/react-utilities/components';

import * as styles from './Stack.scss';
import Item, {Props as ItemProps} from './Item';

export type Spacing = 'tight' | 'loose' | 'none';
export type Alignment = 'leading' | 'trailing' | 'center' | 'fill' | 'baseline';
export type Distribution = 'equalSpacing' | 'leading' | 'trailing' | 'center' | 'fill' | 'fillEvenly';

export interface Props {
  children?: any,
  vertical?: boolean,
  wrap?: boolean,
  spacing?: Spacing,
  alignment?: Alignment,
  distribution?: Distribution,
}

export default class Stack extends React.PureComponent<Props, {}> {
  static Item = Item;

  render() {
    const {children, wrap = true, vertical, spacing, distribution, alignment} = this.props;

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
            .map((child, index) => wrapWithComponent(child, Item, {key: index} as ItemProps))
        }
      </div>
    );
  }
}
