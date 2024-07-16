import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Navigation} from '../Navigation';
import {NavigationContext} from '../context';
import {Image} from '../../Image';
import {WithinContentContext} from '../../../utilities/within-content-context';

jest.mock('../../../utilities/breakpoints', () => ({
  ...(jest.requireActual('../../../utilities/breakpoints') as any),
  useBreakpoints: jest.fn(),
}));

describe('<Navigation />', () => {
  beforeEach(() => {
    mockUseBreakpoints(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('renders an image if the theme provider is present', () => {
    const navigation = mountWithApp(<Navigation location="/" />, {
      frame: {logo: {url: 'https://shopify.com/logo'}},
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

  it('will render logo suffix when `logoSuffix` is provided', () => {
    mockUseBreakpoints(true);
    const LogoSuffix = () => <div>Suffix</div>;
    const navigation = mountWithApp(
      <Navigation location="/" logoSuffix={<LogoSuffix />} />,
      {
        frame: {logo: {url: 'https://shopify.com/logo'}},
      },
    );
    expect(navigation).toContainReactComponent(LogoSuffix);
  });

  it('will not render logo suffix when `logoSuffix` is provided but mdUp is false', () => {
    mockUseBreakpoints(false);
    const LogoSuffix = () => <div>Suffix</div>;
    const navigation = mountWithApp(
      <Navigation location="/" logoSuffix={<LogoSuffix />} />,
      {
        frame: {logo: {url: 'https://shopify.com/logo'}},
      },
    );
    expect(navigation).not.toContainReactComponent(LogoSuffix);
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
      mockUseBreakpoints(true);
      const contextControl = <div />;
      const navigation = mountWithApp(
        <Navigation location="/" contextControl={contextControl} />,
      );
      expect(navigation).toContainReactComponent('div', {
        className: 'ContextControl',
      });
    });

    it('does not render the given context control if mdUp is false', () => {
      mockUseBreakpoints(false);
      const contextControl = <div />;
      const navigation = mountWithApp(
        <Navigation location="/" contextControl={contextControl} />,
      );
      expect(navigation).not.toContainReactComponent('div', {
        className: 'ContextControl',
      });
    });
  });
});

function mockUseBreakpoints(mdUp: boolean) {
  const useBreakpoints: jest.Mock = jest.requireMock(
    '../../../utilities/breakpoints',
  ).useBreakpoints;

  useBreakpoints.mockReturnValue({
    mdUp,
  });
}
