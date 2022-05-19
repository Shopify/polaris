import React from 'react';

import {classNames} from '../../utilities/css';
import {SkeletonBodyText} from '../SkeletonBodyText';

import styles from './SkeletonTabs.scss';

export interface Props {
  count?: number;
}

export function SkeletonTabs({count = 2}: Props) {
  return (
    <div className={styles.Tabs}>
      {[...Array(count).keys()].map((key) => {
        const tabWidthClassName =
          key % 2 === 0 ? styles['Tab-short'] : styles['Tab-long'];

        return (
          <div key={key} className={classNames(styles.Tab, tabWidthClassName)}>
            <SkeletonBodyText lines={1} />
          </div>
        );
      })}
    </div>
  );
}
