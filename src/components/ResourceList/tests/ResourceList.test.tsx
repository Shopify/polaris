import * as React from 'react';
import {ResourceList, Select} from '../../';
import EmptySearchResult from '../../EmptySearchResult/';
import {
  findByTestID,
  shallowWithProvider,
  mountWithProvider,
  trigger,
} from '../../../../tests/utilities';
import Item from '../components/Item';
import BulkActions from '../components/BulkActions';

const itemsNoID = [{url: 'item 1'}, {url: 'item 2'}];
const singleItemNoID = [{url: 'item 1'}];
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
    it('should render list items', () => {
      const resourceList = shallowWithProvider(
        <ResourceList items={itemsWithID} renderItem={shallowRenderItem} />,
      );
      expect(resourceList.find('li').length).toBe(3);
    });

    it('should render custom markup', () => {
      const resourceList = shallowWithProvider(
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
    it("should not render bulk actions if the 'promotedBulkActions' and the 'bulkActions' props are not provided", () => {
      const resourceList = mountWithProvider(
        <ResourceList items={itemsWithID} renderItem={renderItem} />,
      );
      expect(resourceList.find(BulkActions).exists()).toBe(false);
    });

    it("should render bulk actions if the 'promotedBulkActions' prop is provided", () => {
      const resourceList = mountWithProvider(
        <ResourceList
          items={itemsWithID}
          renderItem={renderItem}
          promotedBulkActions={promotedBulkActions}
        />,
      );
      expect(resourceList.find(BulkActions).exists()).toBe(true);
    });

    it("should render bulk actions if the 'bulkActions' prop is provided", () => {
      const resourceList = mountWithProvider(
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
    it("should not add a prop of 'paginatedSelectAllAction' to BulkActions if omitted", () => {
      const resourceList = mountWithProvider(
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

    it("should add a prop of 'paginatedSelectAllAction' to BulkActions if included", () => {
      const resourceList = mountWithProvider(
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
      it("should render default singular resource name when 'resourceName' isn't provided", () => {
        const resourceList = mountWithProvider(
          <ResourceList items={singleItemNoID} renderItem={renderItem} />,
        );
        expect(
          findByTestID(resourceList, 'ItemCountTextWrapper').text(),
        ).toEqual('Showing 1 item');
      });

      it("should render the given singular resource name when 'resourceName' is provided", () => {
        const resourceList = mountWithProvider(
          <ResourceList
            items={singleItemNoID}
            renderItem={renderItem}
            resourceName={{singular: 'product', plural: 'products'}}
          />,
        );
        expect(
          findByTestID(resourceList, 'ItemCountTextWrapper').text(),
        ).toEqual('Showing 1 product');
      });
    });

    describe('resoureName.plural', () => {
      it("should render default plural resource name when 'resourceName' isn't provided", () => {
        const resourceList = mountWithProvider(
          <ResourceList items={itemsNoID} renderItem={renderItem} />,
        );
        expect(
          findByTestID(resourceList, 'ItemCountTextWrapper').text(),
        ).toEqual('Showing 2 items');
      });

      it("should render the given plural resource name when 'resourceName' is provided", () => {
        const resourceList = mountWithProvider(
          <ResourceList
            items={itemsNoID}
            renderItem={renderItem}
            resourceName={{singular: 'product', plural: 'products'}}
          />,
        );
        expect(
          findByTestID(resourceList, 'ItemCountTextWrapper').text(),
        ).toEqual('Showing 2 products');
      });
    });
  });

  describe('idForItem()', () => {
    it("should generate a key using the index if there's no idForItem prop and no ID in data", () => {
      const resourceList = shallowWithProvider(
        <ResourceList items={itemsNoID} renderItem={shallowRenderItem} />,
      );
      expect(
        resourceList
          .find('li')
          .first()
          .key(),
      ).toBe('0');
    });

    it("should generate a key using the ID if there's no idForItem prop but there and ID key in the data", () => {
      const resourceList = shallowWithProvider(
        <ResourceList items={itemsWithID} renderItem={shallowRenderItem} />,
      );
      expect(
        resourceList
          .find('li')
          .first()
          .key(),
      ).toBe('5');
    });

    it('should generate a key using the idForItem prop callback when one is provided', () => {
      const resourceList = shallowWithProvider(
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
    it('should call onSelectionChange() when an item is clicked', () => {
      const onSelectionChange = jest.fn();
      const resourceList = mountWithProvider(
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
    it("renders header markup if the list isn't selectable but the showHeader prop is true", () => {
      const resourceList = mountWithProvider(
        <ResourceList showHeader items={itemsWithID} renderItem={renderItem} />,
      );
      expect(findByTestID(resourceList, 'ResourceList-Header').exists()).toBe(
        true,
      );
    });

    it('does not render when items is empty', () => {
      const resourceList = mountWithProvider(
        <ResourceList items={[]} renderItem={renderItem} />,
      );
      expect(findByTestID(resourceList, 'ResourceList-Header').exists()).toBe(
        false,
      );
    });

    it('renders when sort options are given', () => {
      const resourceList = mountWithProvider(
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
      const resourceList = mountWithProvider(
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
      const resourceList = mountWithProvider(
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
      const resourceList = mountWithProvider(
        <ResourceList items={itemsWithID} renderItem={renderItem} />,
      );
      expect(findByTestID(resourceList, 'ResourceList-Header').exists()).toBe(
        false,
      );
    });
  });

  describe('filterControl', () => {
    it('renders when exist', () => {
      const resourceList = shallowWithProvider(
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
      const resourceList = shallowWithProvider(
        <ResourceList
          items={[]}
          renderItem={shallowRenderItem}
          filterControl={<div>fake filterControl</div>}
        />,
      );
      expect(resourceList.find(EmptySearchResult).exists()).toBe(true);
    });
    it('does not render when filterControl does not exist', () => {
      const resourceList = shallowWithProvider(
        <ResourceList items={[]} renderItem={shallowRenderItem} />,
      );
      expect(resourceList.find(EmptySearchResult).exists()).toBe(false);
    });
    it('does not render when items is not empty', () => {
      const resourceList = shallowWithProvider(
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
    it("it should not render a sort select if 'sortOptions' aren't provided", () => {
      const resourceList = mountWithProvider(
        <ResourceList items={itemsWithID} renderItem={renderItem} />,
      );
      expect(resourceList.find(Select).exists()).toBe(false);
    });

    it("it should render a sort select if 'sortOptions' are provided", () => {
      const resourceList = mountWithProvider(
        <ResourceList
          items={itemsWithID}
          sortOptions={sortOptions}
          renderItem={renderItem}
        />,
      );
      expect(resourceList.find(Select).exists()).toBe(true);
    });

    describe('sortOptions', () => {
      it("should pass a 'sortOptions' to the Select options", () => {
        const resourceList = mountWithProvider(
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
      it("should pass a 'sortValue' to the Select value", () => {
        const resourceList = mountWithProvider(
          <ResourceList
            items={itemsWithID}
            sortOptions={sortOptions}
            sortValue="sortValue"
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
      it('should call onSortChange when the Sort Select changes', () => {
        const onSortChange = jest.fn();
        const resourceList = mountWithProvider(
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
    <ResourceList.Item id={id} url={item.url}>
      <div>Item {id}</div>
      <div>{item.title}</div>
    </ResourceList.Item>
  );
}
