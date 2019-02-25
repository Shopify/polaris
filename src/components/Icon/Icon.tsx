import * as React from 'react';
import {SVGSource} from '@shopify/images';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';

import {
  AddMinor,
  AlertMinor,
  ArrowDownMinor,
  ArrowLeftMinor,
  ArrowRightMinor,
  ArrowUpMinor,
  ArrowUpDownMinor,
  CalendarMinor,
  CancelMajor,
  CancelSmallMinor,
  CaretDownMinor,
  CaretUpMinor,
  CheckmarkMinor,
  ChevronDownMinor,
  ChevronLeftMinor,
  ChevronRightMinor,
  ChevronUpMinor,
  CircleCancelMinor,
  CircleChevronDownMinor,
  CircleChevronLeftMinor,
  CircleChevronRightMinor,
  CircleChevronUpMinor,
  CircleInformationMajor,
  CirclePlusMinor,
  CirclePlusOutlineMinor,
  ConversationMinor,
  DeleteMinor,
  DisableMinor,
  DisputeMinor,
  DuplicateMinor,
  EmbedMinor,
  ExportMinor,
  ExternalMinor,
  HelpMajor,
  HomeMajor,
  HorizontalDotsMinor,
  ImportMinor,
  LogOutMinor,
  MenuMajor,
  NotesMinor,
  NotificationMajor,
  OnlineStoreMajor,
  OrdersMajor,
  PrintMinor,
  ProductsMajor,
  ProfileMinor,
  SubtractMinor,
  RefreshMinor,
  RiskMinor,
  SaveMinor,
  SearchMinor,
  ViewMinor,
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
  add: AddMinor,
  alert: AlertMinor,
  arrowDown: ArrowDownMinor,
  arrowLeft: ArrowLeftMinor,
  arrowRight: ArrowRightMinor,
  arrowUp: ArrowUpMinor,
  arrowUpDown: ArrowUpDownMinor,
  calendar: CalendarMinor,
  cancel: CancelMajor,
  cancelSmall: CancelSmallMinor,
  caretDown: CaretDownMinor,
  caretUp: CaretUpMinor,
  checkmark: CheckmarkMinor,
  chevronDown: ChevronDownMinor,
  chevronLeft: ChevronLeftMinor,
  chevronRight: ChevronRightMinor,
  chevronUp: ChevronUpMinor,
  circleCancel: CircleCancelMinor,
  circleChevronDown: CircleChevronDownMinor,
  circleChevronLeft: CircleChevronLeftMinor,
  circleChevronRight: CircleChevronRightMinor,
  circleChevronUp: CircleChevronUpMinor,
  circleInformation: CircleInformationMajor,
  circlePlus: CirclePlusMinor,
  circlePlusOutline: CirclePlusOutlineMinor,
  conversation: ConversationMinor,
  delete: DeleteMinor,
  disable: DisableMinor,
  dispute: DisputeMinor,
  duplicate: DuplicateMinor,
  embed: EmbedMinor,
  export: ExportMinor,
  external: ExternalMinor,
  help: HelpMajor,
  home: HomeMajor,
  horizontalDots: HorizontalDotsMinor,
  import: ImportMinor,
  logOut: LogOutMinor,
  menu: MenuMajor,
  notes: NotesMinor,
  notification: NotificationMajor,
  onlineStore: OnlineStoreMajor,
  orders: OrdersMajor,
  print: PrintMinor,
  products: ProductsMajor,
  profile: ProfileMinor,
  refresh: RefreshMinor,
  risk: RiskMinor,
  save: SaveMinor,
  search: SearchMinor,
  subtract: SubtractMinor,
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
  | SVGSource
  | 'placeholder'
  | BundledIcon
  | UntrustedSVG
  | React.SFC<React.SVGProps<SVGSVGElement>>;
export interface Props {
  /** The SVG contents to display in the icon. Icons should be in a 20 X 20 pixel viewbox */
  /** @deprecated Passing a React Element as source is deprecated. Pass a React Component instead */
  source: IconSource;
  /** Sets the color for the SVG fill */
  color?: Color;
  /** Show a backdrop behind the icon */
  backdrop?: boolean;
  /** Descriptive text to be read to screenreaders */
  accessibilityLabel?: string;
  /** Render the icon in an img tag instead of an svg. Prevents XSS */
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
    viewBox: '0 0 20 20',
    focusable: 'false',
    'aria-hidden': 'true',
  };

  let SourceComponent = source as React.SFC<React.SVGProps<SVGSVGElement>>;
  let contentMarkup: React.ReactNode;
  if (source === 'placeholder') {
    contentMarkup = <div className={styles.Placeholder} />;
  } else if (isBundledIcon(source)) {
    SourceComponent = BUNDLED_ICONS[source];
    contentMarkup = <SourceComponent {...defaultIconProps} />;
  } else if (
    typeof source === 'function' &&
    React.isValidElement(<SourceComponent />)
  ) {
    contentMarkup = <SourceComponent {...defaultIconProps} />;
  } else if (React.isValidElement(source)) {
    // eslint-disable-next-line no-console
    console.warn(
      'Deprecation: passing a React Element to the Icon component is deprecated and will be removed in the next major version. Pass a React Component instead.',
    );
    contentMarkup = source;
  } else if (untrusted && isUntrustedSVG(source)) {
    contentMarkup = (
      <img
        className={styles.Img}
        src={`data:image/svg+xml;base64,${btoa(source)}`}
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
