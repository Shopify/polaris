import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {
  mountWithAppProvider,
  shallowWithAppProvider,
} from '../../../../tests/utilities';
import TopBar from '../TopBar';
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

      expect(topBar.find('[aria-label="Toggle menu"]')).toHaveLength(1);
    });

    it('sets onToggleNav on the nav button', () => {
      const spy = jest.fn();
      const topBar = mountWithAppProvider(
        <TopBar showNavToggle onNavToggle={spy} />,
      );

      topBar.find('[aria-label="Toggle menu"]').simulate('click');
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('will set focused state to true when the nav button is focused', () => {
      const topBar = shallowWithAppProvider(<TopBar showNavToggle />);

      topBar.find('[aria-label="Toggle menu"]').simulate('focus');
      expect(topBar.state('focused')).toBe(true);
    });

    it('will set focused state to false when the nav button is blurred', () => {
      const topBar = shallowWithAppProvider(<TopBar showNavToggle />);

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
