import React, {useEffect} from 'react';
import {classNames, variationName} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import {useMonorail} from '../../utilities/monorail';
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
  const unstableMonorail = useMonorail();

  /* eslint-disable babel/camelcase */
  useEffect(() => {
    if (unstableMonorail) {
      let loggedSource;
      if (typeof source === 'function') {
        loggedSource = source.name;
      } else if (source === 'placeholder') {
        loggedSource = source;
      } else {
        loggedSource = 'custom icon string';
      }

      unstableMonorail.produce('polaris_icons_usage/1.0', {
        icon_source: loggedSource,
        color,
        backdrop,
        accessibility_label: accessibilityLabel,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source]);
  /* eslint-enable babel/camelcase */

  if (color && backdrop && COLORS_WITH_BACKDROPS.indexOf(color) < 0) {
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
