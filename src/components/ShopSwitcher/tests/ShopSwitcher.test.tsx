import * as React from 'react';
import {mountWithAppProvider, trigger} from 'test-utilities';
import {filterShops, transformShopsToItems} from '../utilities';
import ActionList from '../../ActionList';
import TextField from '../../TextField';
import ShopSwitcher from '../ShopSwitcher';

describe('<ShopSwitcher />', () => {
  const mockProps = {
    shops: [],
    searchPlaceholder: '',
    activeIndex: 0,
    noResultsMessage: '',
    children(searchField: React.ReactNode, content: React.ReactNode) {
      return (
        <React.Fragment>
          {searchField}
          {content}
        </React.Fragment>
      );
    },
  };

  describe('shops', () => {
    it('is used to construct the action list items', () => {
      const shops = [
        {
          name: '',
          url: '',
        },
      ];
      const activeIndex = 0;
      const shopSwitcher = mountWithAppProvider(
        <ShopSwitcher {...mockProps} shops={shops} activeIndex={activeIndex} />,
      );
      const expectedItems = transformShopsToItems(shops, activeIndex);
      expect(shopSwitcher.find(ActionList).prop('items')).toEqual(
        expectedItems,
      );
    });

    it('shows a search field when there are 5 or more shops', () => {
      const shops = new Array(5).fill({
        name: '',
        url: '',
      });
      const shopSwitcher = mountWithAppProvider(
        <ShopSwitcher {...mockProps} shops={shops} />,
      );
      expect(shopSwitcher.find(TextField)).toHaveLength(1);
    });

    it('filters the shops when the search query changes', () => {
      const shops = [
        {
          name: 'Little Victories CA',
          url: 'http://little-victories.com',
        },
        {
          name: 'Toy Company',
          url: 'http://toy-company.com',
        },
        ...new Array(3).fill({
          name: '',
          url: '',
        }),
      ];
      const newQuery = 'toy';
      const activeIndex = 0;
      const newItems = transformShopsToItems(
        filterShops(newQuery, shops),
        activeIndex,
      );
      const shopSwitcher = mountWithAppProvider(
        <ShopSwitcher {...mockProps} shops={shops} activeIndex={activeIndex} />,
      );
      trigger(shopSwitcher.find(TextField), 'onChange', newQuery);
      expect(shopSwitcher.find(ActionList).prop('items')).toEqual(newItems);
    });

    it('renders the no results message when there are no shops found', () => {
      const noResultsMessage = 'No shops found.';
      const shops = new Array(5).fill({
        name: '',
        url: '',
      });
      const shopSwitcher = mountWithAppProvider(
        <ShopSwitcher
          {...mockProps}
          shops={shops}
          activeIndex={0}
          noResultsMessage={noResultsMessage}
        />,
      );
      trigger(shopSwitcher.find(TextField), 'onChange', 'toy');
      expect(shopSwitcher.contains(noResultsMessage)).toBeTruthy();
    });
  });

  describe('searchPlaceholder', () => {
    it('gets passed into the search field', () => {
      const shops = new Array(5).fill({
        name: '',
        url: '',
      });
      const searchPlaceholder = 'Search for a shop.';
      const shopSwitcher = mountWithAppProvider(
        <ShopSwitcher
          {...mockProps}
          shops={shops}
          searchPlaceholder={searchPlaceholder}
        />,
      );
      expect(shopSwitcher.find(TextField).prop('placeholder')).toBe(
        searchPlaceholder,
      );
    });
  });

  describe('children', () => {
    it('is used to render the content', () => {
      const content = <div />;
      const shopSwitcher = mountWithAppProvider(
        <ShopSwitcher {...mockProps}>{() => content}</ShopSwitcher>,
      );
      expect(shopSwitcher.contains(content)).toBeTruthy();
    });

    it('receives the search and content markup', () => {
      const childrenSpy = jest.fn(() => null);
      const shops = new Array(5).fill({
        name: '',
        url: '',
      });
      mountWithAppProvider(
        <ShopSwitcher {...mockProps} shops={shops}>
          {childrenSpy}
        </ShopSwitcher>,
      );
      const {
        mock: {
          calls: [[searchFieldMarkup, contentMarkup]],
        },
      } = childrenSpy;
      const argumentsMarkup = mountWithAppProvider(
        <React.Fragment>
          {searchFieldMarkup}
          {contentMarkup}
        </React.Fragment>,
      );
      expect(argumentsMarkup.find(TextField)).toHaveLength(1);
      expect(argumentsMarkup.find(ActionList)).toHaveLength(1);
    });
  });
});
