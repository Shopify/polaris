import React from 'react';

import {classNames} from '../../utilities/css';
import {Text} from '../Text';

import styles from './Label.scss';

export interface LabelProps {
  /** Label content */
  children?: React.ReactNode;
  /** A unique identifier for the label */
  id: string;
  /** Visually hide the label */
  hidden?: boolean;
  /** Visual required indicator for the label */
  requiredIndicator?: boolean;
}

export function labelID(id: string) {
  return `${id}Label`;
}

export function Label({children, id, hidden, requiredIndicator}: LabelProps) {
  const className = classNames(styles.Label, hidden && styles.hidden);

  return (
    <div className={className}>
      <label
        id={labelID(id)}
        htmlFor={id}
        className={classNames(
          styles.Text,
          requiredIndicator && styles.RequiredIndicator,
        )}
      >
        <Text as="span" variant="bodyMd">
          {children}
        </Text>
      </label>
    </div>
  );
}
