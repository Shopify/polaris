import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {
  mountWithAppProvider,
  shallowWithAppProvider,
  findByTestID,
} from 'test-utilities';
import {createAppProviderContext, Image, UnstyledLink} from 'components';
import TopBar from '../TopBar';
import {Menu, SearchField, UserMenu, Search} from '../components';
import {createThemeContext, ThemeContext} from '../../ThemeProvider';
import {polarisAppProviderContextTypes} from '../../AppProvider';

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

    it('sets focused state to true when the navigation button is focused', () => {
      const topBar = shallowWithAppProvider(<TopBar showNavigationToggle />);

      topBar.find('[aria-label="Toggle menu"]').simulate('focus');
      expect(topBar.state('focused')).toBe(true);
    });

    it('sets focused state to false when the navigation button is blurred', () => {
      const topBar = shallowWithAppProvider(<TopBar showNavigationToggle />);

      topBar.find('[aria-label="Toggle menu"]').simulate('focus');
      topBar.find('[aria-label="Toggle menu"]').simulate('blur');
      expect(topBar.state('focused')).toBe(false);
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
      const topBar = mountWithAppProvider(
        <TopBar />,
        addPolarisContext({
          logo: {
            topBarSource: './assets/shopify.svg',
          },
          subscribe: () => {},
          unsubscribe: () => {},
        }),
      );
      expect(topBar.find(Image).prop('source')).toBe('./assets/shopify.svg');
    });

    it('will render an image with the logo accessibility label', () => {
      const topBar = mountWithAppProvider(
        <TopBar />,
        addPolarisContext({
          logo: {
            accessibilityLabel: 'Shopify',
          },
          subscribe: () => {},
          unsubscribe: () => {},
        }),
      );
      expect(topBar.find(Image).prop('alt')).toBe('Shopify');
    });

    it('will render an unstyled link with the logo URL', () => {
      const topBar = mountWithAppProvider(
        <TopBar />,
        addPolarisContext({
          logo: {
            url: 'https://shopify.com',
          },
          subscribe: () => {},
          unsubscribe: () => {},
        }),
      );
      expect(topBar.find(UnstyledLink).prop('url')).toBe('https://shopify.com');
    });

    it('will render an unstyled link with the logo width', () => {
      const topBar = mountWithAppProvider(
        <TopBar />,
        addPolarisContext({
          logo: {
            width: 124,
          },
          subscribe: () => {},
          unsubscribe: () => {},
        }),
      );
      expect(topBar.find(UnstyledLink).prop('style')).toEqual({width: '124px'});
    });

    it('will render an unstyled link with a default width', () => {
      const topBar = mountWithAppProvider(
        <TopBar />,
        addPolarisContext({
          logo: {},
          subscribe: () => {},
          unsubscribe: () => {},
        }),
      );
      expect(topBar.find(UnstyledLink).prop('style')).toEqual({width: '104px'});
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
      expect(topBar.contains(mockContextControl)).toBe(true);
    });

    it('doesn’t render a logo when defined', () => {
      const topBar = shallowWithAppProvider(
        <TopBar contextControl={mockContextControl} />,
        addPolarisContext({
          logo: {
            topBarSource: './assets/shopify.svg',
          },
          subscribe: () => {},
          unsubscribe: () => {},
        }),
      );
      expect(topBar.find(Image).exists()).toBe(false);
    });

    it('doesn’t render the wrapper when not defined and no logo is available', () => {
      const topBar = mountWithAppProvider(<TopBar />);
      expect(findByTestID(topBar, 'ContextControl').exists()).toBe(false);
    });
  });
});

function addPolarisContext(logo: ThemeContext) {
  const context = {
    ...createAppProviderContext(),
    ...createThemeContext(logo),
  };

  return {
    context,
    childContextTypes: polarisAppProviderContextTypes,
  };
}
