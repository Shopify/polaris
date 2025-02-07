const {nullish} = require('./utils');

const DEFAULT_STYLE = 'base';

module.exports = (_, _style) => {
  const style = nullish(_style) ? DEFAULT_STYLE : _style;
  switch (style) {
    case 'base': {
      return {
        position: 'relative',
        border: 'var(--p-border-width-050) solid var(--p-color-input-border)',
        backgroundColor: 'var(--p-color-bg-surface)',
        borderRadius: 'var(--p-border-radius-100)',
        '&.hover,&:hover': {
          cursor: 'pointer',
          borderColor: 'var(--p-color-border-hover)',
        },
      };
    }
    case 'active': {
      return {
        borderColor: 'var(--p-color-border-emphasis)',

        '&::before': {
          opacity: 1,
          transform: 'scale(1)',
          '@media (-ms-high-contrast: active)': {
            border: 'var(--p-border-width-050) solid windowText',
          },
        },
      };
    }
    case 'disabled': {
      return {
        borderColor: 'var(--p-color-border-disabled)',

        '&::before': {
          backgroundColor: 'var(--p-color-bg-surface-disabled)',
        },

        '&:hover': {
          cursor: 'default',
        },
      };
    }
    case 'error': {
      return {
        borderColor: 'var(--p-color-border-critical)',
        backgroundColor: 'var(--p-color-bg-fill-critical-secondary)',

        '&.hover, &:hover': {
          borderColor: 'var(--p-color-border-critical)',
        },

        '&::before': {
          backgroundColor: 'var(--p-color-border-critical)',
        },
      };
    }
  }
};
