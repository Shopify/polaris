import React from 'react';

import {classNames} from '../../utilities/css';
import {SkeletonBodyText} from '../SkeletonBodyText';

import styles from './SkeletonTabs.module.scss';

export interface SkeletonTabsProps {
  count?: number;
}

export function SkeletonTabs({count = 2}: SkeletonTabsProps) {
  return (
    <div className={styles.Tabs}>
      {[...Array(count).keys()].map((key) => {
        const tabWidthClassName =
          key % 2 === 0 ? styles['Tab-short'] : styles['Tab-long'];

        return (
          <div key={key} className={classNames(styles.Tab, tabWidthClassName)}>
            <div className={styles.InnerTab} />
          </div>
        );
      })}
    </div>
  );
}
