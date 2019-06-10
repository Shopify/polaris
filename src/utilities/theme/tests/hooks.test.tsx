import React from 'react';
import isEqual from 'lodash/isEqual';
import {mountWithContext} from 'test-utilities';

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
      return isEqual(useTheme(), {
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
