import React from 'react';

import {classNames} from '../../utilities/css';

import styles from './SkeletonTabs.module.scss';

export interface SkeletonTabsProps {
  count?: number;
}

export function SkeletonTabs({count = 2}: SkeletonTabsProps) {
  return (
    <div className={styles.Tabs}>
      {[...Array(count).keys()].map((key) => {
        return (
          <div key={key} className={classNames(styles.Tab)}>
            <div className={styles.TabText} />
          </div>
        );
      })}
    </div>
  );
}
