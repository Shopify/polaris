import React from 'react';
import {useI18n} from '../../utilities/i18n';

import {PlayIcon} from './illustrations';
import {secondsToFormatPretty} from './utilities';

import styles from './VideoThumbnail.scss';

export interface VideoThumbnailProps {
  thumbnailUrl: string;
  videoLength?: number;
  /** Custom ARIA label for play button.
   * @default 'Play video'
   */
  accessibilityLabel?: string;
  onClick(): void;
  onBeforeStartPlaying?(): void;
}

export const VideoThumbnail = ({
  thumbnailUrl,
  videoLength,
  /** Custom ARIA label for play button.
   * @default 'Play video'
   */
  accessibilityLabel,
  onClick,
  onBeforeStartPlaying,
}: VideoThumbnailProps) => {
  const i18n = useI18n();
  const videoLengthParsed = secondsToFormatPretty(videoLength);
  const length = videoLengthParsed
    ? `${
        videoLengthParsed!.hours
          ? i18n.translate('Polaris.VideoThumbnail.hoursLabel', {
              hours: videoLengthParsed!.hours,
            })
          : ''
      } ${
        videoLengthParsed!.minutes
          ? i18n.translate('Polaris.VideoThumbnail.minutesLabel', {
              minutes: videoLengthParsed!.minutes,
            })
          : ''
      } ${
        videoLengthParsed!.seconds
          ? i18n.translate('Polaris.VideoThumbnail.secondsLabel', {
              seconds: videoLengthParsed!.seconds,
            })
          : ''
      }`
    : null;

  const defaultLabel = length
    ? i18n.translate('Polaris.VideoThumbnail.playButtonWithTime', {
        length,
      })
    : i18n.translate('Polaris.VideoThumbnail.playButtonDefault');

  const buttonLabel = accessibilityLabel ? accessibilityLabel : defaultLabel;

  const videoLengthMarkup = videoLengthParsed ? (
    <p className={styles.Timestamp}>{videoLengthParsed!.timeLabel}</p>
  ) : null;

  return (
    <div
      className={styles.Thumbnail}
      style={{backgroundImage: `url(${thumbnailUrl})`}}
    >
      <button
        type="button"
        className={styles.PlayButton}
        onClick={onClick}
        onMouseEnter={onBeforeStartPlaying}
        onTouchStart={onBeforeStartPlaying}
        aria-label={buttonLabel}
      >
        <img className={styles.PlayIcon} src={PlayIcon} alt="" />
      </button>
      {videoLengthMarkup}
    </div>
  );
};
