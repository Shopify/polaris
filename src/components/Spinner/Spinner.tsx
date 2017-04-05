import * as React from 'react';
import {variationName, classNames} from '@shopify/react-utilities/styles';

import * as styles from './Spinner.scss';

export type Size = 'small' | 'medium' | 'large';
export type Status = 'success' | 'failed';

export interface Props {
  size: Size,
  status?: Status,
}

export default function Spinner({size, status}: Props) {
  const className = classNames(
    styles.Spinner,
    status && styles.spinnerStopped,
    status && styles[variationName('spinner', status)],
  );

  return (
    <div className={className}>
      <svg
        className={styles[variationName('size', size)]}
        viewBox="0 0 40 40"
        preserveAspectRatio="xMinYMin"
      >
        <circle className={styles.Ring} cx="50%" cy="50%" r="45%" />
        <path
          className={styles.Successful}
          d="M30.8 13L16.9 26.9c-.3.3-.9.3-1.2 0l-6.5-6.5"
        />
        <path
          className={styles.Failed}
          d="M27 13L13 27M27 27L13 13"
        />
      </svg>
    </div>
  );
}
