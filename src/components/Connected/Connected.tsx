import React from 'react';

import {classNames} from '../../utilities/css';
import {useFeatures} from '../../utilities/features';

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
  const {newDesignLanguage} = useFeatures();
  const className = classNames(
    styles.Connected,
    newDesignLanguage && styles.newDesignLanguage,
  );

  const leftConnectionMarkup = left ? (
    <Item position="left">{left}</Item>
  ) : null;

  const rightConnectionMarkup = right ? (
    <Item position="right">{right}</Item>
  ) : null;

  return (
    <div className={className}>
      {leftConnectionMarkup}
      <Item position="primary">{children}</Item>
      {rightConnectionMarkup}
    </div>
  );
}
