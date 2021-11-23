import React, {useContext} from 'react';
import {mountWithApp, mount} from 'tests/utilities';

import {useFrame, useLogo} from '../hooks';
import {FrameContext, LogoContext} from '../context';

describe('useFrame', () => {
  let consoleErrorSpy: jest.SpyInstance;

  function FrameComponent() {
    return useFrame() === useContext(FrameContext) ? <div /> : null;
  }

  function LogoComponent() {
    return useLogo() === useContext(LogoContext) ? <div /> : null;
  }

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('returns frame context', () => {
    const component = mountWithApp(<FrameComponent />);
    expect(component).toContainReactComponent('div');
  });

  it('returns logo context', () => {
    const component = mountWithApp(<LogoComponent />);
    expect(component).toContainReactComponent('div');
  });

  it('throws an error if context is not set', () => {
    const fn = () => mount(<FrameComponent />);
    expect(fn).toThrow(
      'No Frame context was provided. Your component must be wrapped in a <Frame> component. See https://polaris.shopify.com/components/structure/frame for implementation instructions.',
    );
  });
});
