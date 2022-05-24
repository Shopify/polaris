import {CaretDownMinor, CaretUpMinor} from '@shopify/polaris-icons';
import React from 'react';

import {classNames} from '../../utilities/css';
import type {SortDirection} from '../DataTable';
import {Icon} from '../Icon';
import {VisuallyHidden} from '../VisuallyHidden';

import styles from './SortIcon.scss';

interface SortIconProps {
  sortDirection: SortDirection;
  accessibilityLabel: string;
}

export function SortIcon({sortDirection, accessibilityLabel}: SortIconProps) {
  return (
    <div className={styles.SortIcon}>
      <VisuallyHidden>{accessibilityLabel}</VisuallyHidden>
      <div
        className={classNames(
          styles.Icon,
          sortDirection === 'ascending' && styles.Active,
        )}
      >
        <Icon source={CaretUpMinor} />
      </div>
      <div
        className={classNames(
          styles.Icon,
          sortDirection === 'descending' && styles.Active,
        )}
      >
        <Icon source={CaretDownMinor} />
      </div>
    </div>
  );
}
