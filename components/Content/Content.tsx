import * as React from 'react';

import * as styles from './Content.scss';

export interface Props {
  children?: any,
  header?: React.ReactElement<{}>,
}

export default function Content({children, header}: Props) {
  return (
    <div className={styles.Content}>
      {header && <div className={styles.Header}>{header}</div>}
      <div className={styles.Main}>
        {children}
      </div>
    </div>
  );
}
