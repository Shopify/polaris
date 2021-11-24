import React from 'react';

import {classNames} from '../../../../utilities/css';
import styles from '../../FormLayout.scss';

export interface ItemProps {
  children?: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'full';
}

export function Item({children, size = 'full'}: ItemProps) {
  const classes = classNames(styles.Item, styles[size]);
  return <div className={classes}>{children}</div>;
}
