import React, {useContext} from 'react';
import {mountWithContext} from 'test-utilities';
import {useAppBridge} from '../hooks';
import {AppBridgeContext} from '../context';

function Component() {
  return useAppBridge() === useContext(AppBridgeContext) ? <div /> : null;
}

describe('useAppBridge', () => {
  it('returns context', () => {
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
