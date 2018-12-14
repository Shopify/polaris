import {colorSkyDark} from '@shopify/polaris-tokens';

function setHasVariants(dataSet: any) {
  const [firstKey] = Object.keys(dataSet);
  return typeof dataSet[firstKey] === 'object';
}

function createDataGetter(dataSet: any) {
  if (setHasVariants(dataSet)) {
    return (style = 'base', variant = 'base') => dataSet[style][variant];
  }
  return (style = 'base') => dataSet[style];
}

export function rem(px: number) {
  return `${px / 16}rem`;
}

export const lineHeight = createDataGetter({
  body: {
    base: rem(20),
  },
});

export const border = createDataGetter({
  dark: `${rem(1)} solid ${colorSkyDark}`,
});

export const borderRadius = createDataGetter({
  base: '3px',
});

export const shadow = createDataGetter({
  faint: `0 1px 0 0 rgba(22, 29, 37, 0.05)`,
});

export const duration = createDataGetter({
  base: '200ms',
});

export const easing = createDataGetter({
  base: 'cubic-bezier(0.64, 0, 0.35, 1)',
});

const spacingUnit = 4;

export const spacing = createDataGetter({
  base: rem(spacingUnit * 4),
  loose: rem(spacingUnit * 5),
});

export function recolorIcon(mainColor: string, secondaryColor?: string) {
  return `
    fill: ${mainColor};
    ${secondaryColor && `color: ${secondaryColor};`}
  `;
}

export const controlHeight = rem(36);
