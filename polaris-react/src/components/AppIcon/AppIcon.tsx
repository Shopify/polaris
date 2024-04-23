import React from 'react';

import {classNames} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import {Image} from '../Image';

import styles from './AppIcon.module.css';
import type {AppIconSize} from './types';

export interface AppIconProps {
  source?: string;
  appTitle?: string;
  onClick?: () => void;
  size?: AppIconSize;
}

const getStyleFor = (size: AppIconSize) => {
  if (size === 'sm') {
    return styles.small;
  } else if (size === 'md') {
    return styles.medium;
  } else if (size === 'lg') {
    return styles.large;
  } else if (size === 'xl') {
    return styles.xlarge;
  }

  return styles.medium;
};

export function AppIcon({
  source,
  appTitle,
  onClick,
  size = 'md',
}: AppIconProps) {
  const i18n = useI18n();

  const imageClassNames = classNames(styles.Image, getStyleFor(size));

  const linkClassNames = classNames(
    styles.IconLink,
    !onClick ? styles.LinkDisabled : undefined,
  );

  const titleTranslationKey = `Polaris.AppIcon.${
    appTitle ? 'accessibilityLabelWithAppTitle' : 'accessibilityLabel'
  }`;

  const altTranslationKey = `Polaris.AppIcon.${
    appTitle ? 'altWithAppTitle' : 'alt'
  }`;

  const handleOnClick = () => {
    return onClick ? onClick() : undefined;
  };

  return (
    <div
      aria-label={i18n.translate(titleTranslationKey, {
        app: appTitle ?? '',
      })}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={!onClick ? undefined : 0}
      onClick={handleOnClick}
      role={source ? 'link' : 'region'}
      className={linkClassNames}
    >
      {source && (
        <Image
          className={imageClassNames}
          source={source}
          alt={i18n.translate(altTranslationKey, {app: appTitle ?? ''})}
        />
      )}
      {!source && <div className={imageClassNames} />}
    </div>
  );
}
