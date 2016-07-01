// @flow

import React from 'react';
import styles from './Stack.scss';

import Item from './Item';

import {css, variation} from '../../utilities/styles';
import {elementChildren} from '../../utilities/react';

type Props = {
  children?: any,
  vertical?: boolean,
  spacing?: 'tight' | 'loose' | 'none',
  distribution?: 'equalSpacing' | 'leading' | 'trailing' | 'center' | 'fill',
};

export default function Stack(props: Props) {
  const {children} = props;

  return (
    <div className={classNameForStack(props)}>
      {elementChildren(children).map(wrapChildInItem)}
    </div>
  );
}

Stack.Item = Item;

Stack.defaultProps = {
  vertical: false,
};

function classNameForStack({vertical, spacing, distribution}) {
  return css([
    styles.Stack,
    vertical && styles.vertical,
    spacing && styles[variation('spacing', spacing)],
    distribution && styles[variation('distribution', distribution)],
  ]);
}

function wrapChildInItem(child, index) {
  if (child.type === Item) { return child; }
  return <Item key={index}>{child}</Item>;
}
