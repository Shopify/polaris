import {PlayMinor} from '@shopify/polaris-icons';

import {useI18n} from '../../utilities/i18n';
import {
  secondsToTimeComponents,
  secondsToTimestamp,
  secondsToDurationTranslationKey,
} from '../../utilities/duration';
import {useMediaQuery} from '../../utilities/media-query';
import {Icon} from '../Icon';
import {LegacyStack} from '../LegacyStack';
import {Text} from '../Text';

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
  /**
   * Indicate whether to allow video progress to be displayed
   * @default false
   */
  showVideoProgress?: boolean;
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
  showVideoProgress = false,
  accessibilityLabel,
  onClick,
  onBeforeStartPlaying,
}: VideoThumbnailProps) {
  const i18n = useI18n();
  const {isNavigationCollapsed} = useMediaQuery();
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
    <div className={styles.Timestamp}>
      <LegacyStack alignment="center" spacing="extraTight">
        <span className={styles.PlayIcon}>
          <Icon source={PlayMinor} />
        </span>
        <Text
          variant={isNavigationCollapsed ? 'bodyLg' : 'bodyMd'}
          as="p"
          fontWeight="semibold"
        >
          {secondsToTimestamp(videoLength)}
        </Text>
      </LegacyStack>
    </div>
  ) : null;

  let progressMarkup = null;

  if (showVideoProgress) {
    const progressValue = calculateProgress(videoLength, videoProgress);
    const progressValuePercents = Math.round(progressValue * 100);

    /* eslint-disable @shopify/jsx-no-hardcoded-content */
    progressMarkup = (
      <div className={styles.Progress}>
        <progress
          className={styles.ProgressBar}
          value={progressValuePercents}
          max="100"
        />
        <div
          className={styles.Indicator}
          style={{transform: `scaleX(${progressValue})`}}
        >
          <span className={styles.Label}>{progressValuePercents}%</span>
        </div>
      </div>
    );
    /* eslint-enable @shopify/jsx-no-hardcoded-content */
  }

  return (
    <div className={styles.ThumbnailContainer}>
      <div
        className={styles.Thumbnail}
        style={{backgroundImage: `url(${thumbnailUrl})`}}
      />
      <button
        type="button"
        className={styles.PlayButton}
        aria-label={buttonLabel}
        onClick={onClick}
        onMouseEnter={onBeforeStartPlaying}
        onFocus={onBeforeStartPlaying}
        onTouchStart={onBeforeStartPlaying}
      >
        {timeStampMarkup}
      </button>
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
    const progress = parseFloat((videoProgress / videoLength).toFixed(2));
    return progress > 1 ? 1 : progress;
  }

  return 0;
}
