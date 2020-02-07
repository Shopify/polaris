import React, {useCallback} from 'react';
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
        ? i18n.translate('Polaris.VideoThumbnail.hoursLabel', {
            hours: videoLengthParsed!.hours,
          })
        : ''
    } ${
      videoLengthParsed && videoLengthParsed!.minutes
        ? i18n.translate('Polaris.VideoThumbnail.minutesLabel', {
            minutes: videoLengthParsed!.minutes,
          })
        : ''
    } ${
      videoLengthParsed && videoLengthParsed!.seconds
        ? i18n.translate('Polaris.VideoThumbnail.secondsLabel', {
            seconds: videoLengthParsed!.seconds,
          })
        : ''
    }`;
  }, [i18n, videoLengthParsed]);

  const buttonLabel =
    accessibilityLabel ||
    (videoLengthParsed
      ? `${i18n.translate(
          'Polaris.VideoThumbnail.playButtonWithTime',
        )}${getTimeLabel()}`
      : i18n.translate('Polaris.VideoThumbnail.playButtonDefault'));
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

function noop() {}
