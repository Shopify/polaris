// @flow

import React from 'react';
import styles from './Title.scss';

type Props = {
  children?: any,
};

export default function Title({children}: Props) {
  return (
    <h1 className={styles.Title}>{children}</h1>
  );
}
