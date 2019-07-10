import {ComponentThemeProperties} from './types';
import {reduceTheme} from './utils';

const theme: ComponentThemeProperties = {
  default: {
    text: '--polaris-surface-28',
    textSubdued: '--polaris-surface-25',
    background: '--polaris-surface-2',
  },
};

const rootTheme = reduceTheme(theme);

export default rootTheme;
