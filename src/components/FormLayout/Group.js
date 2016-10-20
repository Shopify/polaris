// @flow

import React, {Children} from 'react';

import {wrapWithComponent} from '../../utilities/react';
import {css} from '../../utilities/styles';

import styles from './FormLayout.scss';
import Item from './Item';

type Props = {
  children?: any,
  condensed?: boolean,
};

export default function Group(props: Props) {
  const {children} = props;

  return (
    <div className={classNameForGroup(props)}>
      {Children.map(children, (child) => wrapWithComponent(child, Item))}
    </div>
  );
}

function classNameForGroup({condensed}) {
  return css([
    styles.Group,
    condensed && styles.condensed,
  ]);
}
