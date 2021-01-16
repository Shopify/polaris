import type {Color, NewDesignLanguageColor} from '../types';

const NEW_DESIGN_LANGUAGE_COLORS = [
  'base',
  'subdued',
  'critical',
  'warning',
  'highlight',
  'success',
  'primary',
];

export function isNewDesignLanguageColor(
  color: Color | NewDesignLanguageColor,
): color is NewDesignLanguageColor {
  return NEW_DESIGN_LANGUAGE_COLORS.includes(color as NewDesignLanguageColor);
}
