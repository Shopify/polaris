import React from 'react';

import {classNames} from '../../../../utilities/css';
import styles from '../../FormLayout.module.scss';

export interface ItemProps {
  children?: React.ReactNode;
  condensed?: boolean;
}

export function Item({children, condensed = false}: ItemProps) {
  const className = classNames(styles.Item, condensed && styles.condensed);
  return children ? <div className={className}>{children}</div> : null;
}
