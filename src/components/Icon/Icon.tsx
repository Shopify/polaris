import * as React from 'react';
import {SVGSource} from '@shopify/images';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';

import {
  add,
  alert,
  arrowDown,
  arrowLeft,
  arrowRight,
  arrowUp,
  arrowUpDown,
  calendar,
  cancel,
  cancelSmall,
  caretDown,
  caretUp,
  checkmark,
  chevronDown,
  chevronLeft,
  chevronRight,
  chevronUp,
  circleCancel,
  circleChevronDown,
  circleChevronLeft,
  circleChevronRight,
  circleChevronUp,
  circleInformation,
  circlePlus,
  circlePlusOutline,
  conversation,
  deleteIcon,
  disable,
  dispute,
  duplicate,
  embed,
  exportIcon,
  external,
  help,
  home,
  horizontalDots,
  importIcon,
  logOut,
  notes,
  notification,
  onlineStore,
  orders,
  print,
  products,
  profile,
  refresh,
  risk,
  save,
  search,
  subtract,
  view,
} from '../../icons';

import * as styles from './Icon.scss';

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

export const BUNDLED_ICONS = {
  add,
  alert,
  arrowDown,
  arrowLeft,
  arrowRight,
  arrowUp,
  arrowUpDown,
  calendar,
  cancel,
  cancelSmall,
  caretDown,
  caretUp,
  checkmark,
  chevronDown,
  chevronLeft,
  chevronRight,
  chevronUp,
  circleCancel,
  circleChevronDown,
  circleChevronLeft,
  circleChevronRight,
  circleChevronUp,
  circleInformation,
  circlePlus,
  circlePlusOutline,
  conversation,
  delete: deleteIcon,
  disable,
  dispute,
  duplicate,
  embed,
  export: exportIcon,
  external,
  help,
  home,
  horizontalDots,
  import: importIcon,
  logOut,
  notes,
  notification,
  onlineStore,
  orders,
  print,
  products,
  profile,
  refresh,
  risk,
  save,
  search,
  subtract,
  view,
};

const COLORS_WITH_BACKDROPS = [
  'teal',
  'tealDark',
  'greenDark',
  'redDark',
  'yellowDark',
  'ink',
  'inkLighter',
];

export type BundledIcon = keyof typeof BUNDLED_ICONS;

export type IconSource =
  | React.ReactNode
  | SVGSource
  | 'placeholder'
  | BundledIcon;
export interface Props {
  /** The SVG contents to display in the icon. Icons should be in a 20 X 20 pixel viewbox */
  source: IconSource;
  /** Sets the color for the SVG fill */
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
  if (source === 'placeholder') {
    contentMarkup = <div className={styles.Placeholder} />;
  } else if (React.isValidElement(source)) {
    contentMarkup = source;
  } else {
    const iconSource =
      typeof source === 'string' && isBundledIcon(source)
        ? BUNDLED_ICONS[source]
        : source;
    contentMarkup = iconSource &&
      iconSource.viewBox &&
      iconSource.body && (
        <svg
          className={styles.Svg}
          viewBox={iconSource.viewBox}
          dangerouslySetInnerHTML={{__html: iconSource.body}}
          focusable="false"
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

function isBundledIcon(key: string | BundledIcon): key is BundledIcon {
  return Object.keys(BUNDLED_ICONS).includes(key);
}

export default withAppProvider()(Icon);
