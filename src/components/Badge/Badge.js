// @flow

import React from 'react';
import {css} from '../../utilities/styles';
import styles from './Badge.scss';

type Props = {
  children?: any,
  status?: 'success' | 'subdued' | 'info' | 'success' | 'attention' | 'warning' | 'critical',
};

export default function Badge(props: Props) {
  return (
    <span className={classNameForBadge(props)}>{props.children}</span>
  );
}

function classNameForBadge({status}) {
  return css([
    styles.Badge,
    status && styles[`status${status[0].toUpperCase()}${status.substring(1)}`],
  ]);
}
