const {nullish} = require('./utils');

const DEFAULT_SIZE = 'base';
const DEFAULT_BORDER_WIDTH = 0;
const DEFAULT_STYLE = 'base';

module.exports = (_, _size, _borderWidth, _style) => {
  const size = nullish(_size) ? DEFAULT_SIZE : _size;
  const borderWidth = nullish(_borderWidth)
    ? DEFAULT_BORDER_WIDTH
    : _borderWidth;
  const style = nullish(_style) ? DEFAULT_STYLE : _style;

  const focusRingOffset =
    borderWidth === 0 || borderWidth === '0'
      ? '-1px'
      : `calc(-1 * calc(${borderWidth} + 1px))`;

  if (style === 'base') {
    return {
      position: 'relative',
      '&::after': {
        content: "''",
        position: 'absolute',
        zIndex: 1,
        top: focusRingOffset,
        right: focusRingOffset,
        bottom: focusRingOffset,
        left: focusRingOffset,
        display: 'block',
        pointerEvents: 'none',
        boxShadow: `0 0 0 ${focusRingOffset} var(--p-color-border-focus)`,
        borderRadius:
          size === 'wide'
            ? 'var(--p-border-radius-200)'
            : 'var(--p-border-radius-100)',
      },
    };
  } else if (style === 'focused') {
    return {
      '&::after': {
        boxShadow: '0 0 0 2px var(--p-color-border-focus)',
        outline: 'var(--p-border-width-025) solid transparent',
      },
    };
  }
};
