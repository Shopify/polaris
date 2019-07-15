import React from 'react';
import {mountWithContext} from 'test-utilities';

import {useAppBridge} from '../hooks';

describe('useAppBridge', () => {
  it('returns context', () => {
    function Component() {
      // eslint-disable-next-line shopify/jest/no-if
      return useAppBridge() ? <div /> : null;
    }

    const component = mountWithContext(<Component />, {
      appBridge: {
        apiKey: 'abc123',
        shopOrigin: 'fake.example.com',
        forceRedirect: false,
      },
    });
    expect(component).toContainReactComponent('div');
  });
});
