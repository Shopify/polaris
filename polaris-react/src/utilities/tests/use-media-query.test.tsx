import React from 'react';
import {mount} from 'tests/utilities';
import {matchMedia} from '@shopify/jest-dom-mocks';

import type {QueryAlias} from '../use-media-query';
import {queryAliases, useMediaQuery} from '../use-media-query';

const mockQuery = '(min-width: 0px)';

describe('useMediaQuery', () => {
  beforeEach(() => {
    setMatchMediaMock(mockQuery);
  });

  it('returns the default value initially', () => {
    const renderMatches: boolean[] = [];

    function App() {
      const matches = useMediaQuery('false-query');
      renderMatches.push(matches);
      return null;
    }

    mount(<App />);

    expect(renderMatches).toHaveLength(1);
    expect(renderMatches[0]).toBe(false);
  });

  it('returns the default value initially and updates to match the query', () => {
    const renderMatches: boolean[] = [];

    function App() {
      const matches = useMediaQuery(mockQuery);
      renderMatches.push(matches);
      return null;
    }

    mount(<App />);

    expect(renderMatches).toHaveLength(2);
    expect(renderMatches[0]).toBe(false);
    expect(renderMatches[1]).toBe(true);
  });

  it('returns the custom default value initially', () => {
    const renderMatches: boolean[] = [];

    function App() {
      const matches = useMediaQuery(mockQuery, {defaultValue: true});
      renderMatches.push(matches);
      return null;
    }

    mount(<App />);

    expect(renderMatches).toHaveLength(1);
    expect(renderMatches[0]).toBe(true);
  });

  it('returns the custom default value initially and updates to match the query', () => {
    const renderMatches: boolean[] = [];

    function App() {
      const matches = useMediaQuery('false-query', {defaultValue: true});
      renderMatches.push(matches);
      return null;
    }

    mount(<App />);

    expect(renderMatches).toHaveLength(2);
    expect(renderMatches[0]).toBe(true);
    expect(renderMatches[1]).toBe(false);
  });

  it('returns the matchMedia result initially', () => {
    const renderMatches: boolean[] = [];

    function App() {
      const matches = useMediaQuery(mockQuery, {
        // Should be ignored
        defaultValue: false,
        initializeWithValue: true,
      });
      renderMatches.push(matches);
      return null;
    }

    mount(<App />);

    expect(renderMatches).toHaveLength(1);
    expect(renderMatches[0]).toBe(true);
  });
});

describe(`useMediaQuery query aliases`, () => {
  Object.keys(queryAliases).forEach((queryAlias: QueryAlias) => {
    it(`returns the default value initially and updates to match the query alias "${queryAlias}"`, () => {
      setMatchMediaMock(queryAliases[queryAlias]);

      const renderMatches: boolean[] = [];

      function App() {
        const matches = useMediaQuery(queryAlias);
        renderMatches.push(matches);
        return null;
      }

      mount(<App />);

      expect(renderMatches).toHaveLength(2);
      expect(renderMatches[0]).toBe(false);
      expect(renderMatches[1]).toBe(true);
    });
  });
});

function setMatchMediaMock(query: string) {
  return matchMedia.setMedia((media) => ({
    matches: media === query,
    media,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
}
