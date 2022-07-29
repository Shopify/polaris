import type {ReactNode} from 'react';

import styles from './Truncate.scss';

export interface TruncateProps {
  children: ReactNode;
}

export function Truncate({children}: TruncateProps) {
  return <span className={styles.Truncate}>{children}</span>;
}
