import * as React from 'react';

import * as styles from './Tablist.scss';

export interface Props {
  id: string,
  tabID: string,
  children?: React.ReactNode,
};

export default function Panel({
  id,
  tabID,
  children,
}: Props) {
  return (
    <div
      className={styles.Panel}
      id={id}
      role="tabpanel"
      aria-labelledby={tabID}
    >
      {children}
    </div>
  );
}
