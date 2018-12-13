import {colorWhite} from '@shopify/polaris-tokens';
import {createCssVariablesFactory} from '../ThemeProvider/utils';

export interface Styles {
  shadow?: string;
  background?: string;
}

export const mergeStyles = createCssVariablesFactory<Styles>('card', {
  shadow: ' 0 0 0 1px rgba(63, 63, 68, 0.05)',
  background: colorWhite,
});
