import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import * as styles from './Badge.scss';

export type Status = 'success' | 'info' | 'attention' | 'warning' | 'critical';

export interface Props {
  children?: React.ReactNode,
  status?: Status,
}

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
