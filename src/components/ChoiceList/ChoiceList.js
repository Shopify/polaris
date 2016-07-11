// @flow

import React from 'react';
import styles from './ChoiceList.scss';

type Props = {
  children?: any,
};

export default function ChoiceList({children}: Props) {
  return (
    <div className={styles.ChoiceList}>
      {children}
    </div>
  );
}