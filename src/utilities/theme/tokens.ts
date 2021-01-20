export const Tokens = {
  // Border Radiuses
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
};

function rem(px: string) {
  const baseFontSize = 10;
  return `${parseInt(px, 10) / baseFontSize}rem`;
}
