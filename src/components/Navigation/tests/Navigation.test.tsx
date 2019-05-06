import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import Navigation from '../Navigation';
import {UserMenu, Provider, Consumer} from '../components';

describe('<Navigation />', () => {
  it('mounts', () => {
    const navigation = mountWithAppProvider(<Navigation location="/" />);
    expect(navigation.exists()).toBe(true);
  });

  it('passes context', () => {
    const Child: React.SFC<{}> = (_props) => {
      return <Consumer>{({location}) => (location ? <div /> : null)}</Consumer>;
    };

    const navigation = mountWithAppProvider(
      <Provider value={{location: '/'}}>
        <Navigation location="/">
          <Child />
        </Navigation>
      </Provider>,
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
