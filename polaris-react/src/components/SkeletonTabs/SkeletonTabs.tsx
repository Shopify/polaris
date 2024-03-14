import React from 'react';

import {classNames} from '../../utilities/css';

import styles from './SkeletonTabs.module.css';

export interface SkeletonTabsProps {
  count?: number;
  /** Fit tabs to container */
  fitted?: boolean;
}

export function SkeletonTabs({count = 2, fitted = false}: SkeletonTabsProps) {
  return (
    <div className={classNames(styles.Tabs, fitted && styles.fitted)}>
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
