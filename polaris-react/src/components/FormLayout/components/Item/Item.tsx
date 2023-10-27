import React from 'react';

import {classNames} from '../../../../utilities/css';
import styles from '../../FormLayout.scss';

export interface ItemProps {
  children?: React.ReactNode;
  condensed?: boolean;
}

export function Item({children, condensed = false}: ItemProps) {
  const className = classNames(
    styles.Item,
    condensed ? styles.condensed : styles.grouped,
  );
  return children ? <div className={className}>{children}</div> : null;
}
