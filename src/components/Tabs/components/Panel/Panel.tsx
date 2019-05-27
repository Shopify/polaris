import React from 'react';
import styles from '../../Tabs.scss';

export interface Props {
  id: string;
  children?: React.ReactNode;
}

export default function Panel({id, children}: Props) {
  return (
    <div className={styles.Panel} id={id}>
      {children}
    </div>
  );
}
