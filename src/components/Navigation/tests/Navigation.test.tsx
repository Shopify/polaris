import React from 'react';
import {mountWithApp} from 'test-utilities';

import {Navigation} from '../Navigation';
import {NavigationContext} from '../context';
import {Image} from '../../Image';
import {WithinContentContext} from '../../../utilities/within-content-context';

describe('<Navigation />', () => {
  it('renders an image if the theme provider is present', () => {
    const navigation = mountWithApp(<Navigation location="/" />, {
      theme: {logo: {url: 'https://shopify.com/logo'}},
    });
    expect(navigation).toContainReactComponent(Image);
  });

  it('renders nav with aria-labelledby when passed as prop', () => {
    const label = 'label-id';
    const navigation = mountWithApp(
      <Navigation location="/" ariaLabelledBy={label} />,
    );
    expect(navigation).toContainReactComponent('nav', {
      'aria-labelledby': label,
    });
  });

  describe('context', () => {
    it('passes location context', () => {
      const Child: React.FunctionComponent = (_props) => {
        return (
          <NavigationContext.Consumer>
            {({location}) => {
              return location ? <div /> : null;
            }}
          </NavigationContext.Consumer>
        );
      };

      const navigation = mountWithApp(
        <NavigationContext.Provider value={{location: '/'}}>
          <Navigation location="/">
            <Child />
          </Navigation>
        </NavigationContext.Provider>,
      );

      expect(navigation.find(Child)).toContainReactComponent('div');
    });

    it('has a child with contentContext', () => {
      const Child: React.FunctionComponent = (_props) => {
        return (
          <WithinContentContext.Consumer>
            {(withinContentContainer) => {
              return withinContentContainer ? <div /> : null;
            }}
          </WithinContentContext.Consumer>
        );
      };

      const navigation = mountWithApp(
        <Navigation location="/">
          <Child />
        </Navigation>,
      );

      expect(navigation.find(Child)).toContainReactComponentTimes('div', 1);
    });
  });

  describe('contextControl', () => {
    it('doesn’t render by default', () => {
      const navigation = mountWithApp(<Navigation location="/" />);
      expect(navigation).not.toContainReactComponent('div', {
        className: 'ContextControl',
      });
    });

    it('renders the given context control', () => {
      const contextControl = <div />;
      const navigation = mountWithApp(
        <Navigation location="/" contextControl={contextControl} />,
      );
      expect(navigation).toContainReactComponent('div', {
        className: 'ContextControl',
      });
    });
  });
});
