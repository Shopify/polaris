import React, {PropTypes} from 'react';
import styles from './Form.scss';

import Item from './Item';

import {css} from '../../utilities/styles';
import {elementChildren} from '../../utilities/react';

export default function Form(props) {
  const {children} = props;

  return (
    <div className={classNameForForm(props)}>
      {elementChildren(children).map(wrapChildInItem)}
    </div>
  );
}

Form.Item = Item;

Form.propTypes = {
  children: PropTypes.node,
  condensed: PropTypes.bool,
};

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
