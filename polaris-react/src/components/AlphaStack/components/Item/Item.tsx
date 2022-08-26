import React from 'react';

import {classNames} from '../../../../utilities/css';
import styles from '../../Stack.scss';

export interface ItemProps {
  /** Elements to display inside item */
  children?: React.ReactNode;
  /**
   * @default false
   */
}

export function Item({children}: ItemProps) {
  const className = classNames(styles.Item);

  return <div className={className}>{children}</div>;
}
