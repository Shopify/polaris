import React, {useState, useCallback, useEffect} from 'react';

import {classNames, variationName} from '../../utilities/css';
import {useFeatures} from '../../utilities/features';
import {useI18n} from '../../utilities/i18n';
import {isServer} from '../../utilities/target';
import {Image} from '../Image';

import styles from './Avatar.scss';
import * as avatars from './images';

type Size = 'small' | 'medium' | 'large';

enum Status {
  Pending = 'PENDING',
  Loaded = 'LOADED',
  Errored = 'ERRORED',
}

const STYLE_CLASSES = ['one', 'two', 'three', 'four', 'five'];
const AVATAR_IMAGES = Object.keys(avatars).map(
  // import/namespace does not allow computed values by default
  // eslint-disable-next-line import/namespace
  (key: keyof typeof avatars) => avatars[key],
);

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
  /** Accessible label for the avatar image */
  accessibilityLabel?: string;
}

export function Avatar({
  name,
  source,
  initials,
  customer,
  size = 'medium',
  accessibilityLabel,
}: AvatarProps) {
  const i18n = useI18n();
  const {unstableGlobalTheming = false} = useFeatures();

  function styleClass(name?: string) {
    const finalStyleClasses = unstableGlobalTheming
      ? STYLE_CLASSES
      : [...STYLE_CLASSES, 'six'];
    return name
      ? finalStyleClasses[name.charCodeAt(0) % finalStyleClasses.length]
      : finalStyleClasses[0];
  }

  const [status, setStatus] = useState<Status>(Status.Pending);

  // If the source changes, set the status back to pending
  useEffect(() => {
    setStatus(Status.Pending);
  }, [source]);

  const handleError = useCallback(() => {
    setStatus(Status.Errored);
  }, []);
  const handleLoad = useCallback(() => {
    setStatus(Status.Loaded);
  }, []);

  const hasImage = (source || customer) && status !== Status.Errored;

  const nameString = name || initials;

  let finalSource: string | undefined;
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

  if (source) {
    finalSource = source;
  } else if (customer) {
    finalSource = customerPlaceholder(nameString);
  }

  const className = classNames(
    styles.Avatar,
    styles[variationName('style', styleClass(nameString))],
    size && styles[variationName('size', size)],
    hasImage && status !== Status.Loaded && styles.hidden,
    hasImage && styles.hasImage,
  );

  const imageMarkUp =
    finalSource && !isServer && status !== Status.Errored ? (
      <Image
        className={styles.Image}
        source={finalSource}
        alt=""
        role="presentation"
        onLoad={handleLoad}
        onError={handleError}
      />
    ) : null;

  // Use `dominant-baseline: central` instead of `dy` when Edge supports it.
  const verticalOffset = '0.35em';

  const initialsMarkup =
    initials && !hasImage ? (
      <span className={styles.Initials}>
        <svg className={styles.Svg} viewBox="0 0 48 48">
          <text
            x="50%"
            y="50%"
            dy={verticalOffset}
            fill="currentColor"
            fontSize="26"
            textAnchor="middle"
          >
            {initials}
          </text>
        </svg>
      </span>
    ) : null;

  return (
    <span aria-label={label} role="img" className={className}>
      {initialsMarkup}
      {imageMarkUp}
    </span>
  );
}

function customerPlaceholder(name?: string) {
  return name
    ? AVATAR_IMAGES[name.charCodeAt(0) % AVATAR_IMAGES.length]
    : AVATAR_IMAGES[0];
}
