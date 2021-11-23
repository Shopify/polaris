import type {ReactNode} from 'react';

import styles from '../../List.scss';

export interface ItemProps {
  /** Content to display inside the item */
  children?: ReactNode;
}

export function Item({children}: ItemProps) {
  return <li className={styles.Item}>{children}</li>;
}
