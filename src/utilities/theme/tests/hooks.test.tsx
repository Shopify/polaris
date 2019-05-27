import React from 'react';
import {mountWithContext} from 'test-utilities';
import {isObjectsEqual} from '../../is-objects-equal';

import {useTheme} from '../hooks';

describe('useTheme', () => {
  it('returns context', () => {
    const themeProvider = {
      logo: {
        topBarSource: 'source',
      },
    };

    function Component() {
      // eslint-disable-next-line shopify/jest/no-if
      return isObjectsEqual(useTheme(), {
        logo: {
          topBarSource: 'source',
        },
      }) ? (
        <div />
      ) : null;
    }

    const component = mountWithContext(<Component />, {
      themeProvider,
    });
    expect(component).toContainReactComponent('div');
  });
});
