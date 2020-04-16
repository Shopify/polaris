import React from 'react';

import {useI18n} from '../../utilities/i18n';
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
  /** Length of video in seconds. */
  videoLength?: number;
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
  videoLength,
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

  const timeStampMarkup = videoLength ? (
    <p className={styles.Timestamp}>{secondsToTimestamp(videoLength)}</p>
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
    </div>
  );
}
