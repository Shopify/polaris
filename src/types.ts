import * as PropTypes from 'prop-types';
import {ValidationMap} from 'react';
// eslint-disable-next-line shopify/strict-component-boundaries
import {Props as IconProps} from './components/Icon';

export type HeadingTagName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
export type AppBridgeTarget = 'ADMIN_PATH' | 'REMOTE' | 'APP';

export type Error =
  | string
  | React.ReactElement<any>
  | (string | React.ReactElement<any>)[];

export interface BaseAction {
  /** A unique identifier for the action */
  id?: string;
  /** Content the action displays */
  content?: string;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** A destination to link to, rendered in the action */
  url?: string;
  /** Forces url to open in a new tab */
  external?: boolean;
  /** Callback when an action takes place */
  onAction?(): void;
}

export interface Action extends BaseAction {}

export interface AnimationProps {
  in?: boolean;
}

export interface BaseLinkAction {
  /** A unique identifier for the action */
  id?: string;
  /** Content the action displays */
  content?: string;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** A destination to link to */
  url: string;
}

export interface AppBridgeActionTarget {
  /**
   * Where to display the target link
   * @default 'APP'
   * @embeddedAppOnly
   */
  target?: AppBridgeTarget;
}

export interface LinkAction extends BaseLinkAction, AppBridgeActionTarget {}

export interface BadgeAction {
  badge?: {
    status: 'new';
    content: string;
  };
}

export interface BaseCallbackAction {
  /** A unique identifier for the action */
  id?: string;
  /** Content the action displays */
  content?: string;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** Callback when an action takes place */
  onAction(): void;
}

export interface CallbackAction extends BaseCallbackAction {}

export interface DisableableAction extends Action {
  /** Should the action be disabled */
  disabled?: boolean;
}

export interface DestructableAction extends Action {
  /** Destructive action */
  destructive?: boolean;
}

export interface AppBridgeAction
  extends Action,
    DisableableAction,
    DestructableAction,
    AppBridgeActionTarget {}

export interface IconableAction extends Action {
  /** Source of the icon */
  icon?: IconProps['source'];
}

export interface LoadableAction extends Action {
  /** Should a spinner be displayed */
  loading?: boolean;
}

export interface ActionListItemDescriptor
  extends IconableAction,
    DisableableAction,
    BadgeAction,
    DestructableAction,
    AppBridgeAction {
  /** Image source */
  image?: string;
  /**  Add an ellipsis suffix to action content */
  ellipsis?: boolean;
  /** Whether the action is active or not */
  active?: boolean;
  /** Defines a role for the action */
  role?: string;
}

export interface ActionListSection {
  /** Section title */
  title?: string;
  /** Collection of action items for the list */
  items: ActionListItemDescriptor[];
}

export interface ComplexAction
  extends Action,
    DisableableAction,
    DestructableAction,
    AppBridgeAction,
    IconableAction,
    LoadableAction {}

export enum Key {
  Backspace = 'Backspace',
  Tab = 'Tab',
  Enter = 'Enter',
  Shift = 'Shift',
  Control = 'Control',
  Alt = 'Alt',
  Pause = 'Pause',
  CapsLock = 'CapsLock',
  Escape = 'Escape',
  Space = ' ',
  PageUp = 'PageUp',
  PageDown = 'PageDown',
  End = 'End',
  Home = 'Home',
  ArrowLeft = 'ArrowLeft',
  ArrowUp = 'ArrowUp',
  ArrowRight = 'ArrowRight',
  ArrowDown = 'ArrowDown',
  Insert = 'Insert',
  Delete = 'Delete',
  Key0 = '0',
  Key1 = '1',
  Key2 = '2',
  Key3 = '3',
  Key4 = '4',
  Key5 = '5',
  Key6 = '6',
  Key7 = '7',
  Key8 = '8',
  Key9 = '9',
  Keya = 'a',
  Keyb = 'b',
  Keyc = 'c',
  Keyd = 'd',
  Keye = 'e',
  Keyf = 'f',
  Keyg = 'g',
  Keyh = 'h',
  Keyi = 'i',
  Keyj = 'j',
  Keyk = 'k',
  Keyl = 'l',
  Keym = 'm',
  Keyn = 'n',
  Keyo = 'o',
  Keyp = 'p',
  Keyq = 'q',
  Keyr = 'r',
  Keys = 's',
  Keyt = 't',
  Keyu = 'u',
  Keyv = 'v',
  Keyw = 'w',
  Keyx = 'x',
  Keyy = 'y',
  Keyz = 'z',
  KeyA = 'A',
  KeyB = 'B',
  KeyC = 'C',
  KeyD = 'D',
  KeyE = 'E',
  KeyF = 'F',
  KeyG = 'G',
  KeyH = 'H',
  KeyI = 'I',
  KeyJ = 'J',
  KeyK = 'K',
  KeyL = 'L',
  KeyM = 'M',
  KeyN = 'N',
  KeyO = 'O',
  KeyP = 'P',
  KeyQ = 'Q',
  KeyR = 'R',
  KeyS = 'S',
  KeyT = 'T',
  KeyU = 'U',
  KeyV = 'V',
  KeyW = 'W',
  KeyX = 'X',
  KeyY = 'Y',
  KeyZ = 'Z',
  Select = 'Select',
  Multiply = 'Multiply',
  Add = 'Add',
  Subtract = 'Subtract',
  Decimal = 'Decimal',
  Divide = 'Divide',
  F1 = 'F1',
  F2 = 'F2',
  F3 = 'F3',
  F4 = 'F4',
  F5 = 'F5',
  F6 = 'F6',
  F7 = 'F7',
  F8 = 'F8',
  F9 = 'F9',
  F10 = 'F10',
  F11 = 'F11',
  F12 = 'F12',
  NumLock = 'NumLock',
  ScrollLock = 'ScrollLock',
  Semicolon = 'Semicolon',
  Equals = 'Equals',
  Comma = 'Comma',
  Dash = 'Dash',
  Period = 'Period',
  ForwardSlash = '/',
  GraveAccent = '`',
  OpenBracket = '(',
  BackSlash = '\\',
  CloseBracket = ')',
  SingleQuote = "'",
}

export const contentContextTypes: ValidationMap<any> = {
  withinContentContainer: PropTypes.bool,
};

export interface WithContextTypes<IJ> {
  context: IJ;
}
