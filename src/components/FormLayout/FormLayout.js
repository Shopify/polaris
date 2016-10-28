// @flow

import React, {Children} from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {wrapWithComponent, isElementOfType} from '@shopify/react-utilities/components';

import Group from './Group';
import Item from './Item';
import styles from './FormLayout.scss';

type Props = {
  children?: any,
  condensed?: boolean,
};

export default function FormLayout({children, condensed}: Props) {
  const className = classNames(
    styles.FormLayout,
    condensed && styles.condensed,
  );

  return (
    <div className={className}>
      {Children.map(children, wrapChildren)}
    </div>
  );
}

FormLayout.Item = Item;
FormLayout.Group = Group;

FormLayout.defaultProps = {
  condensed: false,
};

function wrapChildren(child, index) {
  if (isElementOfType(child, Group)) { return child; }
  return wrapWithComponent(child, Item, {key: index});
}
