import type {ResponsiveStylePropsWithModifiers} from '../Box';

export const sharedCheckerStyles: ResponsiveStylePropsWithModifiers = {
  backgroundImage: `repeating-conic-gradient(var(--p-color-bg-surface) 0% 25%, var(--p-color-bg-surface-secondary) 0% 50%)`,
  backgroundPosition: '50% / var(--p-space-400) var(--p-space-400)',
};

export const sharedColorLayerStyles: ResponsiveStylePropsWithModifiers = {
  position: 'absolute',
  zIndex: 'var(--pc-color-picker-z-index)',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  pointerEvents: 'none',
};

const verticalPickerBorderRadius = 'calc(var(--pc-color-picker-size) * 0.5);';

export const sharedAlphaHueStyles: ResponsiveStylePropsWithModifiers = {
  position: 'relative',
  overflow: 'hidden',
  height: 'var(--pc-color-picker-size)',
  width: '600',
  marginLeft: '200',
  borderWidth: '100',
  borderRadius: verticalPickerBorderRadius,
  _after: {
    content: "''",
    position: 'absolute',
    zIndex: 'var(--pc-color-picker-adjustments)',
    top: 0,
    left: 0,
    display: 'block',
    height: '100%',
    width: '100%',
    pointerEvents: 'none',
    borderRadius: verticalPickerBorderRadius,
    boxShadow: 'var(--pc-color-picker-inner-shadow)',
  },
};
