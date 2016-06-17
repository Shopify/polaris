import React, {PropTypes, Children} from 'react';
import styles from './index.css';
import {css} from '../../utilities';

export default function Stack(props) {
  const {children} = props;

  return (
    <div className={classNameForStack(props)}>
      {Children.map(children, (child, index) => (
        <StackItem key={index}>{child}</StackItem>
      ))}
    </div>
  );
}

Stack.propTypes = {
  children: PropTypes.node,
  vertical: PropTypes.bool.isRequired,
};

Stack.defaultProps = {
  vertical: false,
};

function classNameForStack({vertical}) {
  return css([
    styles.Stack,
    vertical && styles.vertical,
  ]);
}

function StackItem({children}) {
  return <div className={styles.StackItem}>{children}</div>;
}

Stack.Item = StackItem;

StackItem.propTypes = {children: PropTypes.node};
