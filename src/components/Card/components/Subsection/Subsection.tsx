import * as React from 'react';

import styles from '../../Card.scss';

export interface Props {
  children?: React.ReactNode;
}

export default function Subsection({children}: Props) {
  return <div className={styles.Subsection}>{children}</div>;
}
