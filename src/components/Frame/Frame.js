// @flow

import React from 'react';
import styles from './Frame.scss';

type Props = {children?: any};

export default function Frame({children}: Props) {
  return (
    <div className={styles.Frame}>
      {children}
    </div>
  );
}
