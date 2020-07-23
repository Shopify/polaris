import React from 'react';

import {useI18n} from '../../utilities/i18n';
import {classNames} from '../../utilities/css';
import {
  secondsToTimeComponents,
  secondsToTimestamp,
  secondsToDurationTranslationKey,
} from '../../utilities/duration';

import {PlayIcon} from './illustrations';
import styles from './VideoThumbnail.scss';

export interface VideoThumbnailProps {
  /** URL source for thumbnail image. */
  thumbnailUrl: string;
  /**
   * Length of video in seconds.
   * @default 0
   */
  videoLength?: number;
  /**
   * Video progress in seconds. Displays a progress bar at the bottom of the thumbnail. Only renders when videoLength is also set.
   * @default 0
   */
  videoProgress?: number;
  /** Custom ARIA label for play button.
   * @default 'Play video of length {human readable duration}'
   */
  accessibilityLabel?: string;
  /** Callback on click or keypress of thumbnail. Use to trigger render of the video player in your chosen format, for example within a modal or fullscreen container. */
  onClick(): void;
  /** Callback on mouse enter, focus, or touch start of thumbnail. Use to trigger video preload. */
  onBeforeStartPlaying?(): void;
}

export function VideoThumbnail({
  thumbnailUrl,
  videoLength = 0,
  videoProgress = 0,
  accessibilityLabel,
  onClick,
  onBeforeStartPlaying,
}: VideoThumbnailProps) {
  const i18n = useI18n();
  let buttonLabel;

  if (accessibilityLabel) {
    buttonLabel = accessibilityLabel;
  } else if (videoLength) {
    const {hours, minutes, seconds} = secondsToTimeComponents(videoLength);

    buttonLabel = i18n.translate(
      'Polaris.VideoThumbnail.playButtonA11yLabel.defaultWithDuration',
      {
        duration: i18n.translate(secondsToDurationTranslationKey(videoLength), {
          hourCount: hours,
          minuteCount: minutes,
          secondCount: seconds,
        }),
      },
    );
  } else {
    buttonLabel = i18n.translate(
      'Polaris.VideoThumbnail.playButtonA11yLabel.default',
    );
  }

  const progressValue = calculateProgress(videoLength, videoProgress);

  const timeStampMarkup = videoLength ? (
    <p
      className={classNames(
        styles.Timestamp,
        progressValue && styles.WithProgress,
      )}
    >
      {secondsToTimestamp(videoLength)}
    </p>
  ) : null;

  const progressMarkup = progressValue ? (
    <div className={styles.Progress}>
      <progress
        className={styles.ProgressBar}
        value={progressValue}
        max="100"
      />
      <div className={styles.Indicator} style={{width: `${progressValue}%`}}>
        <span className={styles.Label}>{progressValue}%</span>
      </div>
    </div>
  ) : null;

  return (
    <div
      className={styles.Thumbnail}
      style={{backgroundImage: `url(${thumbnailUrl})`}}
    >
      <button
        type="button"
        className={styles.PlayButton}
        aria-label={buttonLabel}
        onClick={onClick}
        onMouseEnter={onBeforeStartPlaying}
        onFocus={onBeforeStartPlaying}
        onTouchStart={onBeforeStartPlaying}
      >
        <img className={styles.PlayIcon} src={PlayIcon} alt="" />
      </button>
      {timeStampMarkup}
      {progressMarkup}
    </div>
  );
}

function calculateProgress(videoLength: number, videoProgress: number) {
  if (videoProgress > videoLength && process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn(
      'Value passed to the video progress should not exceed video length. Resetting progress to 100%.',
    );
  }

  if (videoProgress > 0 && videoLength > 0) {
    return Math.round((videoProgress / videoLength) * 100);
  }

  return 0;
}
