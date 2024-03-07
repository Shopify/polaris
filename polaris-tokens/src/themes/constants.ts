export const themeNameLight = 'light';
export const themeNameDefault = themeNameLight;

export const themeNames = [
  themeNameDefault,
  'light-mobile',
  'light-high-contrast-experimental',
  'dark',
] as const;

export const themeNamesGlobal = [
  themeNameDefault,
  'light-mobile',
  'light-high-contrast-experimental',
] as const;

export const themeNamesLocal = [themeNameDefault, 'dark'] as const;
