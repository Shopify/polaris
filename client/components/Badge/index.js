import React, {PropTypes} from 'react';
import styles from './index.css';
import {css} from '../../utilities';
import {Status} from '../shared';

export default function Badge(props) {
  return (
    <span className={classNameForBadge(props)}>{props.children}</span>
  );
}

const STATUSES = [
  Status.subdued,
  Status.info,
  Status.success,
  Status.attention,
  Status.warning,
  Status.critical,
];

Badge.propTypes = {
  children: PropTypes.node,
  status: PropTypes.oneOf(STATUSES),
};

function classNameForBadge({status}) {
  return css([
    styles.Badge,
    status && styles[`status${status[0].toUpperCase()}${status.substring(1)}`],
  ]);
}
