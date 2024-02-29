module.exports = (mixin, size = 'base', borderWidth, style = 'base') => {
  const focusRingOffset =
    borderWidth === 0 ? '-1px' : `calc(-1 * calc(${borderWidth} + 1px))`;

  if (style === 'base') {
    return {
      '--pc-focus-ring-offset': focusRingOffset,
      position: 'relative',
      '&::after': {
        content: "''",
        position: 'absolute',
        zIndex: 1,
        top: 'var(--pc-focus-ring-offset)',
        right: 'var(--pc-focus-ring-offset)',
        bottom: 'var(--pc-focus-ring-offset)',
        left: 'var(--pc-focus-ring-offset)',
        display: 'block',
        pointerEvents: 'none',
        boxShadow:
          '0 0 0 var(--pc-focus-ring-offset) var(--p-color-border-focus)',
        borderRadius:
          size === 'wide'
            ? 'var(--p-border-radius-200);'
            : 'var(--p-border-radius-100);',
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
