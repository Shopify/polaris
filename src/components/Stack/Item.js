import React, {PropTypes} from 'react';
import styles from './Stack.scss';
import {css} from '../../utilities/styles';

export default function Item(props) {
  const {children} = props;
  return <div className={classNameForItem(props)}>{children}</div>;
}

function classNameForItem({fill}) {
  return css([
    styles.StackItem,
    fill && styles.fill,
  ]);
}

Item.propTypes = {
  children: PropTypes.node,
  fill: PropTypes.bool.isRequired,
};

Item.defaultProps = {
  fill: false,
};
