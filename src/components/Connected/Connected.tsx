import React from 'react';

import {Item, ItemPosition} from './components';
import styles from './Connected.scss';

export interface ConnectedProps {
  /** Content to display on the left */
  left?: React.ReactNode;
  /** Content to display on the right */
  right?: React.ReactNode;
  /** Connected content */
  children?: React.ReactNode;
}

export function Connected({children, left, right}: ConnectedProps) {
  const leftConnectionMarkup = left ? (
    <Item position={ItemPosition.Left}>{left}</Item>
  ) : null;

  const rightConnectionMarkup = right ? (
    <Item position={ItemPosition.Right}>{right}</Item>
  ) : null;

  return (
    <div className={styles.Connected}>
      {leftConnectionMarkup}
      <Item position={ItemPosition.Primary}>{children}</Item>
      {rightConnectionMarkup}
    </div>
  );
}
