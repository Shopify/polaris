import * as React from 'react';
import {ResourceList, Select, Spinner, EmptySearchResult} from 'src/components';
import {
  findByTestID,
  shallowWithAppProvider,
  mountWithAppProvider,
  trigger,
} from 'tests/utilities';
import {BulkActions, Item} from '../components';

const itemsNoID = [{url: 'item 1'}, {url: 'item 2'}];
const singleItemNoID = [{url: 'item 1'}];
const singleItemWithID = [{id: '1', url: 'item 1'}];

const itemsWithID = [
  {id: '5', name: 'item 1', url: 'www.test.com', title: 'title 1'},
  {id: '6', name: 'item 2', url: 'www.test.com', title: 'title 2'},
  {id: '7', name: 'item 3', url: 'www.test.com', title: 'title 3'},
];
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

describe('<ResourceList />', () => {
  describe('renderItem', () => {
    it('renders list items', () => {
      const resourceList = shallowWithAppProvider(
        <ResourceList items={itemsWithID} renderItem={shallowRenderItem} />,
      );
      expect(resourceList.find('li').length).toBe(3);
    });

    it('renders custom markup', () => {
      const resourceList = shallowWithAppProvider(
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
        expect(
          findByTestID(resourceList, 'ItemCountTextWrapper').text(),
        ).toEqual('Showing 1 item');
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
        expect(
          findByTestID(resourceList, 'ItemCountTextWrapper').text(),
        ).toEqual('Showing 1 product');
      });
    });

    describe('resoureName.plural', () => {
      it('renders default plural resource name when resourceName isn’t provided', () => {
        const resourceList = mountWithAppProvider(
          <ResourceList items={itemsNoID} renderItem={renderItem} showHeader />,
        );
        expect(
          findByTestID(resourceList, 'ItemCountTextWrapper').text(),
        ).toEqual('Showing 2 items');
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
        expect(
          findByTestID(resourceList, 'ItemCountTextWrapper').text(),
        ).toEqual('Showing 2 products');
      });
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

    it('provides the BulkActions with the right accessibilityLabel if there’s 1 item and it is selected ', () => {
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

    it('provides the BulkActions with the right accessibilityLabel if there’s multiple items and they are all selected', () => {
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
      const resourceList = shallowWithAppProvider(
        <ResourceList items={itemsNoID} renderItem={shallowRenderItem} />,
      );
      expect(
        resourceList
          .find('li')
          .first()
          .key(),
      ).toBe('0');
    });

    it('generates a key using the ID if there’s no idForItem prop but there and ID key in the data', () => {
      const resourceList = shallowWithAppProvider(
        <ResourceList items={itemsWithID} renderItem={shallowRenderItem} />,
      );
      expect(
        resourceList
          .find('li')
          .first()
          .key(),
      ).toBe('5');
    });

    it('generates a key using the idForItem prop callback when one is provided', () => {
      const resourceList = shallowWithAppProvider(
        <ResourceList
          idForItem={idForItem}
          items={itemsWithID}
          renderItem={shallowRenderItem}
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
      const firstItem = resourceList.find(Item).first();
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
  });

  describe('filterControl', () => {
    it('renders when exist', () => {
      const resourceList = shallowWithAppProvider(
        <ResourceList
          items={itemsNoID}
          renderItem={shallowRenderItem}
          filterControl={<div id="test123">Test</div>}
        />,
      );
      expect(resourceList.find('#test123').exists()).toBe(true);
    });
  });

  describe('emptySearchResult', () => {
    it('renders when filterControl exists and items is empty', () => {
      const resourceList = shallowWithAppProvider(
        <ResourceList
          items={[]}
          renderItem={shallowRenderItem}
          filterControl={<div>fake filterControl</div>}
        />,
      );
      expect(resourceList.find(EmptySearchResult).exists()).toBe(true);
    });
    it('does not render when filterControl does not exist', () => {
      const resourceList = shallowWithAppProvider(
        <ResourceList items={[]} renderItem={shallowRenderItem} />,
      );
      expect(resourceList.find(EmptySearchResult).exists()).toBe(false);
    });
    it('does not render when items is not empty', () => {
      const resourceList = shallowWithAppProvider(
        <ResourceList
          items={itemsNoID}
          renderItem={shallowRenderItem}
          filterControl={<div id="test123">Test</div>}
        />,
      );
      expect(resourceList.find(EmptySearchResult).exists()).toBe(false);
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
          renderItem={renderItem}
        />,
      );
      expect(resourceList.find(Select).exists()).toBe(true);
    });

    describe('sortOptions', () => {
      it('passes a sortOptions to the Select options', () => {
        const resourceList = mountWithAppProvider(
          <ResourceList
            items={itemsWithID}
            sortOptions={sortOptions}
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

  describe('loading', () => {
    it('renders a spinner', () => {
      const resourceList = mountWithAppProvider(
        <ResourceList
          items={itemsWithID}
          sortOptions={sortOptions}
          renderItem={renderItem}
          loading
        />,
      );

      expect(resourceList.find(Spinner).exists()).toBe(true);
    });
  });
});

function idForItem(item: any) {
  return JSON.stringify(item);
}

function shallowRenderItem(item: any) {
  return item;
}

function renderCustomMarkup(item: any) {
  return <p>{item.title}</p>;
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
