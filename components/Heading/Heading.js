// @flow

import React from 'react';

import styles from './Heading.scss';

type Props = {
  level?: 2 | 3,
  children?: any,
};

export default function Heading({level, children}: Props) {
  return level === 2
    ? <h2 className={styles.Heading}>{children}</h2>
    : <h3 className={styles.Heading}>{children}</h3>;
}
