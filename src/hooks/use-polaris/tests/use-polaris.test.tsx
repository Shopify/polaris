import React from 'react';
import {mount} from 'enzyme';
import {AppProviderContext, createPolarisContext} from '../../../components';
import {mountWithAppProvider} from '../../../test-utilities/enzyme';
import usePolaris from '../use-polaris';

describe('usePolaris', () => {
  it('throws when polaris is not defined', () => {
    function Component() {
      usePolaris();
      return null;
    }

    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const fn = () => {
      mount(
        <AppProviderContext.Provider value={{} as any}>
          <Component />
        </AppProviderContext.Provider>,
      );
      consoleSpy.mockRestore();
    };
    expect(fn).toThrow(
      `The <AppProvider> component is required as of v2.0 of Polaris React. See
                  https://polaris.shopify.com/components/structure/app-provider for implementation
                  instructions.`,
    );
  });

  it('returns context', () => {
    let context;
    function Component() {
      context = usePolaris();
      return null;
    }

    mountWithAppProvider(<Component />);
    expect(JSON.stringify(context)).toStrictEqual(
      JSON.stringify(createPolarisContext()),
    );
  });
});
