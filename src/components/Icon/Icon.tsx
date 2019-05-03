import * as React from 'react';
import {SVGSource} from '@shopify/images';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import {
  PlusMinor,
  AlertMinor,
  ArrowDownMinor,
  ArrowLeftMinor,
  ArrowRightMinor,
  ArrowUpMinor,
  ArrowUpDownMinor,
  CalendarMinor,
  MobileCancelMajorMonotone,
  CancelSmallMinor,
  CaretDownMinor,
  CaretUpMinor,
  TickSmallMinor,
  ChevronDownMinor,
  ChevronLeftMinor,
  ChevronRightMinor,
  ChevronUpMinor,
  CircleCancelMinor,
  CircleChevronDownMinor,
  CircleChevronLeftMinor,
  CircleChevronRightMinor,
  CircleChevronUpMinor,
  CircleInformationMajorTwotone,
  CirclePlusMinor,
  CirclePlusOutlineMinor,
  ConversationMinor,
  DeleteMinor,
  CircleDisableMinor,
  DisputeMinor,
  DuplicateMinor,
  EmbedMinor,
  ExportMinor,
  ExternalMinor,
  QuestionMarkMajorTwotone,
  HomeMajorMonotone,
  HorizontalDotsMinor,
  ImportMinor,
  LogOutMinor,
  MobileHamburgerMajorMonotone,
  NoteMinor,
  NotificationMajorMonotone,
  OnlineStoreMajorTwotone,
  OrdersMajorTwotone,
  PrintMinor,
  ProductsMajorTwotone,
  ProfileMinor,
  MinusMinor,
  RefreshMinor,
  RiskMinor,
  SaveMinor,
  SearchMinor,
  ViewMinor,
} from '@shopify/polaris-icons';

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

export const BUNDLED_ICONS = {
  add: PlusMinor,
  alert: AlertMinor,
  arrowDown: ArrowDownMinor,
  arrowLeft: ArrowLeftMinor,
  arrowRight: ArrowRightMinor,
  arrowUp: ArrowUpMinor,
  arrowUpDown: ArrowUpDownMinor,
  calendar: CalendarMinor,
  cancel: MobileCancelMajorMonotone,
  cancelSmall: CancelSmallMinor,
  caretDown: CaretDownMinor,
  caretUp: CaretUpMinor,
  checkmark: TickSmallMinor,
  chevronDown: ChevronDownMinor,
  chevronLeft: ChevronLeftMinor,
  chevronRight: ChevronRightMinor,
  chevronUp: ChevronUpMinor,
  circleCancel: CircleCancelMinor,
  circleChevronDown: CircleChevronDownMinor,
  circleChevronLeft: CircleChevronLeftMinor,
  circleChevronRight: CircleChevronRightMinor,
  circleChevronUp: CircleChevronUpMinor,
  circleInformation: CircleInformationMajorTwotone,
  circlePlus: CirclePlusMinor,
  circlePlusOutline: CirclePlusOutlineMinor,
  conversation: ConversationMinor,
  delete: DeleteMinor,
  disable: CircleDisableMinor,
  dispute: DisputeMinor,
  duplicate: DuplicateMinor,
  embed: EmbedMinor,
  export: ExportMinor,
  external: ExternalMinor,
  help: QuestionMarkMajorTwotone,
  home: HomeMajorMonotone,
  horizontalDots: HorizontalDotsMinor,
  import: ImportMinor,
  logOut: LogOutMinor,
  menu: MobileHamburgerMajorMonotone,
  notes: NoteMinor,
  notification: NotificationMajorMonotone,
  onlineStore: OnlineStoreMajorTwotone,
  orders: OrdersMajorTwotone,
  print: PrintMinor,
  products: ProductsMajorTwotone,
  profile: ProfileMinor,
  refresh: RefreshMinor,
  risk: RiskMinor,
  save: SaveMinor,
  search: SearchMinor,
  subtract: MinusMinor,
  view: ViewMinor,
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

export type UntrustedSVG = string;

export type IconSource =
  | React.ReactNode
  | React.SFC<React.SVGProps<SVGSVGElement>>
  | SVGSource
  | 'placeholder'
  | BundledIcon
  | UntrustedSVG;
export interface Props {
  /** The SVG contents to display in the icon. Icons should be in a 20 X 20 pixel viewbox */
  source: IconSource;
  /** Sets the color for the SVG fill */
  color?: Color;
  /** Show a backdrop behind the icon */
  backdrop?: boolean;
  /** Descriptive text to be read to screenreaders */
  accessibilityLabel?: string;
  /** Render the icon in an img tag instead of an svg. Prevents XSS */
  /** @deprecated the untrusted prop is deprecated and will be removed. All raw strings passed into the Icon component will be assumed to be untrusted */
  untrusted?: boolean;
}

export type CombinedProps = Props & WithAppProviderProps;

function Icon({
  source,
  color,
  backdrop,
  accessibilityLabel,
  untrusted = false,
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

  const defaultIconProps = {
    className: styles.Svg,
    focusable: 'false',
    'aria-hidden': 'true' as 'true',
  };

  if (untrusted) {
    // eslint-disable-next-line no-console
    console.warn(
      'Deprecation: The untrusted prop is no longer needed, all strings passed into the Icon component are rendered as unsafe',
    );
  }

  let SourceComponent = source as React.SFC<React.SVGProps<SVGSVGElement>>;
  let contentMarkup: React.ReactNode;
  if (source === 'placeholder') {
    contentMarkup = <div className={styles.Placeholder} />;
  } else if (isBundledIcon(source)) {
    SourceComponent = BUNDLED_ICONS[source];
    contentMarkup = <SourceComponent {...defaultIconProps} />;
  } else if (typeof source === 'function') {
    const sourceElement = <SourceComponent {...defaultIconProps} />;
    if (React.isValidElement(sourceElement)) {
      contentMarkup = sourceElement;
    }
  } else if (React.isValidElement(source)) {
    // eslint-disable-next-line no-console
    console.warn(
      'Deprecation: passing a React Element to the Icon component is deprecated and will be removed in the next major version. Pass a React Component instead.',
    );
    contentMarkup = source;
  } else if (isUntrustedSVG(source)) {
    contentMarkup = (
      <img
        className={styles.Img}
        src={`data:image/svg+xml;utf8,${source}`}
        alt=""
        aria-hidden="true"
      />
    );
  } else if (isSVGSource(source)) {
    contentMarkup = renderSVG(source);
  }

  return (
    <span className={className} aria-label={accessibilityLabel}>
      {contentMarkup}
    </span>
  );
}

function renderSVG(iconSource: SVGSource) {
  return (
    <svg
      className={styles.Svg}
      viewBox={iconSource.viewBox}
      dangerouslySetInnerHTML={{__html: iconSource.body}}
      focusable="false"
      aria-hidden="true"
    />
  );
}

function isBundledIcon(key: IconSource): key is BundledIcon {
  return typeof key === 'string' && Object.keys(BUNDLED_ICONS).includes(key);
}

function isSVGSource(source: IconSource): source is SVGSource {
  return (
    source != null &&
    source.hasOwnProperty('viewBox') &&
    source.hasOwnProperty('body')
  );
}

function isUntrustedSVG(source: IconSource): source is UntrustedSVG {
  return typeof source === 'string';
}

export default withAppProvider<Props>()(Icon);
