import React from 'react';

import {classNames} from '../../../../utilities/css';
import styles from '../../LegacyStack.scss';

export interface LegacyItemProps {
  /** Elements to display inside item */
  children?: React.ReactNode;
  /** Fill the remaining horizontal space in the stack with the item  */
  fill?: boolean;
  /**
   * @default false
   */
}

export function Item({children, fill}: LegacyItemProps) {
  const className = classNames(styles.Item, fill && styles['Item-fill']);

  return <div className={className}>{children}</div>;
}
