import React from 'react';
import {mount} from 'tests/utilities';
import {matchMedia} from '@shopify/jest-dom-mocks';
import {themeDefault, getMediaConditions} from '@shopify/polaris-tokens';
import type {BreakpointsTokenName} from '@shopify/polaris-tokens';

import {useBreakpoints, getBreakpointsQueryEntries} from '../breakpoints';
import type {BreakpointsDirectionAlias} from '../breakpoints';

const mediaConditions = getMediaConditions(themeDefault.breakpoints);

describe('useBreakpoints', () => {
  it('initial render uses defaults', () => {
    setMediaWidth('breakpoints-xs');
    let breakpoints;
    let renders = 0;
    mount(<MockComponent />);

    function MockComponent() {
      renders++;
      breakpoints = useBreakpoints({
        defaults: {
          mdDown: true,
          mdOnly: true,
          mdUp: true,
        },
      });

      expect(breakpoints).toMatchObject(
        renders === 1
          ? {
              xsDown: false,
              xsOnly: false,
              xsUp: false,
              mdDown: true,
              mdOnly: true,
              mdUp: true,
            }
          : {
              xsDown: true,
              xsOnly: true,
              xsUp: true,
              mdDown: false,
              mdOnly: false,
              mdUp: false,
            },
      );

      return null;
    }

    expect(breakpoints).toMatchObject({
      xsDown: true,
      xsOnly: true,
      xsUp: true,
      mdDown: false,
      mdOnly: false,
      mdUp: false,
    });
  });

  it('breakpoints-xs', () => {
    setMediaWidth('breakpoints-xs');
    let breakpoints;
    mount(<MockComponent />);

    function MockComponent() {
      breakpoints = useBreakpoints();
      return null;
    }

    expect(breakpoints).toMatchObject({
      xsDown: true,
      xsOnly: true,
      xsUp: true,
    });
  });

  it('breakpoints-sm', () => {
    setMediaWidth('breakpoints-sm');
    let breakpoints;
    mount(<MockComponent />);

    function MockComponent() {
      breakpoints = useBreakpoints();
      return null;
    }

    expect(breakpoints).toMatchObject({
      smDown: true,
      smOnly: true,
      smUp: true,
    });
  });

  it('breakpoints-md', () => {
    setMediaWidth('breakpoints-md');
    let breakpoints;
    mount(<MockComponent />);

    function MockComponent() {
      breakpoints = useBreakpoints();
      return null;
    }

    expect(breakpoints).toMatchObject({
      mdDown: true,
      mdOnly: true,
      mdUp: true,
    });
  });

  it('breakpoints-lg', () => {
    setMediaWidth('breakpoints-lg');
    let breakpoints;
    mount(<MockComponent />);

    function MockComponent() {
      breakpoints = useBreakpoints();
      return null;
    }

    expect(breakpoints).toMatchObject({
      lgDown: true,
      lgOnly: true,
      lgUp: true,
    });
  });

  it('breakpoints-xl', () => {
    setMediaWidth('breakpoints-xl');
    let breakpoints;
    mount(<MockComponent />);

    function MockComponent() {
      breakpoints = useBreakpoints();
      return null;
    }

    expect(breakpoints).toMatchObject({
      xlDown: true,
      xlOnly: true,
      xlUp: true,
    });
  });
});

function setMediaWidth(breakpointsTokenName: BreakpointsTokenName) {
  const aliasDirectionConditions = Object.values(
    mediaConditions[breakpointsTokenName],
  );
  matchMedia.setMedia((query: string) => ({
    matches: aliasDirectionConditions.includes(query),
    media: '',
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
}

describe('getBreakpointsQueryEntries', () => {
  it('converts breakpoints tokens into entries with direction/alias names', () => {
    const directionAliases: BreakpointsDirectionAlias[] =
      getBreakpointsQueryEntries(themeDefault.breakpoints).map(
        ([directionAlias]) => directionAlias,
      );

    expect(directionAliases).toStrictEqual([
      'xsUp',
      'xsDown',
      'xsOnly',
      'smUp',
      'smDown',
      'smOnly',
      'mdUp',
      'mdDown',
      'mdOnly',
      'lgUp',
      'lgDown',
      'lgOnly',
      'xlUp',
      'xlDown',
      'xlOnly',
    ]);
  });
});
