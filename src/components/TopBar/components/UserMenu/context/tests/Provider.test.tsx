import * as React from 'react';
import {mountWithAppProvider, trigger} from 'test-utilities';
import UserMenuContext from '../context';
import Provider from '../Provider';

jest.mock('../context', () => ({
  Provider: ({children}: {children: React.ReactNode}) => children,
}));

describe('<Provider />', () => {
  const mockProps = {
    mobileView: false,
    children: null,
  };

  describe('mobileView', () => {
    it('gets passed into the context provider', () => {
      const mobileView = true;
      const provider = mountWithAppProvider(
        <Provider {...mockProps} mobileView={mobileView} />,
      );
      expect(provider.find(UserMenuContext.Provider).prop('value')).toEqual(
        expect.objectContaining({
          mobileView,
        }),
      );
    });

    it('updates the context provider when it changes', () => {
      const mobileView = true;
      const newMobileView = false;
      const provider = mountWithAppProvider(
        <Provider {...mockProps} mobileView={mobileView} />,
      );
      provider.setProps({mobileView: newMobileView});
      expect(provider.find(UserMenuContext.Provider).prop('value')).toEqual(
        expect.objectContaining({
          mobileView: newMobileView,
        }),
      );
    });
  });

  describe('children', () => {
    it('get passed into the context provider', () => {
      const children = <div />;
      const provider = mountWithAppProvider(
        <Provider {...mockProps}>{children}</Provider>,
      );
      expect(
        provider.find(UserMenuContext.Provider).contains(children),
      ).toBeTruthy();
    });
  });

  describe('<UserMenuContext.Provider />', () => {
    it('receives updated menu props when setMobileUserMenuProps is called', () => {
      const newUserMenuProps = {initials: 'JD'};
      const provider = mountWithAppProvider(<Provider {...mockProps} />);
      trigger(
        provider.find(UserMenuContext.Provider),
        'value.setMobileUserMenuProps',
        newUserMenuProps,
      );
      expect(provider.find(UserMenuContext.Provider).prop('value')).toEqual(
        expect.objectContaining({
          mobileUserMenuProps: newUserMenuProps,
        }),
      );
    });
  });
});
