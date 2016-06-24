import React, {PropTypes, Children} from 'react';
import styles from './index.scss';

import {Spacing} from '../shared';
import {css} from '../../utilities/styles';

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
const DISTRIBUTION = [
  'equalSpacing',
  'leading',
  'trailing',
  'center',
  'fill',
];

Stack.propTypes = {
  children: PropTypes.node,
  vertical: PropTypes.bool.isRequired,
  spacing: PropTypes.oneOf(SPACING),
  distribution: PropTypes.oneOf(DISTRIBUTION),
};

Stack.defaultProps = {
  vertical: false,
};

function classNameForStack({vertical, spacing, distribution}) {
  return css([
    styles.Stack,
    vertical && styles.vertical,
    spacing && styles[`spacing${spacing[0].toUpperCase()}${spacing.substring(1)}`],
    distribution && styles[`distribution${distribution[0].toUpperCase()}${distribution.substring(1)}`],
  ]);
}

function StackItem({children}) {
  return <div className={styles.StackItem}>{children}</div>;
}

Stack.Item = StackItem;

StackItem.propTypes = {children: PropTypes.node};
