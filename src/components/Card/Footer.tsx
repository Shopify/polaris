import * as React from 'react';

import * as styles from './Card.scss';

export interface Props {
  children?: React.ReactNode,
}

export default function Footer({children}: Props) {
  return (
    <div className={styles.Footer}>
      {children}
    </div>
  );
}
