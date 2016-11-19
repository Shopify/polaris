// @flow

import React from 'react';

import styles from './FormLayout.scss';

type Props = {children?: any};

export default function Item(props: Props) {
  return (
    <div className={styles.Item}>{props.children}</div>
  );
}
