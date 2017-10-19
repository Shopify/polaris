import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import * as styles from './ProgressBar.scss';

export type Size = 'small' | 'medium' | 'large' ;

export interface Props {
  progress?: number,
  size?: Size,
}

export default function ProgressBar({progress = 0, size = 'medium'}: Props) {
  const className = classNames(
    styles.ProgressBar,
    size && styles[variationName('size', size)],
  );

  const parsedProgress = parseProgress(progress);

  return (
    <div className={className}>
      <progress className={styles.Progress} value={parsedProgress} max="100" />
      <div className={styles.Indicator} role="progressbar" aria-hidden="true" style={{width: `${parsedProgress}%`}}>
        <span className={styles.Label}>{parsedProgress}%</span>
      </div>
    </div>
  );
}

function parseProgress(progress: number) {
  let progressWidth;
  if (progress < 0) {
    if (process.env.NODE_ENV === 'development') {
      // tslint:disable-next-line no-console
      console.warn(`Values passed to the progress prop shouldn’t be negative. Resetting ${progress} to 0.`);
    }
    progressWidth = 0;
  } else if (progress > 100) {
    if (process.env.NODE_ENV === 'development') {
      // tslint:disable-next-line no-console
      console.warn(`Values passed to the progress prop shouldn’t exceed 100. Setting ${progress} to 100.`);
    }
    progressWidth = 100;
  } else {
    progressWidth = progress;
  }
  return progressWidth;
}
