// eslint-disable-next-line @shopify/strict-component-boundaries
import type {ResponsiveStylePropsWithModifiers} from '../components/Box/generated-data';

// TODO: Until we refactor our space hacks implementation to use the same algorithm as
// CSS-hooks, we won't be able to have `inherit` declarations in our shared css-in-js styles like this.
// export const unstyledButton: ResponsiveStylePropsWithModifiers = {
//   appearance: 'none',
//   margin: '0',
//   padding: '0',
//   background: 'none',
//   borderStyle: 'none',
//   fontSize: 'inherit',
//   lineHeight: 'inherit',
//   color: 'inherit',
//   cursor: 'pointer',
//   _focus: {
//     outlineStyle: 'none',
//   },
// };

/*
*
/// Sets the focus ring for an interactive element
/// @param {String} $size - The size of the border radius on the focus ring.
/// @param {String} $style - Focus ring state.
/// @param {Number} $border-width - Optional negative offset (can be used to ensure the outline wraps the border).
///
*/
export const focusRing = ({
  size = 'base',
  borderWidth = 0,
  style = 'base',
}: {
  size?: 'base' | 'wide';
  borderWidth?: string | number;
  style?: 'base' | 'focused';
}): ResponsiveStylePropsWithModifiers => {
  const stroke = '2px';
  // calc does not like performing addition with a unitless number (`0`, NOT `0px`) This makes sure that we can handle unitless zeros by not trying to do math with them.
  const offset =
    borderWidth === 0 || borderWidth === '0'
      ? '1px'
      : `calc(${borderWidth} + 1px))`;
  const borderRadius = size === 'wide' ? '200' : '100';
  const negativeOffset = `calc(-1 * ${offset})`;

  if (style === 'base') {
    return {
      position: 'relative',
      _after: {
        content: '""',
        position: 'absolute',
        zIndex: 1,
        top: negativeOffset,
        right: negativeOffset,
        bottom: negativeOffset,
        left: negativeOffset,
        display: 'block',
        pointerEvents: 'none',
        boxShadow: `0 0 0 ${negativeOffset} var(--p-color-border-focus)`,
        borderRadius,
      },
    };
  } else if (style === 'focused') {
    return {
      _after: {
        boxShadow: `0 0 0 ${stroke} var(--p-color-border-focus)`,
        outlineStyle: 'solid',
        outlineColor: 'transparent',
        outlineWidth: 'var(--p-border-width-025)',
      },
    };
  }

  return {};
};

/* TODO:
//
@mixin no-focus-ring {
  &::after {
    content: none;
  }
}
*/
