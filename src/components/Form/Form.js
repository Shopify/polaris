// @flow

import React from 'react';
import styles from './Form.scss';

import Item from './Item';

import {css} from '../../utilities/styles';
import {elementChildren} from '../../utilities/react';

type Props = {
  children?: any,
  condensed?: boolean,
};

export default function Form(props: Props) {
  const {children} = props;

  return (
    <div className={classNameForForm(props)}>
      {elementChildren(children).map(wrapChildInItem)}
    </div>
  );
}

Form.Item = Item;

Form.defaultProps = {
  condensed: false,
};

function wrapChildInItem(child, index) {
  if (child.type === Item) { return child; }
  return <Item key={index}>{child}</Item>;
}

function classNameForForm({condensed}) {
  return css([
    styles.Form,
    condensed && styles.condensed,
  ]);
}
