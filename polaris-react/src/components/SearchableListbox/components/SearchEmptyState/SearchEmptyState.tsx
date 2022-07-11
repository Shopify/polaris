import React from 'react';

import {TextStyle} from '../../../TextStyle';

import styles from './SearchEmptyState.scss';

interface Props {
  message: string;
}

export function SearchEmptyState({message}: Props) {
  return (
    <div className={styles.EmptyState}>
      <TextStyle variation="subdued">{message}</TextStyle>
    </div>
  );
}
