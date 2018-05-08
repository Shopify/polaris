import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import * as styles from './Label.scss';

export interface Props {
  /** The label content */
  children?: string;
  /** A unique identifier for the label */
  id: string;
  /** Visually hide the label */
  hidden?: boolean;
}

export function labelID(id: string) {
  return `${id}Label`;
}

export default function Label({children, id, hidden}: Props) {
  const className = classNames(styles.Label, hidden && styles.hidden);

  return (
    <div className={className}>
      <label id={labelID(id)} htmlFor={id} className={styles.Text}>
        {children}
      </label>
    </div>
  );
}
