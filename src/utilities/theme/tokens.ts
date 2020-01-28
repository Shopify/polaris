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
  topBarShadow: '0 2px 2px -1px var(--p-shadow-from-direct-light)',
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
  choiceSize: rem('20px'),
  choiceMargin: rem('1px'),
  bannerBorderDefault: buildBannerBorder('--p-border'),
  bannerBorderSuccess: buildBannerBorder('--p-border-success'),
  bannerBorderHighlight: buildBannerBorder('--p-border-highlight'),
  bannerBorderWarning: buildBannerBorder('--p-border-warning'),
  bannerBorderCritical: buildBannerBorder('--p-border-critical'),
  badgeMixBlendMode: 'luminosity',
  thinBorderSubdued: `${rem('1px')} solid var(--p-border-subdued)`,
  textFieldSpinnerOffset: rem('2px'),
  textFieldFocusRingOffset: rem('-4px'),
  textFieldFocusRingBorderRadius: rem('7px'),
  buttonGroupItemSpacing: rem('2px'),
  duration100: '100ms',
  duration150: '150ms',
  easeIn: 'cubic-bezier(0.5, 0.1, 1, 1)',
  ease: 'cubic-bezier(0.4, 0.22, 0.28, 1)',
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
