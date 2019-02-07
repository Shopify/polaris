import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import styles from '../../Stack.scss';

export interface Props {
  /** Elements to display inside item */
  children?: React.ReactNode;
  /** Fill the remaining horizontal space in the stack with the item  */
  fill?: boolean;
  /**
   * @default false
   */
}

export default function Item({children, fill}: Props) {
  const className = classNames(styles.Item, fill && styles['Item-fill']);

  return <div className={className}>{children}</div>;
}
