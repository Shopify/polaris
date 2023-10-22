import React from 'react';

import styles from '../../List.scss';

export interface ItemProps {
  /** Content to display inside the item */
  children?: React.ReactNode;
}

export function Item({children}: ItemProps) {
  return <li className={styles.Item}>{children}</li>;
}
