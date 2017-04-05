import * as React from 'react';

import * as styles from './TypeContainer.scss';

export interface Props {
  children?: React.ReactNode,
}

export default function TypeContainer({children}: Props) {

  return (
    <div className={styles.TypeContainer}>{children}</div>
  );
}
