// @flow

import React from 'react';

import styles from './Content.scss';

type Props = {
  children?: any,
  header?: React$Element<*>,
};

export default function Content({children, header}: Props) {
  return (
    <div className={styles.Content}>
      {header && <div className={styles.Header}>{header}</div>}
      <div className={styles.Main}>
        {children}
      </div>
    </div>
  );
}
