import React from 'react';

import {classNames} from '../../../../utilities/css';
import styles from '../../Stack.scss';

export interface ItemProps {
  /** Elements to display inside item */
  children?: React.ReactNode;
  /** Fill the remaining horizontal space in the stack with the item  */
  fill?: boolean;
  /**
   * @default false
   */
}

export function Item({children, fill}: ItemProps) {
  const className = classNames(styles.Item, fill && styles['Item-fill']);

  return <div className={className}>{children}</div>;
}
