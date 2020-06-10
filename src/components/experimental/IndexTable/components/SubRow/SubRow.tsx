import React from 'react';

import styles from '../../IndexTable.scss';

export interface SubRowProps {
  children: React.ReactNode;
}

export function SubRow({children}: SubRowProps) {
  return <tr className={styles.SubTableRow}>{children}</tr>;
}
