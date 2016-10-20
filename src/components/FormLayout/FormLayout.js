// @flow

import React, {Children} from 'react';

import {css} from '../../utilities/styles';
import {wrapWithComponent, isElementOfType} from '../../utilities/react';

import Group from './Group';
import Item from './Item';
import styles from './FormLayout.scss';

type Props = {
  children?: any,
  condensed?: boolean,
};

export default function FormLayout(props: Props) {
  const {children} = props;

  return (
    <div className={classNameForFormLayout(props)}>
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

function classNameForFormLayout({condensed}) {
  return css([
    styles.FormLayout,
    condensed && styles.condensed,
  ]);
}
