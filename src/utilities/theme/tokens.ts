export const Tokens = {
  // Border Radiuses
  borderRadiusSlim: '0.2rem',
  borderRadiusBase: '0.4rem',
  borderRadiusWide: '0.8rem',
  borderRadiusFull: '50%',

  // Shadows
  cardShadow:
    '0px 0px 5px var(--p-shadow-from-ambient-light), 0px 1px 2px var(--p-shadow-from-direct-light)',
  popoverShadow:
    '-1px 0px 20px var(--p-shadow-from-ambient-light), 0px 1px 5px var(--p-shadow-from-direct-light)',
  modalShadow:
    '0px 26px 80px var(--p-shadow-from-dim-light), 0px 0px 1px var(--p-shadow-from-dim-light)',
  topBarShadow: '0 2px 2px -1px var(--p-shadow-from-direct-light)',
  buttonDropShadow: '0 1px 0 rgba(0, 0, 0, 0.05)',
  buttonInnerShadow: 'inset 0 -1px 0 rgba(0, 0, 0, 0.2)',
  buttonPressedInnerShadow: 'inset 0 1px 0 rgba(0, 0, 0, 0.15)',

  // Overrides
  overrideNone: 'none',
  overrideTransparent: 'transparent',
  overrideOne: '1',
  overrideVisible: 'visible',
  overrideZero: '0',
  buttonFontWeight: '500',
  nonNullContent: "''",
  choiceSize: '2rem',
  iconSize: '1rem',
  choiceMargin: '0.1rem',
  controlBorderWidth: '0.2rem',
  bannerBorderDefault: buildBannerBorder('--p-border-neutral-subdued'),
  bannerBorderSuccess: buildBannerBorder('--p-border-success-subdued'),
  bannerBorderHighlight: buildBannerBorder('--p-border-highlight-subdued'),
  bannerBorderWarning: buildBannerBorder('--p-border-warning-subdued'),
  bannerBorderCritical: buildBannerBorder('--p-border-critical-subdued'),
  badgeMixBlendMode: 'luminosity',
  thinBorderSubdued: '0.1rem solid var(--p-border-subdued)',
  textFieldSpinnerOffset: '0.2rem',
  textFieldFocusRingOffset: '-0.4rem',
  textFieldFocusRingBorderRadius: '0.7rem',
  buttonGroupItemSpacing: '-0.1rem',
  duration100: '100ms',
  duration150: '150ms',
  easeIn: 'cubic-bezier(0.5, 0.1, 1, 1)',
  ease: 'cubic-bezier(0.4, 0.22, 0.28, 1)',
  rangeSliderThumbSizeBase: '1.6rem',
  rangeSliderThumbSizeActive: '2.4rem',
  rangeSliderThumbScale: '1.5',
  badgeFontWeight: '400',

  // Global z-index
  globalRibbon: 510,
  toBbar: 512,
  contextBar: 513,
  smallScreenLoadingBar: 514,
  navBackdrop: 515,
  nav: 516,
  skipToContent: 517,
  backdrop: 518,
  modal: 519,
  toast: 520,
  devUi: 521,
};

function buildBannerBorder(cssVar: string) {
  return `inset 0 0.1rem 0 0 var(${cssVar}), inset 0 0 0 0.1rem var(${cssVar})`;
}
