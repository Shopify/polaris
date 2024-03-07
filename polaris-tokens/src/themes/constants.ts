export const themeNameLight = 'light';
export const themeNameDefault = themeNameLight;

export const themeNames = [
  themeNameLight,
  'light-mobile',
  'light-high-contrast-experimental',
  'dark',
] as const;

export const themeNamesGlobal = [
  themeNameLight,
  'light-mobile',
  'light-high-contrast-experimental',
] as const;

export const themeNamesLocal = [themeNameLight, 'dark'] as const;
