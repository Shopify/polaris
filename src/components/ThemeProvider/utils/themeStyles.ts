import {constructColorName} from '../../../utilities/color-names';

export interface ThemeStyles {
  background?: string;
  color?: string;
  layeredBackground?: string;
  layeredBorder?: string;
  layeredShadow?: string;
  accent?: string;
  accentDark?: string;
  accentLight?: string;
  accentSubdued?: string;
  subdued?: string;
}

export function createThemeStyles(styles: ThemeStyles) {
  return Object.entries(styles)
    .map(([variableName, value]) => [
      constructColorName('polaris', variableName),
      value,
    ])
    .reduce(
      (currentValue, [variableName, value]) => ({
        ...currentValue,
        [variableName]: value,
      }),
      {},
    );
}
