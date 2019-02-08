import * as React from 'react';
import {SVGSource} from '@shopify/images';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';

import {
  addMinor,
  alertMinor,
  arrowDownMinor,
  arrowLeftMinor,
  arrowRightMinor,
  arrowUpMinor,
  arrowUpDownMinor,
  calendarMinor,
  cancelMajor,
  cancelSmallMinor,
  caretDownMinor,
  caretUpMinor,
  checkmarkMinor,
  chevronDownMinor,
  chevronLeftMinor,
  chevronRightMinor,
  chevronUpMinor,
  circleCancelMinor,
  circleChevronDownMinor,
  circleChevronLeftMinor,
  circleChevronRightMinor,
  circleChevronUpMinor,
  circleInformationMajor,
  circlePlusMinor,
  circlePlusOutlineMinor,
  conversationMinor,
  deleteMinor,
  disableMinor,
  disputeMinor,
  duplicateMinor,
  embedMinor,
  exportMinor,
  externalMinor,
  helpMajor,
  homeMajor,
  horizontalDotsMinor,
  importMinor,
  logOutMinor,
  menuMajor,
  notesMinor,
  notificationMajor,
  onlineStoreMajor,
  ordersMajor,
  printMinor,
  productsMajor,
  profileMinor,
  subtractMinor,
  refreshMinor,
  riskMinor,
  saveMinor,
  searchMinor,
  viewMinor,
} from '../../icons';

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

export const BUNDLED_ICONS = {
  add: addMinor,
  alert: alertMinor,
  arrowDown: arrowDownMinor,
  arrowLeft: arrowLeftMinor,
  arrowRight: arrowRightMinor,
  arrowUp: arrowUpMinor,
  arrowUpDown: arrowUpDownMinor,
  calendar: calendarMinor,
  cancel: cancelMajor,
  cancelSmall: cancelSmallMinor,
  caretDown: caretDownMinor,
  caretUp: caretUpMinor,
  checkmark: checkmarkMinor,
  chevronDown: chevronDownMinor,
  chevronLeft: chevronLeftMinor,
  chevronRight: chevronRightMinor,
  chevronUp: chevronUpMinor,
  circleCancel: circleCancelMinor,
  circleChevronDown: circleChevronDownMinor,
  circleChevronLeft: circleChevronLeftMinor,
  circleChevronRight: circleChevronRightMinor,
  circleChevronUp: circleChevronUpMinor,
  circleInformation: circleInformationMajor,
  circlePlus: circlePlusMinor,
  circlePlusOutline: circlePlusOutlineMinor,
  conversation: conversationMinor,
  delete: deleteMinor,
  disable: disableMinor,
  dispute: disputeMinor,
  duplicate: duplicateMinor,
  embed: embedMinor,
  export: exportMinor,
  external: externalMinor,
  help: helpMajor,
  home: homeMajor,
  horizontalDots: horizontalDotsMinor,
  import: importMinor,
  logOut: logOutMinor,
  menu: menuMajor,
  notes: notesMinor,
  notification: notificationMajor,
  onlineStore: onlineStoreMajor,
  orders: ordersMajor,
  print: printMinor,
  products: productsMajor,
  profile: profileMinor,
  refresh: refreshMinor,
  risk: riskMinor,
  save: saveMinor,
  search: searchMinor,
  subtract: subtractMinor,
  view: viewMinor,
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

export default withAppProvider<Props>()(Icon);
