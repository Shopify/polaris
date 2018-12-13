import {colorBlue, colorWhite, colorBlueDark} from '@shopify/polaris-tokens';
import {createCssVariablesFactory} from '../ThemeProvider/utils';

export interface Styles {
  background?: string;
  backgroundDarker?: string;
  backgroundLighter?: string;
  color?: string;
}

export const mergeStyles = createCssVariablesFactory<Styles>('top-bar', {
  background: colorBlueDark,
  color: colorWhite,
  backgroundDarker: colorBlueDark,
  backgroundLighter: colorBlue,
});
