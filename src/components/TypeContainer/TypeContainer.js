// @flow

import React from 'react';
import styles from './TypeContainer.scss';

type Props = {
  children?: any,
};

export default function TypeContainer({children}: Props) {
  return (
    <div className={styles.TypeContainer}>{children}</div>
  );
}
