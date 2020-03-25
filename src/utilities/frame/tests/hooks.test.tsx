import React, {useContext} from 'react';
import {mountWithApp, mount} from 'test-utilities';

import {useFrame} from '../hooks';
import {FrameContext} from '../context';

describe('useFrame', () => {
  let consoleErrorSpy: jest.SpyInstance;

  function Component() {
    return useFrame() === useContext(FrameContext) ? <div /> : null;
  }

  function CheckFrameContext() {
    return Object.keys(useFrame()).length === 6 ? <div /> : null;
  }

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('returns a default set of functions if context is not set but app bridge is configured', () => {
    const component = mountWithApp(<CheckFrameContext />, {
      appBridge: {
        apiKey: 'abc123',
        shopOrigin: 'fake.example.com',
        forceRedirect: false,
      },
    });
    expect(component).toContainReactComponent('div');
  });

  it('returns context', () => {
    const component = mountWithApp(<Component />);
    expect(component).toContainReactComponent('div');
  });

  it('throws an error if context is not set', () => {
    const fn = () => mount(<Component />);
    expect(fn).toThrow(
      'No Frame context was provided. Your component must be wrapped in a <Frame> component, or be used within an embedded application by setting the apiKey and shopOrigin properties on <AppProvider>. See https://polaris.shopify.com/components/structure/frame for implementation instructions.',
    );
  });
});
