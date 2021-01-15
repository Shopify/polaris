import React from 'react';

import {classNames} from '../../utilities/css';

import styles from './Label.scss';

export interface LabelProps {
  /** Label content */
  children?: React.ReactNode;
  /** A unique identifier for the label */
  id: string;
  /** Visually hide the label */
  hidden?: boolean;
}

export function labelID(id: string) {
  return `${id}Label`;
}

export function Label({children, id, hidden}: LabelProps) {
  const className = classNames(styles.Label, hidden && styles.hidden);

  return (
    <div className={className}>
      <label id={labelID(id)} htmlFor={id} className={styles.Text}>
        {children}
      </label>
    </div>
  );
}
