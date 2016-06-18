import React, {PropTypes, Children} from 'react';
import styles from './index.css';
import {Spacing} from '../shared';
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

const SPACING = [Spacing.tight, Spacing.loose];

Stack.propTypes = {
  children: PropTypes.node,
  vertical: PropTypes.bool.isRequired,
  spacing: PropTypes.oneOf(SPACING),
};

Stack.defaultProps = {
  vertical: false,
};

function classNameForStack({vertical, spacing}) {
  return css([
    styles.Stack,
    vertical && styles.vertical,
    spacing && styles[`spacing${spacing[0].toUpperCase()}${spacing.substring(1)}`],
  ]);
}

function StackItem({children}) {
  return <div className={styles.StackItem}>{children}</div>;
}

Stack.Item = StackItem;

StackItem.propTypes = {children: PropTypes.node};
