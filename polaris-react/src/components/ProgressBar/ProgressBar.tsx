import React, {useRef} from 'react';
import {CSSTransition} from 'react-transition-group';

import {classNames, variationName} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import {useTheme} from '../../utilities/use-theme';

import styles from './ProgressBar.scss';

type Size = 'small' | 'medium' | 'large';
type Tone = 'highlight' | 'primary' | 'success' | 'critical';

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
   * Whether the fill animation is triggered
   * @default 'true'
   */
  animated?: boolean;
  /**
   * Id (ids) of element (elements) that describes progressbar
   */
  ariaLabelledBy?: string;
  /**
   * Color of progressbar
   * @default 'highlight'
   */
  tone?: Tone;
}

export function ProgressBar({
  progress = 0,
  size = 'medium',
  tone = 'highlight',
  animated: hasAppearAnimation = true,
  ariaLabelledBy,
}: ProgressBarProps) {
  const theme = useTheme();
  const i18n = useI18n();
  const indicatorRef = useRef<HTMLDivElement>(null);

  const className = classNames(
    styles.ProgressBar,
    size && styles[variationName('size', size)],
    tone && styles[variationName('tone', tone)],
  );

  const warningMessage = i18n.translate(
    progress < 0
      ? 'Polaris.ProgressBar.negativeWarningMessage'
      : 'Polaris.ProgressBar.exceedWarningMessage',
    {progress},
  );

  const parsedProgress = parseProgress(progress, warningMessage);

  const progressBarDuration = hasAppearAnimation
    ? theme.motion['motion-duration-500']
    : theme.motion['motion-duration-0'];

  /* eslint-disable @shopify/jsx-no-hardcoded-content */
  return (
    <div className={className}>
      <progress
        aria-labelledby={ariaLabelledBy}
        className={styles.Progress}
        value={parsedProgress}
        max="100"
      />
      <CSSTransition
        in
        appear
        timeout={parseInt(progressBarDuration, 10)}
        nodeRef={indicatorRef}
        classNames={{
          appearActive: styles.IndicatorAppearActive,
          appearDone: styles.IndicatorAppearDone,
        }}
      >
        <div
          ref={indicatorRef}
          className={styles.Indicator}
          style={
            {
              '--pc-progress-bar-duration': progressBarDuration,
              '--pc-progress-bar-percent': parsedProgress / 100,
            } as React.CSSProperties
          }
        >
          <span className={styles.Label}>{parsedProgress}%</span>
        </div>
      </CSSTransition>
    </div>
    /* eslint-enable @shopify/jsx-no-hardcoded-content */
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
