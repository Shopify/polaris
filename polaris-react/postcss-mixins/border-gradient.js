// Applies a border-gradient effect to an element.
// @param $backgroundColor - Color of element inside the border. Transparent colors are not supported.
// @param $borderGradientColor - Color gradient to use for the border
// @param $borderRadius - Polaris BorderRadiusScale custom property.
module.exports = (_, backgroundColor, borderGradientColor, borderRadius) => ({
  borderRadius: borderRadius,
  border: 'solid var(--p-border-width-025) transparent',
  backgroundColor: backgroundColor,
  backgroundImage: `linear-gradient(${backgroundColor}, ${backgroundColor}), ${borderGradientColor}`,
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
});
