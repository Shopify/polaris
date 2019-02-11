import {SVGSource} from '@shopify/images';
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

export type BundledIcon = keyof typeof BUNDLED_ICONS;

export type IconSource =
  | React.ReactNode
  | SVGSource
  | 'placeholder'
  | BundledIcon;
