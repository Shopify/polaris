import React, {useContext} from 'react';
import {mountWithApp, mount} from 'test-utilities';
import {useFrame} from '../hooks';
import {FrameContext} from '../context';

describe('useFrame', () => {
  let consoleErrorSpy: jest.SpyInstance;

  function Component() {
    return useFrame() === useContext(FrameContext) ? <div /> : null;
  }

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('returns context', () => {
    const component = mountWithApp(<Component />);
    expect(component).toContainReactComponent('div');
  });

  it('throws an error if context is not set', () => {
    const fn = () => mount(<Component />);
    expect(fn).toThrow(
      'No Frame context was provided. Your component must be wrapped in a <Frame> component. See https://polaris.shopify.com/components/structure/frame for implementation instructions.',
    );
  });
});
