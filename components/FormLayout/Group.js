// @flow

import React, {Children} from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {wrapWithComponent} from '@shopify/react-utilities/components';

import styles from './FormLayout.scss';
import Item from './Item';

type Props = {
  children?: any,
  condensed?: boolean,
};

export default function Group({children, condensed}: Props) {
  const className = classNames(
    styles.Group,
    condensed && styles.condensed,
  );

  return (
    <div className={className}>
      {Children.map(children, (child) => wrapWithComponent(child, Item))}
    </div>
  );
}
