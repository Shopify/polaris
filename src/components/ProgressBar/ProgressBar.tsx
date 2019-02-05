import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';
import styles from './ProgressBar.scss';

export type Size = 'small' | 'medium' | 'large';

export interface Props {
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
}

export type CombinedProps = Props & WithAppProviderProps;

function ProgressBar({
  progress = 0,
  size = 'medium',
  polaris: {intl},
}: CombinedProps) {
  const className = classNames(
    styles.ProgressBar,
    size && styles[variationName('size', size)],
  );

  const warningMessage = intl.translate(
    progress < 0
      ? 'Polaris.ProgressBar.negativeWarningMessage'
      : 'Polaris.ProgressBar.exceedWarningMessage',
    {progress},
  );
  const parsedProgress = parseProgress(progress, warningMessage);

  return (
    <div className={className}>
      <progress className={styles.Progress} value={parsedProgress} max="100" />
      <div className={styles.Indicator} style={{width: `${parsedProgress}%`}}>
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

export default withAppProvider<Props>()(ProgressBar);
