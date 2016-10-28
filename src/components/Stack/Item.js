// @flow

import React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import styles from './Stack.scss';

type Props = {
  children?: any,
  fill?: boolean,
};

export default function Item({children, fill}: Props) {
  const className = classNames(
    styles.StackItem,
    fill && styles.fill,
  );

  return <div className={className}>{children}</div>;
}
