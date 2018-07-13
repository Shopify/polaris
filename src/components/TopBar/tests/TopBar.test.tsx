import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {mountWithAppProvider, findByTestID} from '../../../../tests/utilities';
import TopBar from '../TopBar';
import {Image, UnstyledLink} from '../../../components';
import {Menu, SearchField, UserMenu, Search} from '../components';

const logoAction = {
  id: 'polaris-logo',
  url: 'polaris.shopify.com',
  source: 'src/assets/polaris',
  accessibilityLabel: 'polaris-logo',
};

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

  it('has the polaris top bar data attribute', () => {
    const topBar = mountWithAppProvider(<TopBar />);

    expect(topBar.find('[data-polaris-top-bar]')).toHaveLength(1);
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

  describe('nav content', () => {
    it('renders a nav button when hasNav is true', () => {
      const topBar = mountWithAppProvider(<TopBar showNavToggle />);

      expect(findByTestID(topBar, 'nav-button')).toHaveLength(1);
    });

    it('sets onToggleNav on the nav button', () => {
      const spy = jest.fn();
      const topBar = mountWithAppProvider(
        <TopBar showNavToggle onNavToggle={spy} />,
      );

      findByTestID(topBar, 'nav-button').simulate('click');
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('will set focused state to true when the nav button is focused', () => {
      const topBar = mountWithAppProvider(<TopBar showNavToggle />);

      findByTestID(topBar, 'nav-button').simulate('focus');
      expect(topBar.state('focused')).toBe(true);
    });

    it('will set focused state to false when the nav button is blurred', () => {
      const topBar = mountWithAppProvider(<TopBar showNavToggle />);

      findByTestID(topBar, 'nav-button').simulate('focus');
      findByTestID(topBar, 'nav-button').simulate('blur');
      expect(topBar.state('focused')).toBe(false);
    });
  });

  describe('logo content', () => {
    it('renders an image', () => {
      const topBar = mountWithAppProvider(<TopBar logoAction={logoAction} />);

      expect(topBar.find(Image)).toHaveLength(1);
    });

    it('renders an unstyledlink', () => {
      const topBar = mountWithAppProvider(<TopBar logoAction={logoAction} />);

      expect(topBar.find(UnstyledLink)).toHaveLength(1);
    });
  });

  describe('search content', () => {
    const searchField = (
      <TopBar.SearchField onChange={noop} value="" placeholder="Search" />
    );

    const searchResults = <div id="search-content">Hello</div>;

    it('renders the search results', () => {
      const topBar = mountWithAppProvider(
        <TopBar searchResults={searchResults} searchField={searchField} />,
      );

      expect(topBar.find(Search)).toHaveLength(1);
    });

    it('renders the search prop', () => {
      const topBar = mountWithAppProvider(
        <TopBar searchResults={searchResults} searchField={searchField} />,
      );

      expect(topBar.find('#search-content')).toHaveLength(1);
    });

    it('passes the visible prop to search', () => {
      const topBar = mountWithAppProvider(
        <TopBar
          searchResults={searchResults}
          searchField={searchField}
          searchResultsVisible={false}
        />,
      );

      expect(topBar.find(Search).prop('visible')).toBe(false);
    });

    it('passes the onSearchDismiss prop to search', () => {
      const topBar = mountWithAppProvider(
        <TopBar
          searchResults={searchResults}
          onSearchResultsDismiss={noop}
          searchField={searchField}
        />,
      );

      expect(topBar.find(Search).prop('onDismiss')).toBe(noop);
    });
  });
});
