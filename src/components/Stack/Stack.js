// @flow

import React from 'react';

import {css, variation} from '../../utilities/styles';
import {elementChildren, wrapWithComponent} from '../../utilities/react';

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

export default function Stack(props: Props) {
  const {children} = props;

  return (
    <div className={classNameForStack(props)}>
      {
        elementChildren(children)
          .map((child, index) => wrapWithComponent(child, Item, {key: index}))
      }
    </div>
  );
}

Stack.Item = Item;

Stack.defaultProps = {
  vertical: false,
};

function classNameForStack({vertical, spacing, distribution, alignment, wrap = true}) {
  return css([
    styles.Stack,
    !wrap && styles.noWrap,
    vertical && styles.vertical,
    spacing && styles[variation('spacing', spacing)],
    distribution && styles[variation('distribution', distribution)],
    alignment && styles[variation('alignment', alignment)],
  ]);
}
