// @flow

import React from 'react';

import styles from './Tag.scss';

type Props = {
  children?: string,
  onRemove?: (tag: string) => void,
};

export default function Tag({children, onRemove}: Props) {
  function handleRemove() {
    if (typeof onRemove === 'function' && children != null) {
      onRemove(children);
    }
  }

  return (
    <span className={styles.Tag}>
      <span className={styles.Content}>{children}</span>
      <span className={styles.Close} onClick={handleRemove}>×</span>
    </span>
  );
}
