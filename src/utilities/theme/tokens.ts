const BorderRadius = {
  borderRadiusBase: rem('4px'),
  borderRadiusWide: rem('8px'),
};

const Shadow = {
  cardShadow:
    '0px 0px 5px var(--p-shadow-from-ambient-light), 0px 1px 2px var(--p-shadow-from-direct-light)',
  popoverShadow:
    '-1px 0px 20px var(--p-shadow-from-ambient-light), 0px 1px 5px var(--p-shadow-from-direct-light)',
  modalShadow:
    '0px 6px 32px var(--p-shadow-from-ambient-light), 0px 1px 6px var(--p-shadow-from-direct-light)',
};

const Overrides = {
  overrideNone: 'none',
  overrideTransparent: 'transparent',
  overrideOne: '1',
  overrideVisible: 'visible',
  overrideZero: '0',
  overrideLoadingZIndex: '514',
  buttonFontWeight: '500',
  nonNullContent: "''",
  bannerDefaultBorder: buildBannerBorder('--p-border-on-surface'),
  bannerSuccessBorder: buildBannerBorder('--p-success-border'),
  bannerHighlightBorder: buildBannerBorder('--p-highlight-border'),
  bannerWarningBorder: buildBannerBorder('--p-warning-border'),
  bannerCriticalBorder: buildBannerBorder('--p-critical-border'),
  badgeMixBlendMode: 'luminosity',
  borderSubdued: `${rem('1px')} solid var(--p-border-subdued-on-surface)`,
  textFieldSpinnerOffset: rem('2px'),
  textFieldFocusRingOffset: rem('-4px'),
  textFieldFocusRingBorderRadius: rem('7px'),
  buttonGroupItemSpacing: rem('2px'),
};

export const Tokens = {
  ...BorderRadius,
  ...Shadow,
  ...Overrides,
};

function rem(px: string) {
  const baseFontSize = 10;
  return `${parseInt(px, 10) / baseFontSize}rem`;
}

function buildBannerBorder(cssVar: string) {
  return `inset 0 ${rem('2px')} 0 0 var(${cssVar}), inset 0 0 0 ${rem(
    '2px',
  )} var(${cssVar})`;
}
