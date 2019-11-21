import React from 'react';
import {mount} from 'enzyme';
import {withAppProvider} from '../with-app-provider';

describe('withAppProvider', () => {
  it('throws when polaris is not defined', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const Child: React.SFC = (_props) => <div />;

    const WrappedComponent = withAppProvider<any>()(Child);

    const fn = () => {
      mount(<WrappedComponent />);
      consoleSpy.mockRestore();
    };
    expect(fn).toThrow(
      `No i18n was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/structure/app-provider for implementation instructions.`,
    );
  });
});
