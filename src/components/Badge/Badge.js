// @flow

import React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import styles from './Badge.scss';

type Props = {
  children?: any,
  status?: 'success' | 'subdued' | 'info' | 'success' | 'attention' | 'warning' | 'critical',
};

export default function Badge({children, status}: Props) {
  return (
    <span
      className={classNames(
        styles.Badge,
        status && styles[variationName('status', status)],
      )}
    >
      {children}
    </span>
  );
}
