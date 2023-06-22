import React, {useState, useCallback, useEffect} from 'react';

import {classNames, variationName} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import {useIsAfterInitialMount} from '../../utilities/use-is-after-initial-mount';
import {Image} from '../Image';

import styles from './Avatar.scss';

type Experimental<T extends string> = `${T}-experimental`;

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

  const avatarBody =
    customer || !initials ? (
      <path
        fill="currentColor"
        d="M8.28 27.5A14.95 14.95 0 0120 21.8c4.76 0 8.97 2.24 11.72 5.7a14.02 14.02 0 01-8.25 5.91 14.82 14.82 0 01-6.94 0 14.02 14.02 0 01-8.25-5.9zM13.99 12.78a6.02 6.02 0 1112.03 0 6.02 6.02 0 01-12.03 0z"
      />
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
