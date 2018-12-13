import {colorSkyLight, colorWhite} from '@shopify/polaris-tokens';
import {createCssVariablesFactory} from '../ThemeProvider/utils';

export interface Styles {
  color?: string;
  background?: string;
}

export const mergeStyles = createCssVariablesFactory<Styles>('frame', {
  color: colorWhite,
  background: colorSkyLight,
});
