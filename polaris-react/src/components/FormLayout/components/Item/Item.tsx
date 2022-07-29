import type {ReactNode} from 'react';

import styles from '../../FormLayout.scss';

export interface ItemProps {
  children?: ReactNode;
}

export function Item(props: ItemProps) {
  return <div className={styles.Item}>{props.children}</div>;
}
