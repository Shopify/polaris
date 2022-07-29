import {useContext} from 'react';
import {mount, mountWithApp} from 'tests/utilities';

import {useScrollLockManager} from '../hooks';
import {ScrollLockManagerContext} from '../context';

let consoleErrorSpy: jest.SpyInstance;

function Component() {
  return useScrollLockManager() === useContext(ScrollLockManagerContext) ? (
    <div />
  ) : null;
}

describe('useScrollLockManager', () => {
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
    const attemptMount = () => mount(<Component />);
    expect(attemptMount).toThrow(
      'No ScrollLockManager was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.',
    );
  });
});
