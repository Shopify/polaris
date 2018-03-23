import * as React from 'react';
import ResourceList from '../';
import EmptySearchResult from '../../EmptySearchResult/';
import {
  findByTestID,
  shallowWithProvider,
  mountWithProvider,
} from '../../../../tests/utilities';

const itemsNoID = [{url: 'item 1'}, {url: 'item 2'}];
const itemsWithID = [{id: '5', name: 'item 1'}, {id: '6', name: 'item 2'}];
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
const promotedBulkActions = [
  {
    content: 'Really long text on button 1',
  },
  {
    content: 'long text button 2',
    disabled: true,
    url: 'http://www.google.com',
  },
];

const bulkActions = [
  {
    content: 'button 4',
  },
  {
    content: 'button 4',
  },
  {
    content: 'button 5',
  },
];

describe('<ResourceList />', () => {
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
});

function idForItem(item: any) {
  return JSON.stringify(item);
}

function shallowRenderItem(item: any) {
  return item;
}

function renderItem(item: any, id: any) {
  return (
    <ResourceList.Item id={id} url={item.url}>
      <div>Item {id}</div>
      <div>{item.title}</div>
    </ResourceList.Item>
  );
}
