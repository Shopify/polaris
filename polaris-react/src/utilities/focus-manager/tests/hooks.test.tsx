import React from 'react';
import {mount, mountWithApp} from 'tests/utilities';

import {useFocusManager} from '../hooks';
import {
  UniqueIdFactory,
  UniqueIdFactoryContext,
  globalIdGeneratorFactory,
} from '../../unique-id';

let consoleErrorSpy: jest.SpyInstance;

const Component = () =>
  typeof useFocusManager({trapping: true}).canSafelyFocus === 'boolean' ? (
    <div />
  ) : null;

describe('useFocusManager', () => {
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
    const attemptMount = () =>
      mount(
        <UniqueIdFactoryContext.Provider
          value={new UniqueIdFactory(globalIdGeneratorFactory)}
        >
          <Component />
        </UniqueIdFactoryContext.Provider>,
      );
    expect(attemptMount).toThrow(
      'No FocusManager was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.',
    );
  });
});
