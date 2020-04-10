import React from 'react';
import {mount, mountWithApp} from 'test-utilities';

import {useFeatures} from '../hooks';

function Component() {
  const features = useFeatures();
  const {foo} = features;

  return foo ? <div /> : null;
}

describe('useFeatures', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('returns context', () => {
    const component = mountWithApp(<Component />, {
      features: {foo: true},
    });
    expect(component).toContainReactComponent('div');
  });

  it('throws an error if context is not set', () => {
    const attemptMount = () => mount(<Component />);
    expect(attemptMount).toThrow('No Features were provided.');
  });
});
