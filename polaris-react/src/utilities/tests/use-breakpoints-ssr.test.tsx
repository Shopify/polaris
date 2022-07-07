/**
 * @jest-environment node
 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import {useBreakpoints} from '../breakpoints';

describe('useBreakpoints SSR', () => {
  it('applies false as the default value for each directional breakpoints alias', () => {
    ReactDOMServer.renderToStaticMarkup(<MockComponent />);

    function MockComponent() {
      const breakpoints = useBreakpoints({defaults: false});

      expect(Object.values(breakpoints).every((match) => match === false)).toBe(
        true,
      );

      return null;
    }
  });

  it('applies true as the default value for each directional breakpoints alias', () => {
    ReactDOMServer.renderToStaticMarkup(<MockComponent />);

    function MockComponent() {
      const breakpoints = useBreakpoints({defaults: true});

      expect(Object.values(breakpoints).every((match) => match === true)).toBe(
        true,
      );

      return null;
    }
  });

  it('applies select defaults to all directional breakpoint aliases', () => {
    ReactDOMServer.renderToStaticMarkup(<MockComponent />);

    function MockComponent() {
      const breakpoints = useBreakpoints({
        defaults: {mdUp: true},
      });

      expect(
        Object.entries(breakpoints).every(([directionAlias, match]) => {
          if (directionAlias === 'mdUp') return match === true;

          return match === false;
        }),
      ).toBe(true);

      return null;
    }
  });
});
