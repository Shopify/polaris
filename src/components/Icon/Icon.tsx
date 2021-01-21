import React from 'react';

import {classNames, variationName} from '../../utilities/css';
import {isNewDesignLanguageColor} from '../../utilities/color-new-design-language';
import {useFeatures} from '../../utilities/features';
import {useI18n} from '../../utilities/i18n';
import type {IconProps} from '../../types';

import styles from './Icon.scss';

const COLORS_WITH_BACKDROPS = [
  'blueDark',
  'teal',
  'tealDark',
  'greenDark',
  'redDark',
  'yellowDark',
  'ink',
  'inkLighter',
  // new DL colors
  'base',
  'subdued',
  'critical',
  'warning',
  'highlight',
  'success',
  'primary',
];

// This is needed for the polaris
// styleguide to generate the props explorer
interface Props extends IconProps {}

export function Icon({source, color, backdrop, accessibilityLabel}: Props) {
  const i18n = useI18n();
  const {newDesignLanguage} = useFeatures();

  let sourceType: 'function' | 'placeholder' | 'external';
  if (typeof source === 'function') {
    sourceType = 'function';
  } else if (source === 'placeholder') {
    sourceType = 'placeholder';
  } else {
    sourceType = 'external';
  }

  if (color && backdrop && !COLORS_WITH_BACKDROPS.includes(color)) {
    // eslint-disable-next-line no-console
    console.warn(
      i18n.translate('Polaris.Icon.backdropWarning', {
        color,
        colorsWithBackDrops: COLORS_WITH_BACKDROPS.join(', '),
      }),
    );
  }

  if (
    color &&
    sourceType === 'external' &&
    newDesignLanguage === true &&
    isNewDesignLanguageColor(color)
  ) {
    // eslint-disable-next-line no-console
    console.warn(
      'Recoloring external SVGs is not supported with colors in the new design language. Set the intended color on your SVG instead.',
    );
  }

  const className = classNames(
    styles.Icon,
    color && styles[variationName('color', color)],
    color && color !== 'white' && styles.isColored,
    backdrop && styles.hasBackdrop,
    newDesignLanguage && styles.newDesignLanguage,
  );

  const SourceComponent = source;
  const contentMarkup = {
    function: (
      <SourceComponent
        className={styles.Svg}
        focusable="false"
        aria-hidden="true"
      />
    ),
    placeholder: <div className={styles.Placeholder} />,
    external: (
      <img
        className={styles.Img}
        src={`data:image/svg+xml;utf8,${source}`}
        alt=""
        aria-hidden="true"
      />
    ),
  };

  return (
    <span className={className} aria-label={accessibilityLabel}>
      {contentMarkup[sourceType]}
    </span>
  );
}
