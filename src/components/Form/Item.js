// @flow

import React from 'react';
import styles from './Form.scss';

type Props = {children?: any};

export default function FormItem(props: Props) {
  return (
    <div className={styles.Item}>{props.children}</div>
  );
}
