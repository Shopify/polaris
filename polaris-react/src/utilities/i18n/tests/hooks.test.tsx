import {useContext} from 'react';
import {mount, mountWithApp} from 'tests/utilities';

import {useI18n} from '../hooks';
import {I18nContext} from '../context';

let consoleErrorSpy: jest.SpyInstance;

function Component() {
  return useI18n() === useContext(I18nContext) ? <div /> : null;
}

describe('useI18n', () => {
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
      'No i18n was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.',
    );
  });
});
