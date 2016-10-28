// @flow

import React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import styles from './Label.scss';

export type Props = {
  children?: any,
  id: string,
  error?: boolean,
  note?: string,
  action?: React$Element<*>,
};

export default function Label({children, note, id, action, error}: Props) {
  const className = classNames(
    styles.Label,
    error && styles.error,
  );

  return (
    <div className={styles.LabelWrapper}>
      <label htmlFor={id} className={className}>{children} {note}</label>
      {action}
    </div>
  );
}
