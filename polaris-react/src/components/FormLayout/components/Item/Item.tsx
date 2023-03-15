import styles from '../../FormLayout.scss';

export interface ItemProps {
  children?: React.ReactNode;
}

export function Item({children}: ItemProps) {
  return children ? <div className={styles.Item}>{children}</div> : null;
}
