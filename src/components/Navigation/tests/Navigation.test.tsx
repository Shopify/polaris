import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {Navigation} from '../Navigation';
import {NavigationContext} from '../context';
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

      const div = navigation.find(Child).find('div').first();

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
});
