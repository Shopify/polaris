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
    <span className={styles.SortIcon}>
      <VisuallyHidden>{accessibilityLabel}</VisuallyHidden>
      <span
        className={classNames(
          styles.Icon,
          styles.Up,
          sortDirection === 'ascending' && styles.Active,
        )}
      >
        <Icon source={CaretUpMinor} />
      </span>
      <span
        className={classNames(
          styles.Icon,
          styles.Down,
          sortDirection === 'descending' && styles.Active,
        )}
      >
        <Icon source={CaretDownMinor} />
      </span>
    </span>
  );
}
