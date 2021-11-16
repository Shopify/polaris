export const Tokens = {
  // Border Radiuses
  borderRadiusSlim: rem('2px'),
  borderRadiusBase: rem('4px'),
  borderRadiusWide: rem('8px'),
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
  overrideLoadingZIndex: '514',
  choiceSize: rem('20px'),
  iconSize: rem('10px'),
  choiceMargin: rem('1px'),
  controlBorderWidth: rem('2px'),
  bannerBorderDefault: buildBannerBorder('--p-border-neutral-subdued'),
  bannerBorderSuccess: buildBannerBorder('--p-border-success-subdued'),
  bannerBorderHighlight: buildBannerBorder('--p-border-highlight-subdued'),
  bannerBorderWarning: buildBannerBorder('--p-border-warning-subdued'),
  bannerBorderCritical: buildBannerBorder('--p-border-critical-subdued'),
  thinBorderSubdued: `${rem('1px')} solid var(--p-border-subdued)`,
  textFieldSpinnerOffset: rem('2px'),
  textFieldFocusRingOffset: rem('-4px'),
  textFieldFocusRingBorderRadius: rem('7px'),
  buttonGroupItemSpacing: rem('-1px'),
  duration100: '100ms',
  duration150: '150ms',
  easeIn: 'cubic-bezier(0.5, 0.1, 1, 1)',
  ease: 'cubic-bezier(0.4, 0.22, 0.28, 1)',
  rangeSliderThumbSizeBase: rem('16px'),
  rangeSliderThumbSizeActive: rem('24px'),
};

function rem(px: string) {
  const baseFontSize = 10;
  return `${parseInt(px, 10) / baseFontSize}rem`;
}

function buildBannerBorder(cssVar: string) {
  return `inset 0 ${rem('1px')} 0 0 var(${cssVar}), inset 0 0 0 ${rem(
    '1px',
  )} var(${cssVar})`;
}
