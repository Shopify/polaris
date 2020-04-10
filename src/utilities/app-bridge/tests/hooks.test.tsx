import React, {useContext} from 'react';
import {mountWithApp} from 'test-utilities';

import {useAppBridge} from '../hooks';
import {AppBridgeContext} from '../context';

function Component() {
  return useAppBridge() === useContext(AppBridgeContext) ? <div /> : null;
}

describe('useAppBridge', () => {
  it('returns context', () => {
    const component = mountWithApp(<Component />, {
      appBridge: {
        apiKey: 'abc123',
        shopOrigin: 'fake.example.com',
        forceRedirect: false,
      },
    });
    expect(component).toContainReactComponent('div');
  });
});
