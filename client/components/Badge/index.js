import React, {PropTypes} from 'react';
import styles from './index.css';
import {css} from '../../utilities';
import * as Statuses from '../shared/statuses';

export default function Badge(props) {
  return (
    <span className={classNameForBadge(props)}>{props.children}</span>
  );
}

const STATUSES = [
  Statuses.subdued,
  Statuses.info,
  Statuses.success,
  Statuses.attention,
  Statuses.warning,
  Statuses.critical,
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
