import * as React from 'react';
import * as PropTypes from 'prop-types';
import {mountWithAppProvider} from 'test-utilities';
import Navigation from '../Navigation';
import {UserMenu, ShopSwitcher} from '../components';

const childContextTypes = {
  location: PropTypes.string,
  onNavigationDismiss: PropTypes.func,
};

describe('<Navigation />', () => {
  it('mounts', () => {
    const navigation = mountWithAppProvider(<Navigation location="/" />);
    expect(navigation.exists()).toBe(true);
  });

  it('passes context', () => {
    const Child: React.SFC<{}> = (_props, context) =>
      context.location ? <div /> : null;
    Child.contextTypes = childContextTypes;

    const navigation = mountWithAppProvider(
      <Navigation location="/">
        <Child />
      </Navigation>,
    );

    const div = navigation
      .find(Child)
      .find('div')
      .first();

    expect(div.exists()).toBe(true);
  });

  describe('userMenu', () => {
    it('renders the given user menu', () => {
      const userMenu = <UserMenu avatarInitials="" />;
      const navigation = mountWithAppProvider(
        <Navigation location="/" userMenu={userMenu} />,
      );
      expect(navigation.contains(userMenu)).toBeTruthy();
    });
  });

  describe('shopSwitcher', () => {
    it('renders the given shop switcher', () => {
      const userMenu = (
        <ShopSwitcher
          shops={[
            {
              name: '',
              url: '',
            },
          ]}
          searchPlaceholder=""
          noResultsMessage=""
          activeIndex={0}
        />
      );
      const navigation = mountWithAppProvider(
        <Navigation location="/" userMenu={userMenu} />,
      );
      expect(navigation.contains(userMenu)).toBeTruthy();
    });
  });
});
