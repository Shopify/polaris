import React from 'react';
import {classNames, variationName} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import {IconProps} from '../../types';

import styles from './Icon.scss';

const COLORS_WITH_BACKDROPS = [
  'teal',
  'tealDark',
  'greenDark',
  'redDark',
  'yellowDark',
  'ink',
  'inkLighter',
];

// This is needed for the polaris
// styleguide to generate the props explorer
interface Props extends IconProps {}

export function Icon({source, color, backdrop, accessibilityLabel}: Props) {
  const i18n = useI18n();

  if (color && backdrop && !COLORS_WITH_BACKDROPS.includes(color)) {
    // eslint-disable-next-line no-console
    console.warn(
      i18n.translate('Polaris.Icon.backdropWarning', {
        color,
        colorsWithBackDrops: COLORS_WITH_BACKDROPS.join(', '),
      }),
    );
  }

  const className = classNames(
    styles.Icon,
    color && styles[variationName('color', color)],
    color && color !== 'white' && styles.isColored,
    backdrop && styles.hasBackdrop,
  );

  let contentMarkup: React.ReactNode;
  if (typeof source === 'function') {
    const SourceComponent = source;
    contentMarkup = (
      <SourceComponent
        className={styles.Svg}
        focusable="false"
        aria-hidden="true"
      />
    );
  } else if (source === 'placeholder') {
    contentMarkup = <div className={styles.Placeholder} />;
  } else {
    contentMarkup = (
      <img
        className={styles.Img}
        src={`data:image/svg+xml;utf8,${source}`}
        alt=""
        aria-hidden="true"
      />
    );
  }

  return (
    <span className={className} aria-label={accessibilityLabel}>
      {contentMarkup}
    </span>
  );
}
