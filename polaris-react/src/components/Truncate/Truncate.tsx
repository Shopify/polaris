import React from 'react';

import styles from './Truncate.module.scss';

export interface TruncateProps {
  children: React.ReactNode;
}

export function Truncate({children}: TruncateProps) {
  return <span className={styles.Truncate}>{children}</span>;
}
