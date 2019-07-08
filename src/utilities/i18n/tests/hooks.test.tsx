import React from 'react';
import {mountWithContext} from 'test-utilities';

import {useI18n} from '../hooks';

describe('useI18n', () => {
  it('returns context', () => {
    function Component() {
      // eslint-disable-next-line shopify/jest/no-if
      return useI18n() ? <div /> : null;
    }

    const component = mountWithContext(<Component />, {});

    expect(component).toContainReactComponent('div');
  });
});
