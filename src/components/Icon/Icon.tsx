import React from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {withAppProvider, WithAppProviderProps} from '../AppProvider';

import styles from './Icon.scss';

export type Color =
  | 'white'
  | 'black'
  | 'skyLighter'
  | 'skyLight'
  | 'sky'
  | 'skyDark'
  | 'inkLightest'
  | 'inkLighter'
  | 'inkLight'
  | 'ink'
  | 'blueLighter'
  | 'blueLight'
  | 'blue'
  | 'blueDark'
  | 'blueDarker'
  | 'indigoLighter'
  | 'indigoLight'
  | 'indigo'
  | 'indigoDark'
  | 'indigoDarker'
  | 'tealLighter'
  | 'tealLight'
  | 'teal'
  | 'tealDark'
  | 'tealDarker'
  | 'greenLighter'
  | 'green'
  | 'greenDark'
  | 'yellowLighter'
  | 'yellow'
  | 'yellowDark'
  | 'orange'
  | 'redLighter'
  | 'red'
  | 'redDark'
  | 'purple';

const COLORS_WITH_BACKDROPS = [
  'teal',
  'tealDark',
  'greenDark',
  'redDark',
  'yellowDark',
  'ink',
  'inkLighter',
];

export type IconSource =
  | React.SFC<React.SVGProps<SVGSVGElement>>
  | 'placeholder'
  | string;

export interface Props {
  /** The SVG contents to display in the icon (icons should fit in a 20 × 20 pixel viewBox) */
  source: IconSource;
  /** Set the color for the SVG fill */
  color?: Color;
  /** Show a backdrop behind the icon */
  backdrop?: boolean;
  /** Descriptive text to be read to screenreaders */
  accessibilityLabel?: string;
}

export type CombinedProps = Props & WithAppProviderProps;

function Icon({
  source,
  color,
  backdrop,
  accessibilityLabel,
  polaris: {intl},
}: CombinedProps) {
  if (color && backdrop && COLORS_WITH_BACKDROPS.indexOf(color) < 0) {
    // eslint-disable-next-line no-console
    console.warn(
      intl.translate('Polaris.Icon.backdropWarning', {
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
  } else if (typeof source === 'string') {
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

export default withAppProvider<Props>()(Icon);
