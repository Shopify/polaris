// @flow

import React from 'react';
import {css} from '../../utilities/styles';
import styles from './Stack.scss';

type Props = {
  children?: any,
  fill?: boolean,
};

export default function Item(props: Props) {
  const {children} = props;
  return <div className={classNameForItem(props)}>{children}</div>;
}

function classNameForItem({fill}) {
  return css([
    styles.StackItem,
    fill && styles.fill,
  ]);
}

Item.defaultProps = {
  fill: false,
};
