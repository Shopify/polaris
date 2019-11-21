import React, {useState, useCallback, useEffect} from 'react';

import {classNames, variationName} from '../../utilities/css';
import {useFeatures} from '../../utilities/features';
import {useI18n} from '../../utilities/i18n';
import {isServer} from '../../utilities/target';
import {Image} from '../Image';

import styles from './Avatar.scss';

type Size = 'small' | 'medium' | 'large';

enum Status {
  Pending = 'PENDING',
  Loaded = 'LOADED',
  Errored = 'ERRORED',
}

export const STYLE_CLASSES = ['one', 'two', 'three', 'four', 'five'];

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
    styles[variationName('style', styleClass(nameString))],
    size && styles[variationName('size', size)],
    (hasImage || (initials && initials.length === 0)) &&
      status !== Status.Loaded &&
      styles.hidden,
    hasImage && styles.hasImage,
  );

  const imageMarkUp =
    source && !isServer && status !== Status.Errored ? (
      <Image
        className={styles.Image}
        source={source}
        alt=""
        role="presentation"
        onLoad={handleLoad}
        onError={handleError}
      />
    ) : null;

  // Use `dominant-baseline: central` instead of `dy` when Edge supports it.
  const verticalOffset = '0.35em';

  const svgMarkup = !hasImage ? (
    <span className={styles.Initials}>
      <svg className={styles.Svg} viewBox="0 0 40 40">
        {avatarBody()}
      </svg>
    </span>
  ) : null;

  return (
    <span aria-label={label} role="img" className={className}>
      {svgMarkup}
      {imageMarkUp}
    </span>
  );

  function avatarBody() {
    return customer ? (
      <g fill="currentColor" fill-rule="nonzero">
        <path d="M8.28 27.5A14.95 14.95 0 0120 21.8c4.76 0 8.97 2.24 11.72 5.7a14.02 14.02 0 01-8.25 5.91 14.82 14.82 0 01-6.94 0 14.02 14.02 0 01-8.25-5.9zM13.99 12.78a6.02 6.02 0 1112.03 0 6.02 6.02 0 01-12.03 0z" />
      </g>
    ) : (
      <text
        x="50%"
        y="50%"
        dy={verticalOffset}
        fill="currentColor"
        fontSize="20"
        textAnchor="middle"
      >
        {initials}
      </text>
    );
  }
}
