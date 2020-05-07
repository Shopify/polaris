import React from 'react';
import {
  ResourceList,
  Select,
  Spinner,
  EmptySearchResult,
  ResourceItem,
  EventListener,
  Button,
} from 'components';
// eslint-disable-next-line no-restricted-imports
import {
  findByTestID,
  mountWithAppProvider,
  trigger,
  ReactWrapper,
} from 'test-utilities/legacy';

import {BulkActions, CheckableButton} from '../components';

const itemsNoID = [{url: 'item 1'}, {url: 'item 2'}];
const singleItemNoID = [{url: 'item 1'}];
const singleItemWithID = [{id: '1', url: 'item 1'}];

const itemsWithID = [
  {id: '5', name: 'item 1', url: 'www.test.com', title: 'title 1'},
  {id: '6', name: 'item 2', url: 'www.test.com', title: 'title 2'},
  {id: '7', name: 'item 3', url: 'www.test.com', title: 'title 3'},
];
const allSelectedIDs = ['5', '6', '7'];
const promotedBulkActions = [{content: 'action'}, {content: 'action 2'}];
const bulkActions = [{content: 'action 3'}, {content: 'action 4'}];
const sortOptions = [
  'Product title (A-Z)',
  {
    value: 'PRODUCT_TITLE_DESC',
    label: 'Product title (Z-A)',
  },
  {
    value: 'EXTRA',
    label: 'Disabled Option',
    disabled: true,
  },
];

const alternateTool = <div id="AlternateTool">Alternate Tool</div>;
const defaultWindowWidth = window.innerWidth;

describe('<ResourceList />', () => {
  describe('renderItem', () => {
    it('renders list items', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList items={itemsWithID} renderItem={renderItem} />,
      );
      expect(resourceList.find('li')).toHaveLength(3);
    });

    it('renders custom markup', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList items={itemsWithID} renderItem={renderCustomMarkup} />,
      );
      expect(
        resourceList
          .find('li')
          .first()
          .children()
          .html(),
      ).toBe('<p>title 1</p>');
    });
  });

  describe('Selectable', () => {
    it('does not render bulk actions if the promotedBulkActions and the bulkActions props are not provided', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList items={itemsWithID} renderItem={renderItem} />,
      );
      expect(resourceList.find(BulkActions).exists()).toBe(false);
    });

    it('does not render a `CheckableButton` if the `selectable` prop is not provided', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList items={itemsWithID} renderItem={renderItem} />,
      );
      expect(resourceList.find(CheckableButton).exists()).toBe(false);
    });

    it('does render bulk actions if the promotedBulkActions prop is provided', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={itemsWithID}
          renderItem={renderItem}
          promotedBulkActions={promotedBulkActions}
        />,
      );
      expect(resourceList.find(BulkActions).exists()).toBe(true);
    });

    it('renders bulk actions if the bulkActions prop is provided', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={itemsWithID}
          renderItem={renderItem}
          bulkActions={bulkActions}
        />,
      );
      expect(resourceList.find(BulkActions).exists()).toBe(true);
    });

    it('renders a `CheckableButton` if the `selectable` prop is true', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList selectable items={itemsWithID} renderItem={renderItem} />,
      );
      expect(resourceList.find(CheckableButton).exists()).toBe(true);
    });
  });

  describe('hasMoreItems', () => {
    it('does not add a prop of paginatedSelectAllAction to BulkActions if omitted', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={itemsNoID}
          renderItem={renderItem}
          bulkActions={bulkActions}
        />,
      );
      expect(
        resourceList.find(BulkActions).prop('paginatedSelectAllAction'),
      ).toBeUndefined();
    });

    it('adds a prop of paginatedSelectAllAction to BulkActions if included', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={itemsNoID}
          hasMoreItems
          renderItem={renderItem}
          bulkActions={bulkActions}
        />,
      );
      expect(
        resourceList.find(BulkActions).prop('paginatedSelectAllAction'),
      ).toBeDefined();
    });
  });

  describe('resourceName', () => {
    describe('resoureName.singular', () => {
      it('renders default singular resource name when resourceName isn’t provided', () => {
        const resourceList = mountWithAppProvider(
          <ResourceList
            showHeader
            items={singleItemNoID}
            renderItem={renderItem}
          />,
        );
        expect(findByTestID(resourceList, 'headerTitleWrapper').text()).toBe(
          'Showing 1 item',
        );
      });

      it('renders the given singular resource name when resourceName is provided', () => {
        const resourceList = mountWithAppProvider(
          <ResourceList
            items={singleItemNoID}
            renderItem={renderItem}
            resourceName={{singular: 'product', plural: 'products'}}
            showHeader
          />,
        );
        expect(findByTestID(resourceList, 'headerTitleWrapper').text()).toBe(
          'Showing 1 product',
        );
      });
    });

    describe('resoureName.plural', () => {
      it('renders default plural resource name when resourceName isn’t provided', () => {
        const resourceList = mountWithAppProvider(
          <ResourceList items={itemsNoID} renderItem={renderItem} showHeader />,
        );
        expect(findByTestID(resourceList, 'headerTitleWrapper').text()).toBe(
          'Showing 2 items',
        );
      });

      it('renders the given plural resource name when resourceName is provided', () => {
        const resourceList = mountWithAppProvider(
          <ResourceList
            items={itemsNoID}
            renderItem={renderItem}
            resourceName={{singular: 'product', plural: 'products'}}
            showHeader
          />,
        );
        expect(findByTestID(resourceList, 'headerTitleWrapper').text()).toBe(
          'Showing 2 products',
        );
      });
    });
  });

  describe('headerTitle', () => {
    it('prints loading text when loading is true', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={singleItemWithID}
          renderItem={renderItem}
          bulkActions={bulkActions}
          loading
        />,
      );

      expect(findByTestID(resourceList, 'headerTitleWrapper').text()).toBe(
        'Loading items',
      );
    });

    it('prints number of items shown when totalItemsCount is not provided', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={itemsNoID}
          renderItem={renderItem}
          resourceName={{singular: 'product', plural: 'products'}}
          showHeader
        />,
      );

      expect(findByTestID(resourceList, 'headerTitleWrapper').text()).toBe(
        'Showing 2 products',
      );
    });

    it('prints number of items shown of totalItemsCount when totalItemsCount is provided', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={itemsNoID}
          renderItem={renderItem}
          resourceName={{singular: 'product', plural: 'products'}}
          showHeader
          totalItemsCount={5}
        />,
      );

      expect(findByTestID(resourceList, 'headerTitleWrapper').text()).toBe(
        'Showing 2 of 5 products',
      );
    });

    it('prints number of items shown of totalItemsCount plural when totalItemsCount is provided and items is one resource', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={singleItemNoID}
          renderItem={renderItem}
          resourceName={{singular: 'product', plural: 'products'}}
          showHeader
          totalItemsCount={5}
        />,
      );

      expect(findByTestID(resourceList, 'headerTitleWrapper').text()).toBe(
        'Showing 1 of 5 products',
      );
    });
  });

  describe('bulkActionsAccessibilityLabel', () => {
    it('provides the BulkActions with the right accessibilityLabel if there’s 1 item and it isn’t selected', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={singleItemWithID}
          renderItem={renderItem}
          bulkActions={bulkActions}
        />,
      );
      expect(resourceList.find(BulkActions).prop('accessibilityLabel')).toBe(
        'Select item',
      );
    });

    it('provides the BulkActions with the right accessibilityLabel if there’s 1 item and it is selected', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={singleItemWithID}
          renderItem={renderItem}
          bulkActions={bulkActions}
          selectedItems={['1']}
        />,
      );
      expect(resourceList.find(BulkActions).prop('accessibilityLabel')).toBe(
        'Deselect item',
      );
    });

    it('provides the BulkActions with the right accessibilityLabel if there are multiple items and they are selected', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={itemsWithID}
          renderItem={renderItem}
          bulkActions={bulkActions}
          selectedItems={['5', '6', '7']}
        />,
      );
      expect(resourceList.find(BulkActions).prop('accessibilityLabel')).toBe(
        'Deselect all 3 items',
      );
    });
    it('provides the BulkActions with the right accessibilityLabel if there’s multiple items and some or none are selected', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={itemsWithID}
          renderItem={renderItem}
          bulkActions={bulkActions}
        />,
      );
      expect(resourceList.find(BulkActions).prop('accessibilityLabel')).toBe(
        'Select all 3 items',
      );
    });
  });

  describe('idForItem()', () => {
    it('generates a key using the index if there’s no idForItem prop and no ID in data', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList items={itemsNoID} renderItem={renderItem} />,
      );
      expect(
        resourceList
          .find('li')
          .first()
          .key(),
      ).toBe('0');
    });

    it('generates a key using the ID if there’s no idForItem prop but there and ID key in the data', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList items={itemsWithID} renderItem={renderItem} />,
      );
      expect(
        resourceList
          .find('li')
          .first()
          .key(),
      ).toBe('5');
    });

    it('generates a key using the idForItem prop callback when one is provided', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          idForItem={idForItem}
          items={itemsWithID}
          renderItem={renderItem}
        />,
      );
      expect(
        resourceList
          .find('li')
          .first()
          .key(),
      ).toBe(idForItem(itemsWithID[0]));
    });
  });

  describe('onSelectionChange()', () => {
    it('calls onSelectionChange() when an item is clicked', () => {
      const onSelectionChange = jest.fn();
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={itemsWithID}
          selectedItems={[]}
          promotedBulkActions={promotedBulkActions}
          renderItem={renderItem}
          onSelectionChange={onSelectionChange}
        />,
      );
      const firstItem = resourceList.find(ResourceItem).first();
      findByTestID(firstItem, 'LargerSelectionArea').simulate('click');
      expect(onSelectionChange).toHaveBeenCalled();
    });
  });

  describe('header markup', () => {
    it('renders header markup if the list isn’t selectable but the showHeader prop is true', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList showHeader items={itemsWithID} renderItem={renderItem} />,
      );
      expect(findByTestID(resourceList, 'ResourceList-Header').exists()).toBe(
        true,
      );
    });

    it('does not render when items is empty', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList items={[]} renderItem={renderItem} />,
      );
      expect(findByTestID(resourceList, 'ResourceList-Header').exists()).toBe(
        false,
      );
    });

    it('renders when sort options are given', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          sortOptions={sortOptions}
          onSortChange={noop}
          items={itemsWithID}
          renderItem={renderItem}
        />,
      );
      expect(findByTestID(resourceList, 'ResourceList-Header').exists()).toBe(
        true,
      );
    });

    it('renders when an alternateTool is provided', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          alternateTool={alternateTool}
          items={itemsWithID}
          renderItem={renderItem}
        />,
      );
      expect(findByTestID(resourceList, 'ResourceList-Header').exists()).toBe(
        true,
      );
    });

    it('renders when bulkActions are given', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          bulkActions={bulkActions}
          items={itemsWithID}
          renderItem={renderItem}
        />,
      );
      expect(findByTestID(resourceList, 'ResourceList-Header').exists()).toBe(
        true,
      );
    });

    it('renders when promotedBulkActions are given', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          promotedBulkActions={promotedBulkActions}
          items={itemsWithID}
          renderItem={renderItem}
        />,
      );
      expect(findByTestID(resourceList, 'ResourceList-Header').exists()).toBe(
        true,
      );
    });

    it('does not render when sort options, bulkActions and promotedBulkActions are not given', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList items={itemsWithID} renderItem={renderItem} />,
      );
      expect(findByTestID(resourceList, 'ResourceList-Header').exists()).toBe(
        false,
      );
    });

    it('renders on non-initial load when items are provided', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          bulkActions={bulkActions}
          items={[]}
          renderItem={renderItem}
        />,
      );

      expect(findByTestID(resourceList, 'ResourceList-Header')).toHaveLength(0);
      resourceList.setProps({items: itemsWithID});
      resourceList.update();
      expect(findByTestID(resourceList, 'ResourceList-Header')).toHaveLength(1);
    });

    it('does not render when EmptySearchResult exists', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={[]}
          renderItem={renderItem}
          filterControl={<div>fake filterControl</div>}
        />,
      );

      expect(resourceList.find(EmptySearchResult).exists()).toBe(true);
      expect(findByTestID(resourceList, 'ResourceList-Header')).toHaveLength(0);
    });
  });

  describe('filterControl', () => {
    it('renders when exist', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={itemsNoID}
          renderItem={renderItem}
          filterControl={<div id="test123">Test</div>}
        />,
      );
      expect(resourceList.find('#test123').exists()).toBe(true);
    });
  });

  describe('emptySearchResult', () => {
    it('renders when filterControl exists and items is empty', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={[]}
          renderItem={renderItem}
          filterControl={<div>fake filterControl</div>}
        />,
      );
      expect(resourceList.find(EmptySearchResult).exists()).toBe(true);
    });

    it('does not render when filterControl does not exist', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList items={[]} renderItem={renderItem} />,
      );
      expect(resourceList.find(EmptySearchResult).exists()).toBe(false);
    });

    it('does not render when items is not empty', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={itemsNoID}
          renderItem={renderItem}
          filterControl={<div id="test123">Test</div>}
        />,
      );
      expect(resourceList.find(EmptySearchResult).exists()).toBe(false);
    });

    it('does not render when filterControl exists, items is empty, and loading is true', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={[]}
          renderItem={renderItem}
          filterControl={<div>fake filterControl</div>}
          loading
        />,
      );
      expect(resourceList.find(EmptySearchResult).exists()).toBe(false);
    });

    it('does not render when alternateEmptyState is set', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={[]}
          renderItem={renderItem}
          filterControl={<div>fake filterControl</div>}
          alternateEmptyState={
            <div id="alternateEmptyState">Alternate empty state</div>
          }
        />,
      );

      expect(resourceList.find(EmptySearchResult).exists()).toBe(false);
      expect(resourceList.find('div#alternateEmptyState').exists()).toBe(true);
    });
  });

  describe('Sorting', () => {
    it('does not render a sort select if sortOptions aren’t provided', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList items={itemsWithID} renderItem={renderItem} />,
      );
      expect(resourceList.find(Select).exists()).toBe(false);
    });

    it('renders a sort select if sortOptions are provided', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={itemsWithID}
          sortOptions={sortOptions}
          onSortChange={noop}
          renderItem={renderItem}
        />,
      );
      expect(resourceList.find(Select).exists()).toBe(true);
    });

    it('does not render a sort select if an alternateTool is provided', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={itemsWithID}
          renderItem={renderItem}
          sortOptions={sortOptions}
          onSortChange={noop}
          alternateTool={alternateTool}
        />,
      );
      expect(resourceList.find(Select).exists()).toBe(false);
    });

    describe('sortOptions', () => {
      it('passes a sortOptions to the Select options', () => {
        const resourceList = mountWithAppProvider(
          <ResourceList
            items={itemsWithID}
            sortOptions={sortOptions}
            onSortChange={noop}
            renderItem={renderItem}
          />,
        );
        expect(resourceList.find(Select).props()).toHaveProperty(
          'options',
          sortOptions,
        );
      });
    });

    describe('sortValue', () => {
      it('passes a sortValue to the Select value', () => {
        const onSortChange = jest.fn();
        const resourceList = mountWithAppProvider(
          <ResourceList
            items={itemsWithID}
            sortOptions={sortOptions}
            sortValue="sortValue"
            onSortChange={onSortChange}
            renderItem={renderItem}
          />,
        );
        expect(resourceList.find(Select).props()).toHaveProperty(
          'value',
          'sortValue',
        );
      });
    });

    describe('onSortChange', () => {
      it('calls onSortChange when the Sort Select changes', () => {
        const onSortChange = jest.fn();
        const resourceList = mountWithAppProvider(
          <ResourceList
            items={itemsWithID}
            onSortChange={onSortChange}
            sortOptions={sortOptions}
            renderItem={renderItem}
          />,
        );
        trigger(resourceList.find(Select), 'onChange', 'PRODUCT_TITLE_DESC');
        expect(onSortChange).toHaveBeenCalledWith('PRODUCT_TITLE_DESC');
      });
    });
  });

  describe('Alternate Tool', () => {
    it('does not render if an alternateTool is not provided', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList items={itemsWithID} renderItem={renderItem} />,
      );
      expect(resourceList.find('#AlternateTool').exists()).toBe(false);
    });

    it('renders if an alternateTool is provided', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={itemsWithID}
          renderItem={renderItem}
          alternateTool={alternateTool}
        />,
      );
      expect(resourceList.find('#AlternateTool').exists()).toBe(true);
    });

    it('renders even if sortOptions are provided', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={itemsWithID}
          renderItem={renderItem}
          sortOptions={sortOptions}
          alternateTool={alternateTool}
        />,
      );
      expect(resourceList.find('#AlternateTool').exists()).toBe(true);
    });

    describe('sortOptions', () => {
      it('passes a sortOptions to the Select options', () => {
        const resourceList = mountWithAppProvider(
          <ResourceList
            items={itemsWithID}
            sortOptions={sortOptions}
            renderItem={renderItem}
            onSortChange={noop}
          />,
        );
        expect(resourceList.find(Select).props()).toHaveProperty(
          'options',
          sortOptions,
        );
      });
    });

    describe('sortValue', () => {
      it('passes a sortValue to the Select value', () => {
        const onSortChange = jest.fn();
        const resourceList = mountWithAppProvider(
          <ResourceList
            items={itemsWithID}
            sortOptions={sortOptions}
            sortValue="sortValue"
            onSortChange={onSortChange}
            renderItem={renderItem}
          />,
        );
        expect(resourceList.find(Select).props()).toHaveProperty(
          'value',
          'sortValue',
        );
      });
    });

    describe('onSortChange', () => {
      it('calls onSortChange when the Sort Select changes', () => {
        const onSortChange = jest.fn();
        const resourceList = mountWithAppProvider(
          <ResourceList
            items={itemsWithID}
            onSortChange={onSortChange}
            sortOptions={sortOptions}
            renderItem={renderItem}
          />,
        );
        trigger(resourceList.find(Select), 'onChange', 'PRODUCT_TITLE_DESC');
        expect(onSortChange).toHaveBeenCalledWith('PRODUCT_TITLE_DESC');
      });
    });
  });

  describe('loading', () => {
    it('renders a spinner', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={itemsWithID}
          sortOptions={sortOptions}
          onSortChange={noop}
          renderItem={renderItem}
          loading
        />,
      );

      expect(resourceList.find(Spinner).exists()).toBe(true);
    });

    it('renders a spinner after initial load when loading is true', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={itemsWithID}
          sortOptions={sortOptions}
          onSortChange={noop}
          renderItem={renderItem}
        />,
      );

      resourceList.setProps({loading: true});
      expect(resourceList.find(Spinner).exists()).toBe(true);
    });

    it('does not render an <Item /> if loading is true and there are no items', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={[]}
          sortOptions={sortOptions}
          onSortChange={noop}
          renderItem={renderItem}
          loading
        />,
      );

      expect(resourceList.find(ResourceItem)).toHaveLength(0);
    });
  });

  describe('BulkActions', () => {
    it('renders on initial load when items are selected', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={singleItemWithID}
          renderItem={renderItem}
          bulkActions={bulkActions}
          selectedItems={['1']}
        />,
      );
      expect(resourceList.find(BulkActions)).toHaveLength(1);
    });

    it('enables select mode when items are programmatically selected', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={singleItemWithID}
          renderItem={renderItem}
          bulkActions={bulkActions}
          selectedItems={[]}
        />,
      );

      expect(resourceList.find(BulkActions).prop('selectMode')).toBe(false);
      resourceList.setProps({selectedItems: ['1']});
      resourceList.update();
      expect(resourceList.find(BulkActions).prop('selectMode')).toBe(true);
    });

    it('disables select mode when items are deselected programmatically selected', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={singleItemWithID}
          renderItem={renderItem}
          bulkActions={bulkActions}
          selectedItems={['1']}
        />,
      );

      expect(resourceList.find(BulkActions).prop('selectMode')).toBe(true);
      resourceList.setProps({selectedItems: []});
      resourceList.update();
      expect(resourceList.find(BulkActions).prop('selectMode')).toBe(false);
    });

    describe('focus', () => {
      let setTimeoutSpy: jest.SpyInstance;

      beforeEach(() => {
        setTimeoutSpy = jest
          .spyOn(window, 'setTimeout')
          .mockImplementation((cb: any) => cb());
      });

      afterEach(() => {
        setTimeoutSpy.mockRestore();
      });

      describe('large screen', () => {
        it('focuses the checkbox in the bulk action when the plain CheckableButton is clicked', () => {
          const resourceList = mountWithAppProvider(
            <ResourceList
              items={itemsWithID}
              renderItem={renderItem}
              promotedBulkActions={promotedBulkActions}
            />,
          );

          const selectAllCheckableButton = plainCheckableButton(resourceList);

          trigger(selectAllCheckableButton, 'onToggleAll');

          const deselectAllCheckbox = bulkActionsCheckableButton(
            resourceList,
          ).find('input[type="checkbox"]');

          expect(deselectAllCheckbox.getDOMNode()).toBe(document.activeElement);
        });

        it('focuses the plain CheckableButton checkbox when items are selected and the deselect Checkable button the is clicked', () => {
          const resourceList = mountWithAppProvider(
            <ResourceList
              items={itemsWithID}
              renderItem={renderItem}
              selectedItems={allSelectedIDs}
              promotedBulkActions={promotedBulkActions}
            />,
          );

          const deselectAllCheckableButton = bulkActionsCheckableButton(
            resourceList,
          );

          trigger(deselectAllCheckableButton, 'onToggleAll');

          const selectAllCheckableCheckbox = plainCheckableButton(
            resourceList,
          ).find('input[type="checkbox"]');

          expect(selectAllCheckableCheckbox.getDOMNode()).toBe(
            document.activeElement,
          );
        });
      });

      describe('small screen', () => {
        afterEach(() => {
          setDefaultScreen();
        });

        it('keeps focus on the CheckableButton checkbox when selecting', () => {
          setSmallScreen();

          const resourceList = mountWithAppProvider(
            <ResourceList
              items={itemsWithID}
              renderItem={renderItem}
              promotedBulkActions={promotedBulkActions}
            />,
          );

          trigger(resourceList.find(Button).first(), 'onClick');

          const selectAllCheckableButton = bulkActionsCheckableButton(
            resourceList,
          );

          trigger(selectAllCheckableButton, 'onToggleAll');

          const checkBox = selectAllCheckableButton.find(
            'input[type="checkbox"]',
          );

          expect(checkBox.getDOMNode()).toBe(document.activeElement);
        });

        it('keeps focus on the CheckableButton checkbox when deselecting', () => {
          setSmallScreen();

          const resourceList = mountWithAppProvider(
            <ResourceList
              items={itemsWithID}
              selectedItems={allSelectedIDs}
              renderItem={renderItem}
              promotedBulkActions={promotedBulkActions}
            />,
          );

          const deselectAllCheckableButton = bulkActionsCheckableButton(
            resourceList,
          );

          trigger(deselectAllCheckableButton, 'onToggleAll');

          const checkBox = deselectAllCheckableButton.find(
            'input[type="checkbox"]',
          );

          expect(checkBox.getDOMNode()).toBe(document.activeElement);
        });
      });
    });
  });

  describe('multiselect', () => {
    it('selects shift selected items if resolveItemId was provided', () => {
      function resolveItemId(item: any) {
        return item.id;
      }
      const onSelectionChange = jest.fn();
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={itemsWithID}
          selectedItems={[]}
          promotedBulkActions={promotedBulkActions}
          renderItem={renderItem}
          onSelectionChange={onSelectionChange}
          resolveItemId={resolveItemId}
        />,
      );
      const firstItem = resourceList.find(ResourceItem).first();
      findByTestID(firstItem, 'LargerSelectionArea').simulate('click');

      const lastItem = resourceList.find(ResourceItem).last();
      findByTestID(lastItem, 'LargerSelectionArea').simulate('click', {
        nativeEvent: {shiftKey: true},
      });

      expect(onSelectionChange).toHaveBeenCalledWith(['5', '6', '7']);
    });

    it('does not select shift selected items if resolveItemId was not provided', () => {
      const onSelectionChange = jest.fn();
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={itemsWithID}
          selectedItems={[]}
          promotedBulkActions={promotedBulkActions}
          renderItem={renderItem}
          onSelectionChange={onSelectionChange}
        />,
      );
      const firstItem = resourceList.find(ResourceItem).first();
      findByTestID(firstItem, 'LargerSelectionArea').simulate('click');

      const lastItem = resourceList.find(ResourceItem).last();
      findByTestID(lastItem, 'LargerSelectionArea').simulate('click', {
        nativeEvent: {shiftKey: true},
      });

      expect(onSelectionChange).toHaveBeenCalledWith(['7']);
    });

    it('does not select shift selected items if sortOrder is not provided', () => {
      function resolveItemId(item: any) {
        return item.id;
      }

      function renderItem(item: any, id: any) {
        return (
          <ResourceList.Item
            id={id}
            url={item.url}
            accessibilityLabel={`View details for ${item.title}`}
          >
            <div>Item {id}</div>
            <div>{item.title}</div>
          </ResourceList.Item>
        );
      }

      const onSelectionChange = jest.fn();
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={itemsWithID}
          selectedItems={[]}
          promotedBulkActions={promotedBulkActions}
          renderItem={renderItem}
          onSelectionChange={onSelectionChange}
          resolveItemId={resolveItemId}
        />,
      );
      const firstItem = resourceList.find(ResourceItem).first();
      findByTestID(firstItem, 'LargerSelectionArea').simulate('click');

      const lastItem = resourceList.find(ResourceItem).last();
      findByTestID(lastItem, 'LargerSelectionArea').simulate('click', {
        nativeEvent: {shiftKey: true},
      });

      expect(onSelectionChange).toHaveBeenCalledWith(['7']);
    });

    it('deselects shift selected items if resolveItemId was provided', () => {
      const selectedItems = ['6', '7'];
      function resolveItemId(item: any) {
        return item.id;
      }
      const onSelectionChange = jest.fn();
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={itemsWithID}
          selectedItems={selectedItems}
          promotedBulkActions={promotedBulkActions}
          renderItem={renderItem}
          onSelectionChange={onSelectionChange}
          resolveItemId={resolveItemId}
        />,
      );
      // Sets {lastSeleced: 0}
      const firstItem = resourceList.find(ResourceItem).first();
      findByTestID(firstItem, 'LargerSelectionArea').simulate('click');

      const lastItem = resourceList.find(ResourceItem).last();
      findByTestID(lastItem, 'LargerSelectionArea').simulate('click', {
        nativeEvent: {shiftKey: true},
      });

      expect(onSelectionChange).toHaveBeenCalledWith([]);
    });
  });

  describe('Resizing', () => {
    afterEach(() => {
      setDefaultScreen();
    });

    it('an inline label is hidden on small screen', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={itemsWithID}
          sortOptions={sortOptions}
          onSortChange={noop}
          renderItem={renderItem}
        />,
      );

      setSmallScreen();
      trigger(resourceList.find(EventListener), 'handler');

      expect(
        resourceList
          .find(Select)
          .first()
          .prop('labelInline'),
      ).toBe(false);
    });

    it('select mode is turned off on large screen when no items are selected', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={singleItemWithID}
          renderItem={renderItem}
          bulkActions={bulkActions}
          selectedItems={[]}
        />,
      );

      trigger(resourceList.find(BulkActions), 'onSelectModeToggle', true);
      trigger(resourceList.find(EventListener).first(), 'handler');
      expect(resourceList.find(BulkActions).prop('selectMode')).toBe(false);
    });
  });
});

function noop() {}

function idForItem(item: any) {
  return JSON.stringify(item);
}

function renderCustomMarkup(item: any) {
  return <p>{item.title}</p>;
}

function renderItem(item: any, id: any, index: number) {
  return (
    <ResourceList.Item
      id={id}
      url={item.url}
      sortOrder={index}
      accessibilityLabel={`View details for ${item.title}`}
    >
      <div>Item {id}</div>
      <div>{item.title}</div>
    </ResourceList.Item>
  );
}

function setSmallScreen() {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    writable: true,
    value: 457,
  });
}

function setDefaultScreen() {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    writable: true,
    value: defaultWindowWidth,
  });
}

function bulkActionsCheckableButton(wrapper: ReactWrapper) {
  return wrapper.findWhere(
    (wrap) => wrap.is(CheckableButton) && !wrap.prop('plain'),
  );
}

function plainCheckableButton(wrapper: ReactWrapper) {
  return wrapper.findWhere(
    (wrap) => wrap.is(CheckableButton) && wrap.prop('plain'),
  );
}
