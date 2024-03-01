const {nullish} = require('./utils');

const DEFAULT_CONTENT = '""';
const DEFAULT_ZINDEX = 0;

// Applies a shadow-bevel effect to an element.
// @param - Polaris ShadowAlias custom property.
// @param - Polaris BorderRadiusScale custom property.
// @param - Declaration passed to the root element.
// @param - Declaration passed to the pseudo-element. Used for toggling the bevel effect.
// @param - Declaration passed to the pseudo-element. Used for adjusting the stacking order.
module.exports = (_, boxShadow, borderRadius, border, content, zIndex) => ({
  position: 'relative',
  ...(!nullish(boxShadow) && {boxShadow}),
  ...(!nullish(borderRadius) && {borderRadius}),
  ...(!nullish(border) && {border}),
  '&::before': {
    content: nullish(content) ? DEFAULT_CONTENT : content,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: nullish(zIndex) ? DEFAULT_ZINDEX : zIndex,
    boxShadow: 'var(--p-shadow-bevel-100)',
    borderRadius,
    pointerEvents: 'none',
    mixBlendMode: 'luminosity',
  },
});
