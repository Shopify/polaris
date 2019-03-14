import * as React from 'react';
import * as PropTypes from 'prop-types';
import {mountWithAppProvider} from 'test-utilities';
import Navigation from '../Navigation';
import {UserMenu} from '../components';

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

  describe('contextControl', () => {
    it('doesn’t render by default', () => {
      const contextControl = <div />;
      const navigation = mountWithAppProvider(<Navigation location="/" />);
      expect(navigation.contains(contextControl)).toBe(false);
    });

    it('renders the given context control', () => {
      const contextControl = <div />;
      const navigation = mountWithAppProvider(
        <Navigation location="/" contextControl={contextControl} />,
      );
      expect(navigation.contains(contextControl)).toBe(true);
    });
  });
});
