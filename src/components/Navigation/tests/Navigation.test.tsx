import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';
import {Navigation} from '../Navigation';
import {NavigationContext} from '../context';
import {Image} from '../../Image';
import {WithinContentContext} from '../../../utilities/within-content-context';

describe('<Navigation />', () => {
  it('mounts', () => {
    const navigation = mountWithAppProvider(<Navigation location="/" />);
    expect(navigation.exists()).toBe(true);
  });

  describe('context', () => {
    it('passes location context', () => {
      const Child: React.SFC = (_props) => {
        return (
          <NavigationContext.Consumer>
            {({location}) => {
              return location ? <div /> : null;
            }}
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
      const Child: React.SFC = (_props) => {
        return (
          <WithinContentContext.Consumer>
            {(withinContentContainer) => {
              return withinContentContainer ? <div /> : null;
            }}
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

  describe('unstableGlobalTheming', () => {
    it('renders an image if unstableGlobalTheming is true and a logo from the theme provider is present', () => {
      const navigation = mountWithApp(<Navigation location="/" />, {
        theme: {logo: {url: 'https://shopify.com/logo'}},
        features: {unstableGlobalTheming: true},
      });
      expect(navigation).toContainReactComponent(Image);
    });

    it('does not render a nav element with globalTheming className if unstableGlobalTheming is undefined', () => {
      const navigation = mountWithApp(<Navigation location="/" />);
      expect(navigation).not.toContainReactComponent('nav', {
        className: 'Navigation Navigation-globalTheming',
      });
    });

    it('renders a nav element with globalTheming className if unstableGlobalTheming is true', () => {
      const navigation = mountWithApp(<Navigation location="/" />, {
        features: {unstableGlobalTheming: true},
        theme: {logo: {}},
      });
      expect(navigation).toContainReactComponent('nav', {
        className: 'Navigation Navigation-globalTheming',
      });
    });

    it('renders a nav element with noMedia className if no media element is present and unstableGlobalTheming is true', () => {
      const navigation = mountWithApp(<Navigation location="/" />, {
        features: {unstableGlobalTheming: true},
      });
      expect(navigation).toContainReactComponent('nav', {
        className: 'Navigation Navigation-noMedia Navigation-globalTheming',
      });
    });
  });
});
