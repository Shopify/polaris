import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import * as styles from './Stack.scss';

export interface Props {
  children?: React.ReactNode;
  fill?: boolean;
}

export default function Item({children, fill}: Props) {
  const className = classNames(styles.Item, fill && styles['Item-fill']);

  return <div className={className}>{children}</div>;
}
