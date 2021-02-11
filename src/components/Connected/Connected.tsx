import React from 'react';

import {Item} from './components';
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
    <Item position="left">{left}</Item>
  ) : null;

  const rightConnectionMarkup = right ? (
    <Item position="right">{right}</Item>
  ) : null;

  return (
    <div className={styles.Connected}>
      {leftConnectionMarkup}
      <Item position="primary">{children}</Item>
      {rightConnectionMarkup}
    </div>
  );
}
