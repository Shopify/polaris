import styles from './Truncate.scss';

export interface TruncateProps {
  children: React.ReactNode;
}

export function Truncate({children}: TruncateProps) {
  return <span className={styles.Truncate}>{children}</span>;
}
