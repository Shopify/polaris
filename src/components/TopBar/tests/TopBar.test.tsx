import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider, findByTestID} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';
import {EventListener, Image, UnstyledLink} from 'components';
import {TopBar} from '../TopBar';
import {Menu, SearchField, UserMenu, Search} from '../components';

const actions = [
  {
    items: [{content: 'item content'}],
  },
];

describe('<TopBar />', () => {
  it('mounts', () => {
    const topBar = mountWithAppProvider(<TopBar />);

    expect(topBar.exists()).toBe(true);
  });

  describe('compound components', () => {
    it('renders the user prop', () => {
      const user = (
        <TopBar.UserMenu
          actions={actions}
          message={{
            title: 'Polaris',
            description: 'description',
            action: {onClick: noop, content: 'action content'},
            link: {to: '/', content: 'Link content'},
          }}
          name="some name"
          detail="some detail"
          initials="DR"
          open={false}
          onToggle={noop}
        />
      );
      const topBar = mountWithAppProvider(<TopBar userMenu={user} />);
      expect(topBar.find(UserMenu)).toHaveLength(1);
    });

    it('renders the searchField prop', () => {
      const searchField = (
        <TopBar.SearchField onChange={noop} value="" placeholder="Search" />
      );
      const topBar = mountWithAppProvider(<TopBar searchField={searchField} />);
      expect(topBar.find(SearchField)).toHaveLength(1);
    });

    it('renders the secondaryMenu prop', () => {
      const secondaryMenu = (
        <TopBar.Menu
          activatorContent="Toggle menu"
          actions={actions}
          open={false}
          onClose={noop}
          onOpen={noop}
        />
      );
      const topBar = mountWithAppProvider(
        <TopBar secondaryMenu={secondaryMenu} />,
      );
      expect(topBar.find(Menu)).toHaveLength(1);
    });
  });

  describe('navigation content', () => {
    it('renders a navigation button when hasNavigation is true', () => {
      const topBar = mountWithAppProvider(<TopBar showNavigationToggle />);

      expect(topBar.find('[aria-label="Toggle menu"]')).toHaveLength(1);
    });

    it('sets onToggleNavigation on the navigation button', () => {
      const spy = jest.fn();
      const topBar = mountWithAppProvider(
        <TopBar showNavigationToggle onNavigationToggle={spy} />,
      );

      topBar.find('[aria-label="Toggle menu"]').simulate('click');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('search content', () => {
    const searchField = (
      <TopBar.SearchField onChange={noop} value="" placeholder="Search" />
    );

    const searchResults = <div id="search-content">Hello</div>;

    it('renders the search results', () => {
      const topBar = mountWithAppProvider(
        <TopBar
          searchResults={searchResults}
          searchResultsVisible
          searchField={searchField}
        />,
      );

      expect(topBar.find(Search)).toHaveLength(1);
    });

    it('renders the search results when `searchResultsVisible` is false', () => {
      const topBar = mountWithAppProvider(
        <TopBar
          searchResults={searchResults}
          searchResultsVisible={false}
          searchField={searchField}
        />,
      );

      expect(topBar.find(Search)).toHaveLength(1);
    });

    it('renders the search prop', () => {
      const topBar = mountWithAppProvider(
        <TopBar
          searchResults={searchResults}
          searchResultsVisible
          searchField={searchField}
        />,
      );

      expect(topBar.find('#search-content')).toHaveLength(1);
    });

    it('passes the visible prop to search', () => {
      const topBar = mountWithAppProvider(
        <TopBar
          searchResults={searchResults}
          searchField={searchField}
          searchResultsVisible
        />,
      );

      expect(topBar.find(Search).prop('visible')).toBe(true);
    });

    it('passes the searchResultsOverlayVisible prop to search', () => {
      const topBar = mountWithAppProvider(
        <TopBar
          searchResults={searchResults}
          searchField={searchField}
          searchResultsOverlayVisible
        />,
      );

      expect(topBar.find(Search).prop('overlayVisible')).toBe(true);
    });

    it('passes the onSearchDismiss prop to search', () => {
      const topBar = mountWithAppProvider(
        <TopBar
          searchResults={searchResults}
          onSearchResultsDismiss={noop}
          searchResultsVisible
          searchField={searchField}
        />,
      );

      expect(topBar.find(Search).prop('onDismiss')).toBe(noop);
    });
  });

  describe('logo', () => {
    it('will render an image with the logo top bar source', () => {
      const topBar = mountWithAppProvider(<TopBar />, {
        theme: {
          logo: {
            topBarSource: './assets/shopify.svg',
          },
        },
      });
      expect(topBar.find(Image).prop('source')).toBe('./assets/shopify.svg');
    });

    it('will render an image with the logo accessibility label', () => {
      const topBar = mountWithAppProvider(<TopBar />, {
        theme: {
          logo: {
            accessibilityLabel: 'Shopify',
          },
        },
      });
      expect(topBar.find(Image).prop('alt')).toBe('Shopify');
    });

    it('will render an unstyled link with the logo URL', () => {
      const topBar = mountWithAppProvider(<TopBar />, {
        theme: {logo: {url: 'https://shopify.com'}},
      });
      expect(topBar.find(UnstyledLink).prop('url')).toBe('https://shopify.com');
    });

    it('will render an unstyled link with the logo width', () => {
      const topBar = mountWithAppProvider(<TopBar />, {
        theme: {logo: {width: 124}},
      });
      expect(topBar.find(UnstyledLink).prop('style')).toStrictEqual({
        width: '124px',
      });
    });

    it('will render an unstyled link with a default width', () => {
      const topBar = mountWithAppProvider(<TopBar />, {
        theme: {logo: {}},
      });
      expect(topBar.find(UnstyledLink).prop('style')).toStrictEqual({
        width: '104px',
      });
    });
  });

  describe('contextControl', () => {
    const mockContextControl = (
      <TopBar.Menu
        actions={[]}
        activatorContent="Switch contexts"
        open
        onOpen={noop}
        onClose={noop}
      />
    );

    it('renders', () => {
      const topBar = mountWithAppProvider(
        <TopBar contextControl={mockContextControl} />,
      );
      expect(findByTestID(topBar, 'ContextControl').exists()).toBe(true);
      expect(topBar.contains(mockContextControl)).toBe(true);
    });

    it('doesn’t render a logo when defined', () => {
      const topBar = mountWithAppProvider(
        <TopBar contextControl={mockContextControl} />,
        {
          theme: {
            logo: {topBarSource: './assets/shopify.svg'},
          },
        },
      );
      expect(topBar.find(Image).exists()).toBe(false);
    });

    it('doesn’t render the wrapper when not defined and no logo is available', () => {
      const topBar = mountWithAppProvider(<TopBar />);
      expect(findByTestID(topBar, 'ContextControl').exists()).toBe(false);
    });
  });

  describe('globalTheming', () => {
    it('does not render an EventListener by default', () => {
      const topBar = mountWithApp(<TopBar />);

      expect(topBar).not.toContainReactComponent(EventListener);
    });

    it('renders an EventListener when globalTheming is enabled', () => {
      const topBar = mountWithApp(<TopBar />, {
        features: {unstableGlobalTheming: true},
      });

      expect(topBar).toContainReactComponent(EventListener);
    });

    it('does not render a div with globalTheming className when globalTheming is undefined', () => {
      const topBar = mountWithApp(<TopBar />);

      expect(topBar).not.toContainReactComponent('div', {
        className: 'TopBar TopBar-globalTheming',
      });
    });

    it('renders a div with globalTheming className when globalTheming is enabled', () => {
      const topBar = mountWithApp(<TopBar />, {
        features: {unstableGlobalTheming: true},
      });

      expect(topBar).toContainReactComponent('div', {
        className: 'TopBar TopBar-globalTheming',
      });
    });
  });
});

function noop() {}
