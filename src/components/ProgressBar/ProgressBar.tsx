import React from 'react';

import {classNames, variationName} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';

import styles from './ProgressBar.scss';

type Size = 'small' | 'medium' | 'large';
type Color = 'highlight' | 'primary' | 'success' | 'critical';

export interface ProgressBarProps {
  /**
   * The progression of certain tasks
   * @default 0
   */
  progress?: number;
  /**
   * Size of progressbar
   * @default 'medium'
   */
  size?: Size;
  /**
   * Color of progressbar
   * @default 'highlight'
   */
  color?: Color;
  /**
   * Whether the fill animation is triggered
   * @default 'true'
   */
  animated?: boolean;
}

export function ProgressBar({
  progress = 0,
  size = 'medium',
  color = 'highlight',
  animated = true,
}: ProgressBarProps) {
  const i18n = useI18n();

  const className = classNames(
    styles.ProgressBar,
    size && styles[variationName('size', size)],
    color && styles[variationName('color', color)],
  );

  const warningMessage = i18n.translate(
    progress < 0
      ? 'Polaris.ProgressBar.negativeWarningMessage'
      : 'Polaris.ProgressBar.exceedWarningMessage',
    {progress},
  );
  const parsedProgress = parseProgress(progress, warningMessage);

  return (
    <div className={className}>
      <progress className={styles.Progress} value={parsedProgress} max="100" />
      <div
        className={classNames(styles.Indicator, animated && styles.Animated)}
        style={{width: `${parsedProgress}%`}}
      >
        <span className={styles.Label}>{parsedProgress}%</span>
      </div>
    </div>
  );
}

function parseProgress(progress: number, warningMessage: string) {
  let progressWidth;
  if (progress < 0) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(warningMessage);
    }
    progressWidth = 0;
  } else if (progress > 100) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(warningMessage);
    }
    progressWidth = 100;
  } else {
    progressWidth = progress;
  }
  return progressWidth;
}
