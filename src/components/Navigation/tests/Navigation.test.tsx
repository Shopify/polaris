import React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import Navigation from '../Navigation';
import NavigationContext from '../context';
import {UserMenu} from '../components';
import WithinContentContext from '../../WithinContentContext';

describe('<Navigation />', () => {
  it('mounts', () => {
    const navigation = mountWithAppProvider(<Navigation location="/" />);
    expect(navigation.exists()).toBe(true);
  });

  describe('context', () => {
    it('passes location context', () => {
      const Child: React.SFC<{}> = (_props) => {
        return (
          <NavigationContext.Consumer>
            {({location}) => (location ? <div /> : null)}
          </NavigationContext.Consumer>
        );
      };

      const navigation = mountWithAppProvider(
        <NavigationContext.Provider value={{location: '/'}}>
          <Navigation location="/">
            <Child />
          </Navigation>
        </NavigationContext.Provider>,
      );

      const div = navigation
        .find(Child)
        .find('div')
        .first();

      expect(div.exists()).toBe(true);
    });

    it('has a child with contentContext', () => {
      const Child: React.SFC<{}> = (_props) => {
        return (
          <WithinContentContext.Consumer>
            {(withinContentContainer) =>
              withinContentContainer ? <div /> : null
            }
          </WithinContentContext.Consumer>
        );
      };

      const navigation = mountWithAppProvider(
        <Navigation location="/">
          <Child />
        </Navigation>,
      );

      expect(navigation.find(Child).find('div')).toHaveLength(1);
    });
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
