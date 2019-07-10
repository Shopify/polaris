import {ComponentThemeProperties, reduceTheme} from '../ThemeProvider';

const theme: ComponentThemeProperties = {
  default: {
    background: '--polaris-surface-0',
    backgroundSubdued: '--polaris-surface-1',
  },
};

const cardTheme = reduceTheme(theme);

export default cardTheme;
