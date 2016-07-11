// @flow

import React, {Children} from 'react';
import styles from './FormLayout.scss';

import Group from './Group';
import Item from './Item';

import {css} from '../../utilities/styles';
import {wrapWithComponent} from '../../utilities/react';

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
  if (child && child.type === Group) { return child; }
  return wrapWithComponent(child, Item, {key: index});
}

function classNameForFormLayout({condensed}) {
  return css([
    styles.FormLayout,
    condensed && styles.condensed,
  ]);
}
