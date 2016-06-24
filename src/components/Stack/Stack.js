import React, {PropTypes} from 'react';
import styles from './Stack.scss';

import Item from './Item';

import {Spacing, Alignment} from '../shared';
import {css, variation} from '../../utilities/styles';
import {elementChildren} from '../../utilities/react';

export default function Stack(props) {
  const {children} = props;

  return (
    <div className={classNameForStack(props)}>
      {elementChildren(children).map(wrapChildInItem)}
    </div>
  );
}

Stack.Item = Item;

Stack.propTypes = {
  children: PropTypes.node,
  vertical: PropTypes.bool.isRequired,
  spacing: PropTypes.oneOf([
    Spacing.tight,
    Spacing.loose,
  ]),
  distribution: PropTypes.oneOf([
    Alignment.equalSpacing,
    Alignment.leading,
    Alignment.trailing,
    Alignment.center,
    Alignment.fill,
  ]),
};

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
