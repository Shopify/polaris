import React, {useState, useCallback, useEffect} from 'react';

import type {Experimental} from '../../types';
import {classNames, variationName} from '../../utilities/css';
import {useFeatures} from '../../utilities/features';
import {useI18n} from '../../utilities/i18n';
import {useIsAfterInitialMount} from '../../utilities/use-is-after-initial-mount';
import {Image} from '../Image';

import styles from './Avatar.scss';

type Size =
  | 'extraSmall'
  | 'small'
  | 'medium'
  | 'large'
  | Experimental<'xl' | '2xl'>;

type Shape = 'square' | 'round';

enum Status {
  Pending = 'PENDING',
  Loaded = 'LOADED',
  Errored = 'ERRORED',
}

export const STYLE_CLASSES = ['one', 'two', 'three', 'four', 'five'] as const;

const avatarStrokeWidth: {[S in Size]: string} = {
  extraSmall: '3',
  small: '2.5',
  medium: '2.5',
  large: '2.5',
  'xl-experimental': '2',
  '2xl-experimental': '1.5',
};

/**
 * Computes a rudimentary hash from a string by xoring the character codes
 * of all characters
 */
function xorHash(str: string) {
  let hash = 0;

  for (const char of str) {
    hash ^= char.charCodeAt(0);
  }

  return hash;
}

function styleClass(name?: string) {
  return name
    ? STYLE_CLASSES[xorHash(name) % STYLE_CLASSES.length]
    : STYLE_CLASSES[0];
}

export interface AvatarProps {
  /**
   * Size of avatar
   * @default 'medium'
   */
  size?: Size;
  /**
   * Shape of avatar
   * @default 'round'
   */
  shape?: Shape;
  /** The name of the person */
  name?: string;
  /** Initials of person to display */
  initials?: string;
  /** Whether the avatar is for a customer */
  customer?: boolean;
  /** URL of the avatar image which falls back to initials if the image fails to load */
  source?: string;
  /** Callback fired when the image fails to load  */
  onError?(): void;
  /** Accessible label for the avatar image */
  accessibilityLabel?: string;
}

export function Avatar({
  name,
  source,
  onError,
  initials,
  customer,
  size = 'medium',
  shape = 'round',
  accessibilityLabel,
}: AvatarProps) {
  const i18n = useI18n();
  const isAfterInitialMount = useIsAfterInitialMount();

  const [status, setStatus] = useState<Status>(Status.Pending);

  const {polarisSummerEditions2023} = useFeatures();

  // If the source changes, set the status back to pending
  useEffect(() => {
    setStatus(Status.Pending);
  }, [source]);

  const handleError = useCallback(() => {
    setStatus(Status.Errored);
    if (onError) {
      onError();
    }
  }, [onError]);
  const handleLoad = useCallback(() => {
    setStatus(Status.Loaded);
  }, []);

  const hasImage = source && status !== Status.Errored;

  const nameString = name || initials;

  let label: string | undefined;

  if (accessibilityLabel) {
    label = accessibilityLabel;
  } else if (name) {
    label = name;
  } else if (initials) {
    const splitInitials = initials.split('').join(' ');
    label = i18n.translate('Polaris.Avatar.labelWithInitials', {
      initials: splitInitials,
    });
  } else {
    label = i18n.translate('Polaris.Avatar.label');
  }

  const className = classNames(
    styles.Avatar,
    size && styles[variationName('size', size)],
    hasImage && status === Status.Loaded && styles.imageHasLoaded,
    shape && styles[variationName('shape', shape)],
    !customer &&
      !source &&
      styles[variationName('style', styleClass(nameString))],
  );

  const textClassName = classNames(
    styles.Text,
    (initials?.length || 0) > 2 && styles.long,
  );

  const imageClassName = classNames(
    styles.Image,
    status !== Status.Loaded && styles.hidden,
  );

  const imageMarkUp =
    source && isAfterInitialMount && status !== Status.Errored ? (
      <Image
        className={imageClassName}
        source={source}
        alt=""
        role="presentation"
        onLoad={handleLoad}
        onError={handleError}
      />
    ) : null;
  // Use `dominant-baseline: central` instead of `dy` when Edge supports it.
  const verticalOffset = '0.35em';

  const avatarPath = polarisSummerEditions2023 ? (
    <>
      <path
        fill="none"
        d="M25.5 13.5C25.5 16.5376 23.0376 19 20 19C16.9624 19 14.5 16.5376 14.5 13.5C14.5 10.4624 16.9624 8 20 8C23.0376 8 25.5 10.4624 25.5 13.5Z"
        stroke="currentColor"
        stroke-width={avatarStrokeWidth[size]}
      />
      <path
        fill="none"
        d="M10.3433 29.682L9.47 31.254C9.03481 32.0373 9.60125 33 10.4974 33H29.5026C30.3988 33 30.9652 32.0373 30.53 31.254L29.6567 29.682C27.7084 26.175 24.0119 24 20 24C15.9882 24 12.2916 26.175 10.3433 29.682Z"
        stroke="currentColor"
        stroke-width={avatarStrokeWidth[size]}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </>
  ) : (
    <path
      fill="currentColor"
      d="M8.28 27.5A14.95 14.95 0 0120 21.8c4.76 0 8.97 2.24 11.72 5.7a14.02 14.02 0 01-8.25 5.91 14.82 14.82 0 01-6.94 0 14.02 14.02 0 01-8.25-5.9zM13.99 12.78a6.02 6.02 0 1112.03 0 6.02 6.02 0 01-12.03 0z"
    />
  );

  const avatarBody =
    customer || !initials ? (
      avatarPath
    ) : (
      <text
        className={textClassName}
        x="50%"
        y="50%"
        dy={verticalOffset}
        fill="currentColor"
        textAnchor="middle"
      >
        {initials}
      </text>
    );

  const svgMarkup = hasImage ? null : (
    <span className={styles.Initials}>
      <svg className={styles.Svg} viewBox="0 0 40 40">
        {avatarBody}
      </svg>
    </span>
  );

  return (
    <span aria-label={label} role="img" className={className}>
      {svgMarkup}
      {imageMarkUp}
    </span>
  );
}
