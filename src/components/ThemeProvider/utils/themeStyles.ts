/* eslint-disable shopify/strict-component-boundaries */
import {
  mergeStyles as mergeTopBarStyles,
  Styles as TopBarStyles,
} from '../../TopBar/theme';
import {
  mergeStyles as mergeFrameStyles,
  Styles as FrameStyles,
} from '../../Frame/theme';
import {
  mergeStyles as mergeCardStyles,
  Styles as CardStyles,
} from '../../Card/theme';
import {
  mergeStyles as mergeTextFieldStyles,
  Styles as TextFieldStyles,
} from '../../TextField/theme';

export interface ThemeStyles {
  topBar?: TopBarStyles;
  frame?: FrameStyles;
  card?: CardStyles;
  textField?: TextFieldStyles;
}

export function createThemeStyles(colors?: ThemeStyles) {
  return {
    ...mergeTopBarStyles(colors && colors.topBar),
    ...mergeFrameStyles(colors && colors.frame),
    ...mergeCardStyles(colors && colors.card),
    ...mergeTextFieldStyles(colors && colors.textField),
  };
}
