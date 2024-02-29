// Applies a shadow-bevel effect to an element.
// @param - Polaris ShadowAlias custom property.
// @param - Polaris BorderRadiusScale custom property.
// @param - Declaration passed to the root element.
// @param - Declaration passed to the pseudo-element. Used for toggling the bevel effect.
// @param - Declaration passed to the pseudo-element. Used for adjusting the stacking order.
module.exports = (
  mixin,
  boxShadow,
  borderRadius,
  border,
  content = '',
  zIndex = 0,
) => ({
  position: 'relative',
  boxShadow,
  borderRadius,
  border,
  '&::before': {
    content,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex,
    boxShadow: 'var(--p-shadow-bevel-100)',
    borderRadius,
    pointerEvents: 'none',
    mixBlendMode: 'luminosity',
  },
});
