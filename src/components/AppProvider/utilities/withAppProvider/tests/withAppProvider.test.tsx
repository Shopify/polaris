import * as React from 'react';
import {mount} from 'enzyme';
import AppProviderContext from '../../../context';
import withAppProvider from '../withAppProvider';

describe('withAppProvider', () => {
  it('throws when polaris is not defined', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const Child: React.SFC<{}> = (_props) => <div />;

    const WrappedComponent = withAppProvider<any>()(Child);

    const fn = () => {
      mount(
        <AppProviderContext.Provider value={{} as any}>
          <WrappedComponent />
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
});
