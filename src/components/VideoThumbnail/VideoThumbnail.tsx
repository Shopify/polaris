import React, {useCallback} from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {useI18n} from '../../utilities/i18n';

import {PlayIcon} from './illustrations';
import {secondsToFormatPretty} from './utilities/time';
import styles from './VideoThumbnail.scss';

export interface VideoThumbnailProps {
  thumbnailUrl: string;
  videoLength?: number;
  accessibilityLabel?: string;
  onClick(): void;
  onBeforeStartPlaying?(): void;
}

export const VideoThumbnail = ({
  thumbnailUrl,
  videoLength,
  accessibilityLabel,
  onClick,
  onBeforeStartPlaying = noop,
}: VideoThumbnailProps) => {
  const i18n = useI18n();
  const videoLengthParsed = videoLength
    ? secondsToFormatPretty(videoLength)
    : null;

  const getTimeLabel = useCallback(() => {
    return `${
      videoLengthParsed && videoLengthParsed!.hours
        ? i18n.translate('VideoThumbnail.hoursLabel', {
            count: videoLengthParsed!.hours,
          })
        : ''
    } ${
      videoLengthParsed && videoLengthParsed!.minutes
        ? i18n.translate('VideoThumbnail.minutesLabel', {
            count: videoLengthParsed!.minutes,
          })
        : ''
    } ${
      videoLengthParsed && videoLengthParsed!.seconds
        ? i18n.translate('VideoThumbnail.secondsLabel', {
            count: videoLengthParsed!.seconds,
          })
        : ''
    }`;
  }, [i18n, videoLengthParsed]);

  const buttonLabel =
    accessibilityLabel ||
    (videoLengthParsed
      ? `${i18n.translate(
          'VideoThumbnail.playButtonWithTime',
        )}${getTimeLabel()}`
      : i18n.translate('VideoThumbnail.playButtonDefault'));
  const videoLengthMarkup = videoLength ? (
    <p className={styles.Timestamp}>{videoLengthParsed!.timeLabel}</p>
  ) : null;

  return (
    <div
      className={styles.Thumbnail}
      style={{
        backgroundImage: `url(${thumbnailUrl})`,
      }}
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
