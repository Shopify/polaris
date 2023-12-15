import React, {useState, useCallback, useEffect} from 'react';

import {classNames, variationName} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import {useIsAfterInitialMount} from '../../utilities/use-is-after-initial-mount';
import {Image} from '../Image';

import styles from './Avatar.module.scss';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

enum Status {
  Pending = 'PENDING',
  Loaded = 'LOADED',
  Errored = 'ERRORED',
}

export const STYLE_CLASSES = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
] as const;

const avatarStrokeWidth: {[S in Size]: string} = {
  xs: '3',
  sm: '2.5',
  md: '2.5',
  lg: '2.5',
  xl: '2',
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
  size = 'md',
  accessibilityLabel,
}: AvatarProps) {
  const i18n = useI18n();
  const isAfterInitialMount = useIsAfterInitialMount();

  const [status, setStatus] = useState<Status>(Status.Pending);

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
  }

  const className = classNames(
    styles.Avatar,
    size && styles[variationName('size', size)],
    hasImage && status === Status.Loaded && styles.imageHasLoaded,
    !customer &&
      !hasImage &&
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

  const avatarPath = (
    <>
      <path
        fill="none"
        d="M25.5 13.5C25.5 16.5376 23.0376 19 20 19C16.9624 19 14.5 16.5376 14.5 13.5C14.5 10.4624 16.9624 8 20 8C23.0376 8 25.5 10.4624 25.5 13.5Z"
        stroke="currentColor"
        strokeWidth={avatarStrokeWidth[size]}
      />
      <path
        fill="none"
        d="M10.3433 29.682L9.47 31.254C9.03481 32.0373 9.60125 33 10.4974 33H29.5026C30.3988 33 30.9652 32.0373 30.53 31.254L29.6567 29.682C27.7084 26.175 24.0119 24 20 24C15.9882 24 12.2916 26.175 10.3433 29.682Z"
        stroke="currentColor"
        strokeWidth={avatarStrokeWidth[size]}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
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
    <span
      aria-label={label}
      role={label ? 'img' : 'presentation'}
      className={className}
    >
      {svgMarkup}
      {imageMarkUp}
    </span>
  );
}
