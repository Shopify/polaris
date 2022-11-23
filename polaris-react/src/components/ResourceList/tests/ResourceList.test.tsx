import React from 'react';
import {mountWithApp} from 'tests/utilities';
import {matchMedia} from '@shopify/jest-dom-mocks';

// import {setMediaWidth} from 'tests/utilities/breakpoints';
import {BulkActions} from '../../BulkActions';
import {Button} from '../../Button';
import {CheckableButton} from '../../CheckableButton';
import {EmptySearchResult} from '../../EmptySearchResult';
import {EmptyState} from '../../EmptyState';
// eslint-disable-next-line import/no-deprecated
import {EventListener} from '../../EventListener';
import {Select} from '../../Select';
import {Spinner} from '../../Spinner';
import {ResourceItem} from '../../ResourceItem';
import {SELECT_ALL_ITEMS} from '../../../utilities/resource-list';
import {ResourceList} from '../ResourceList';
import styles from '../ResourceList.scss';

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
  beforeEach(() => {
    matchMedia.mock();
  });

  afterEach(() => {
    matchMedia.restore();
  });

  describe('renderItem', () => {
    it('renders list items', () => {
      const resourceList = mountWithApp(
        <ResourceList items={itemsWithID} renderItem={renderItem} />,
      );
      expect(resourceList).toContainReactComponentTimes('li', 3);
    });

    it('renders custom markup and warns user', () => {
      process.env.NODE_ENV = 'development';
      const warningSpy = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => {});
      const resourceList = mountWithApp(
        <ResourceList items={itemsWithID} renderItem={renderCustomMarkup} />,
      );
      expect(resourceList).toContainReactText('title 1');
      expect(warningSpy).toHaveBeenCalledWith(
        '<ResourceList /> renderItem function should return a <ResourceItem />.',
      );
      warningSpy.mockRestore();
      delete process.env.NODE_ENV;
    });
  });

  describe('Selectable', () => {
    it('does not render bulk actions if the promotedBulkActions and the bulkActions props are not provided', () => {
      const resourceList = mountWithApp(
        <ResourceList items={itemsWithID} renderItem={renderItem} />,
      );
      expect(resourceList).not.toContainReactComponent(BulkActions);
    });

    it('does not render a `CheckableButton` if the `selectable` prop is not provided', () => {
      const resourceList = mountWithApp(
        <ResourceList items={itemsWithID} renderItem={renderItem} />,
      );
      expect(resourceList).not.toContainReactComponent(CheckableButton);
    });

    it('does render bulk actions if the promotedBulkActions prop is provided', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={itemsWithID}
          renderItem={renderItem}
          promotedBulkActions={promotedBulkActions}
        />,
      );
      expect(resourceList).toContainReactComponent(BulkActions);
    });

    it('renders bulk actions if the bulkActions prop is provided', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={itemsWithID}
          renderItem={renderItem}
          bulkActions={bulkActions}
        />,
      );
      expect(resourceList).toContainReactComponent(BulkActions);
    });

    it('renders a `CheckableButton` if the `selectable` prop is true', () => {
      const resourceList = mountWithApp(
        <ResourceList selectable items={itemsWithID} renderItem={renderItem} />,
      );
      expect(resourceList).toContainReactComponent(CheckableButton);
    });
  });

  describe('hasMoreItems', () => {
    it('does not add a prop of paginatedSelectAllAction to BulkActions if omitted', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={itemsNoID}
          renderItem={renderItem}
          bulkActions={bulkActions}
        />,
      );
      expect(resourceList).toContainReactComponent(BulkActions, {
        paginatedSelectAllAction: undefined,
      });
    });

    it('adds a prop of paginatedSelectAllAction to BulkActions if included', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={itemsNoID}
          hasMoreItems
          renderItem={renderItem}
          bulkActions={bulkActions}
        />,
      );
      expect(
        resourceList.find(BulkActions)!.props.paginatedSelectAllAction,
      ).toBeDefined();
    });
  });

  describe('resourceName', () => {
    describe('resoureName.singular', () => {
      it('renders default singular resource name when resourceName isn’t provided', () => {
        const resourceList = mountWithApp(
          <ResourceList
            showHeader
            items={singleItemNoID}
            renderItem={renderItem}
          />,
        );
        const headerTitleWrapper = resourceList.find('div', {
          className: styles.HeaderTitleWrapper,
        });
        expect(headerTitleWrapper).toContainReactText('Showing 1 item');
      });

      it('renders the given singular resource name when resourceName is provided', () => {
        const resourceList = mountWithApp(
          <ResourceList
            items={singleItemNoID}
            renderItem={renderItem}
            resourceName={{singular: 'product', plural: 'products'}}
            showHeader
          />,
        );
        const headerTitleWrapper = resourceList.find('div', {
          className: styles.HeaderTitleWrapper,
        });
        expect(headerTitleWrapper).toContainReactText('Showing 1 product');
      });
    });

    describe('resourceName.plural', () => {
      it('renders default plural resource name when resourceName isn’t provided', () => {
        const resourceList = mountWithApp(
          <ResourceList items={itemsNoID} renderItem={renderItem} showHeader />,
        );
        const headerTitleWrapper = resourceList.find('div', {
          className: styles.HeaderTitleWrapper,
        });
        expect(headerTitleWrapper).toContainReactText('Showing 2 items');
      });

      it('renders the given plural resource name when resourceName is provided', () => {
        const resourceList = mountWithApp(
          <ResourceList
            items={itemsNoID}
            renderItem={renderItem}
            resourceName={{singular: 'product', plural: 'products'}}
            showHeader
          />,
        );
        const headerTitleWrapper = resourceList.find('div', {
          className: styles.HeaderTitleWrapper,
        });
        expect(headerTitleWrapper).toContainReactText('Showing 2 products');
      });
    });
  });

  describe('headerTitle', () => {
    it('prints loading text when loading is true', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={singleItemWithID}
          renderItem={renderItem}
          bulkActions={bulkActions}
          loading
        />,
      );

      const headerTitleWrapper = resourceList.find('div', {
        className: styles.HeaderTitleWrapper,
      });
      expect(headerTitleWrapper).toContainReactText('Loading items');
    });

    it('prints number of items shown when totalItemsCount is not provided', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={itemsNoID}
          renderItem={renderItem}
          resourceName={{singular: 'product', plural: 'products'}}
          showHeader
        />,
      );

      const headerTitleWrapper = resourceList.find('div', {
        className: styles.HeaderTitleWrapper,
      });
      expect(headerTitleWrapper).toContainReactText('Showing 2 products');
    });

    it('prints number of items shown of totalItemsCount when totalItemsCount is provided', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={itemsNoID}
          renderItem={renderItem}
          resourceName={{singular: 'product', plural: 'products'}}
          showHeader
          totalItemsCount={5}
        />,
      );

      const headerTitleWrapper = resourceList.find('div', {
        className: styles.HeaderTitleWrapper,
      });
      expect(headerTitleWrapper).toContainReactText('Showing 2 of 5 products');
    });

    it('prints number of items shown of totalItemsCount plural when totalItemsCount is provided and items is one resource', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={singleItemNoID}
          renderItem={renderItem}
          resourceName={{singular: 'product', plural: 'products'}}
          showHeader
          totalItemsCount={5}
        />,
      );

      const headerTitleWrapper = resourceList.find('div', {
        className: styles.HeaderTitleWrapper,
      });
      expect(headerTitleWrapper).toContainReactText('Showing 1 of 5 products');
    });
  });

  describe('bulkActionsAccessibilityLabel', () => {
    it('provides the BulkActions with the right accessibilityLabel if there’s 1 item and it isn’t selected', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={singleItemWithID}
          renderItem={renderItem}
          bulkActions={bulkActions}
        />,
      );
      expect(resourceList).toContainReactComponent(BulkActions, {
        accessibilityLabel: 'Select item',
      });
    });

    it('provides the BulkActions with the right accessibilityLabel if there’s 1 item and it is selected', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={singleItemWithID}
          renderItem={renderItem}
          bulkActions={bulkActions}
          selectedItems={['1']}
        />,
      );
      expect(resourceList).toContainReactComponent(BulkActions, {
        accessibilityLabel: 'Deselect item',
      });
    });

    it('provides the BulkActions with the right accessibilityLabel if there are multiple items and they are selected', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={itemsWithID}
          renderItem={renderItem}
          bulkActions={bulkActions}
          selectedItems={['5', '6', '7']}
        />,
      );
      expect(resourceList).toContainReactComponent(BulkActions, {
        accessibilityLabel: 'Deselect all 3 items',
      });
    });

    it('provides the BulkActions with the right accessibilityLabel if there’s multiple items and some or none are selected', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={itemsWithID}
          renderItem={renderItem}
          bulkActions={bulkActions}
        />,
      );
      expect(resourceList).toContainReactComponent(BulkActions, {
        accessibilityLabel: 'Select all 3 items',
      });
    });
  });

  describe('onSelectionChange()', () => {
    it('calls onSelectionChange() when an item is clicked', () => {
      const onSelectionChange = jest.fn();
      const resourceList = mountWithApp(
        <ResourceList
          items={itemsWithID}
          selectedItems={[]}
          promotedBulkActions={promotedBulkActions}
          renderItem={renderItem}
          onSelectionChange={onSelectionChange}
        />,
      );
      resourceList.findAll('div')[6]!.trigger('onClick', {
        stopPropagation: () => {},
        nativeEvent: {},
      });
      expect(onSelectionChange).toHaveBeenCalled();
    });
  });

  describe('header markup', () => {
    it('renders header markup if the list isn’t selectable but the showHeader prop is true', () => {
      const resourceList = mountWithApp(
        <ResourceList showHeader items={itemsWithID} renderItem={renderItem} />,
      );
      expect(resourceList).toContainReactComponent('div', {
        className: styles.HeaderWrapper,
      });
    });

    it('doesn’t render header markup if the list is selectable but the showHeader prop is false', () => {
      const resourceList = mountWithApp(
        <ResourceList
          showHeader={false}
          selectable
          items={itemsWithID}
          renderItem={renderItem}
        />,
      );
      expect(resourceList).not.toContainReactComponent('div', {
        className: expect.stringContaining(styles.HeaderWrapper),
      });
    });

    it('does not render when items is empty', () => {
      const resourceList = mountWithApp(
        <ResourceList items={[]} renderItem={renderItem} />,
      );
      expect(resourceList).not.toContainReactComponent('div', {
        className: expect.stringContaining(styles.HeaderWrapper),
      });
    });

    it('renders when sort options are given', () => {
      const resourceList = mountWithApp(
        <ResourceList
          sortOptions={sortOptions}
          onSortChange={noop}
          items={itemsWithID}
          renderItem={renderItem}
        />,
      );
      expect(resourceList).toContainReactComponent('div', {
        className: expect.stringContaining(styles.HeaderWrapper),
      });
    });

    it('renders when an alternateTool is provided', () => {
      const resourceList = mountWithApp(
        <ResourceList
          alternateTool={alternateTool}
          items={itemsWithID}
          renderItem={renderItem}
        />,
      );
      expect(resourceList).toContainReactComponent('div', {
        className: expect.stringContaining(styles.HeaderWrapper),
      });
    });

    it('renders when bulkActions are given', () => {
      const resourceList = mountWithApp(
        <ResourceList
          bulkActions={bulkActions}
          items={itemsWithID}
          renderItem={renderItem}
        />,
      );
      expect(resourceList).toContainReactComponent('div', {
        className: expect.stringContaining(styles.HeaderWrapper),
      });
    });

    it('renders when promotedBulkActions are given', () => {
      const resourceList = mountWithApp(
        <ResourceList
          promotedBulkActions={promotedBulkActions}
          items={itemsWithID}
          renderItem={renderItem}
        />,
      );
      expect(resourceList).toContainReactComponent('div', {
        className: expect.stringContaining(styles.HeaderWrapper),
      });
    });

    it('does not render when sort options, bulkActions and promotedBulkActions are not given', () => {
      const resourceList = mountWithApp(
        <ResourceList items={itemsWithID} renderItem={renderItem} />,
      );
      expect(resourceList).not.toContainReactComponent('div', {
        className: expect.stringContaining(styles.HeaderWrapper),
      });
    });

    it('renders on non-initial load when items are provided', () => {
      const resourceList = mountWithApp(
        <ResourceList
          bulkActions={bulkActions}
          items={[]}
          renderItem={renderItem}
        />,
      );
      // initially not rendered
      expect(resourceList).not.toContainReactComponent('div', {
        className: expect.stringContaining(styles.HeaderWrapper),
      });
      // update props
      resourceList.setProps({items: itemsWithID});
      // now it's rendered
      expect(resourceList).toContainReactComponent('div', {
        className: expect.stringContaining(styles.HeaderWrapper),
      });
    });

    it('does not render when EmptySearchResult exists', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={[]}
          renderItem={renderItem}
          filterControl={<div>fake filterControl</div>}
        />,
      );
      expect(resourceList).toContainReactComponent(EmptySearchResult);
      expect(resourceList).not.toContainReactComponent('div', {
        className: expect.stringContaining(styles.HeaderWrapper),
      });
    });
  });

  describe('filterControl', () => {
    it('renders when exists', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={itemsNoID}
          renderItem={renderItem}
          filterControl={<div id="test123">Test</div>}
        />,
      );
      expect(resourceList).toContainReactComponent('div', {id: 'test123'});
    });
  });

  describe('emptyState', () => {
    it('renders when exists', () => {
      const emptyState = (
        <EmptyState
          heading="Upload a file to get started"
          action={{content: 'Upload files'}}
          image="https://cdn.shopify.com/s/files/1/2376/3301/products/file-upload-empty-state.png"
        >
          <p>
            You can use the Files section to upload images, videos, and other
            documents
          </p>
        </EmptyState>
      );

      const resourceList = mountWithApp(
        <ResourceList
          items={[]}
          renderItem={renderItem}
          emptyState={emptyState}
        />,
      );

      expect(resourceList).toContainReactComponentTimes(EmptyState, 1);
    });

    it('does not render when exists but items are provided', () => {
      const emptyState = (
        <EmptyState
          heading="Upload a file to get started"
          action={{content: 'Upload files'}}
          image="https://cdn.shopify.com/s/files/1/2376/3301/products/file-upload-empty-state.png"
        >
          <p>
            You can use the Files section to upload images, videos, and other
            documents
          </p>
        </EmptyState>
      );

      const resourceList = mountWithApp(
        <ResourceList
          items={itemsNoID}
          renderItem={renderItem}
          emptyState={emptyState}
        />,
      );

      expect(resourceList).not.toContainReactComponent(EmptyState);
    });

    it('does not render when exists, items is empty, but loading is true', () => {
      const emptyState = (
        <EmptyState
          heading="Upload a file to get started"
          action={{content: 'Upload files'}}
          image="https://cdn.shopify.com/s/files/1/2376/3301/products/file-upload-empty-state.png"
        >
          <p>
            You can use the Files section to upload images, videos, and other
            documents
          </p>
        </EmptyState>
      );

      const resourceList = mountWithApp(
        <ResourceList
          loading
          items={[]}
          renderItem={renderItem}
          emptyState={emptyState}
        />,
      );

      expect(resourceList).not.toContainReactComponent(EmptyState);
    });
  });

  describe('<EmptySearchResult />', () => {
    it('renders when filterControl exists and items is empty', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={[]}
          renderItem={renderItem}
          filterControl={<div>fake filterControl</div>}
        />,
      );
      expect(resourceList).toContainReactComponent(EmptySearchResult);
    });

    it('does not render when filterControl does not exist', () => {
      const resourceList = mountWithApp(
        <ResourceList items={[]} renderItem={renderItem} />,
      );
      expect(resourceList).not.toContainReactComponent(EmptySearchResult);
    });

    it('does not render when items is not empty', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={itemsNoID}
          renderItem={renderItem}
          filterControl={<div id="test123">Test</div>}
        />,
      );
      expect(resourceList).not.toContainReactComponent(EmptySearchResult);
    });

    it('does not render when filterControl exists, items is empty, and loading is true', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={[]}
          renderItem={renderItem}
          filterControl={<div>fake filterControl</div>}
          loading
        />,
      );
      expect(resourceList).not.toContainReactComponent(EmptySearchResult);
    });

    it('does not render when filterControl exists, items is empty, and emptyState is set', () => {
      const emptyStateMarkup = (
        <EmptyState
          heading="Upload a file to get started"
          action={{content: 'Upload files'}}
          image="https://cdn.shopify.com/s/files/1/2376/3301/products/file-upload-empty-state.png"
        >
          <p>
            You can use the Files section to upload images, videos, and other
            documents
          </p>
        </EmptyState>
      );

      const resourceList = mountWithApp(
        <ResourceList
          items={[]}
          renderItem={renderItem}
          filterControl={<div>fake filterControl</div>}
          emptyState={emptyStateMarkup}
        />,
      );

      expect(resourceList).not.toContainReactComponent(EmptySearchResult);
    });

    it('renders the provided markup when emptySearchState is set', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={[]}
          renderItem={renderItem}
          filterControl={<div>fake filterControl</div>}
          emptySearchState={
            <div id="emptySearchState">Alternate empty state</div>
          }
        />,
      );

      expect(resourceList).not.toContainReactComponent(EmptySearchResult);
      expect(resourceList).toContainReactComponent('div', {
        id: 'emptySearchState',
      });
    });
  });

  describe('Sorting', () => {
    it('does not render a sort select if sortOptions aren’t provided', () => {
      const resourceList = mountWithApp(
        <ResourceList items={itemsWithID} renderItem={renderItem} />,
      );
      expect(resourceList).not.toContainReactComponent(Select);
    });

    it('renders a sort select if sortOptions are provided', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={itemsWithID}
          sortOptions={sortOptions}
          onSortChange={noop}
          renderItem={renderItem}
        />,
      );
      expect(resourceList).toContainReactComponent(Select);
    });

    it('does not render a sort select if an alternateTool is provided', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={itemsWithID}
          renderItem={renderItem}
          sortOptions={sortOptions}
          onSortChange={noop}
          alternateTool={alternateTool}
        />,
      );
      expect(resourceList).not.toContainReactComponent(Select);
    });

    describe('sortOptions', () => {
      it('passes a sortOptions to the Select options', () => {
        const resourceList = mountWithApp(
          <ResourceList
            items={itemsWithID}
            sortOptions={sortOptions}
            onSortChange={noop}
            renderItem={renderItem}
          />,
        );
        expect(resourceList).toContainReactComponent(Select, {
          options: sortOptions,
        });
      });
    });

    describe('sortValue', () => {
      it('passes a sortValue to the Select value', () => {
        const onSortChange = jest.fn();
        const resourceList = mountWithApp(
          <ResourceList
            items={itemsWithID}
            sortOptions={sortOptions}
            sortValue="sortValue"
            onSortChange={onSortChange}
            renderItem={renderItem}
          />,
        );
        expect(resourceList).toContainReactComponent(Select, {
          value: 'sortValue',
        });
      });
    });

    describe('onSortChange', () => {
      it('calls onSortChange when the Sort Select changes', () => {
        const onSortChange = jest.fn();
        const resourceList = mountWithApp(
          <ResourceList
            items={itemsWithID}
            onSortChange={onSortChange}
            sortOptions={sortOptions}
            renderItem={renderItem}
          />,
        );
        resourceList.find(Select)!.trigger('onChange', 'PRODUCT_TITLE_DESC');
        expect(onSortChange).toHaveBeenCalledWith('PRODUCT_TITLE_DESC');
      });
    });
  });

  describe('Alternate Tool', () => {
    it('does not render if an alternateTool is not provided', () => {
      const resourceList = mountWithApp(
        <ResourceList items={itemsWithID} renderItem={renderItem} />,
      );
      expect(resourceList).not.toContainReactComponent('div', {
        id: 'AlternateTool',
      });
    });

    it('renders if an alternateTool is provided', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={itemsWithID}
          renderItem={renderItem}
          alternateTool={alternateTool}
        />,
      );
      expect(resourceList).toContainReactComponent('div', {
        id: 'AlternateTool',
      });
    });

    it('renders even if sortOptions are provided', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={itemsWithID}
          renderItem={renderItem}
          sortOptions={sortOptions}
          alternateTool={alternateTool}
        />,
      );
      expect(resourceList).toContainReactComponent('div', {
        id: 'AlternateTool',
      });
    });

    describe('sortOptions', () => {
      it('passes a sortOptions to the Select options', () => {
        const resourceList = mountWithApp(
          <ResourceList
            items={itemsWithID}
            sortOptions={sortOptions}
            renderItem={renderItem}
            onSortChange={noop}
          />,
        );
        expect(resourceList).toContainReactComponent(Select, {
          options: sortOptions,
        });
      });
    });

    describe('sortValue', () => {
      it('passes a sortValue to the Select value', () => {
        const onSortChange = jest.fn();
        const resourceList = mountWithApp(
          <ResourceList
            items={itemsWithID}
            sortOptions={sortOptions}
            sortValue="sortValue"
            onSortChange={onSortChange}
            renderItem={renderItem}
          />,
        );
        expect(resourceList).toContainReactComponent(Select, {
          value: 'sortValue',
        });
      });
    });

    describe('onSortChange', () => {
      it('calls onSortChange when the Sort Select changes', () => {
        const onSortChange = jest.fn();
        const resourceList = mountWithApp(
          <ResourceList
            items={itemsWithID}
            onSortChange={onSortChange}
            sortOptions={sortOptions}
            renderItem={renderItem}
          />,
        );
        resourceList.find(Select)!.trigger('onChange', 'PRODUCT_TITLE_DESC');
        expect(onSortChange).toHaveBeenCalledWith('PRODUCT_TITLE_DESC');
      });
    });
  });

  describe('loading', () => {
    it('renders a spinner', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={itemsWithID}
          sortOptions={sortOptions}
          onSortChange={noop}
          renderItem={renderItem}
          loading
        />,
      );

      expect(resourceList).toContainReactComponent(Spinner);
    });

    it('renders a spinner after initial load when loading is true', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={itemsWithID}
          sortOptions={sortOptions}
          onSortChange={noop}
          renderItem={renderItem}
        />,
      );

      resourceList.setProps({loading: true});
      expect(resourceList).toContainReactComponent(Spinner);
    });

    it('does not render an <Item /> if loading is true and there are no items', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={[]}
          sortOptions={sortOptions}
          onSortChange={noop}
          renderItem={renderItem}
          loading
        />,
      );

      expect(resourceList).not.toContainReactComponent(ResourceItem);
    });
  });

  describe('BulkActions', () => {
    it('renders on initial load when items are selected', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={singleItemWithID}
          renderItem={renderItem}
          bulkActions={bulkActions}
          selectedItems={['1']}
        />,
      );
      expect(resourceList).toContainReactComponentTimes(BulkActions, 1);
    });

    it('enables select mode when items are programmatically selected', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={singleItemWithID}
          renderItem={renderItem}
          bulkActions={bulkActions}
          selectedItems={[]}
        />,
      );

      expect(resourceList).toContainReactComponent(BulkActions, {
        selectMode: false,
      });
      resourceList.setProps({selectedItems: ['1']});
      expect(resourceList).toContainReactComponent(BulkActions, {
        selectMode: true,
      });
    });

    it('disables select mode when items are deselected programmatically selected', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={singleItemWithID}
          renderItem={renderItem}
          bulkActions={bulkActions}
          selectedItems={['1']}
        />,
      );

      expect(resourceList).toContainReactComponent(BulkActions, {
        selectMode: true,
      });
      resourceList.setProps({selectedItems: []});
      expect(resourceList).toContainReactComponent(BulkActions, {
        selectMode: false,
      });
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
          const resourceList = mountWithApp(
            <ResourceList
              items={itemsWithID}
              renderItem={renderItem}
              promotedBulkActions={promotedBulkActions}
            />,
          );

          resourceList
            .find(CheckableButton, {plain: true})!
            .trigger('onToggleAll');

          const deselectAllCheckbox = resourceList
            .findAll(CheckableButton)
            .find((ele) => !ele.prop('plain'))!
            .find('input', {type: 'checkbox'})!;

          expect(document.activeElement).toBe(deselectAllCheckbox.domNode);
        });

        it('focuses the plain CheckableButton checkbox when items are selected and the deselect Checkable button is clicked', () => {
          const resourceList = mountWithApp(
            <ResourceList
              items={itemsWithID}
              renderItem={renderItem}
              selectedItems={allSelectedIDs}
              promotedBulkActions={promotedBulkActions}
            />,
          );

          resourceList
            .findAll(CheckableButton)
            .find((ele) => !ele.prop('plain'))!
            .trigger('onToggleAll');

          const selectAllCheckableCheckbox = resourceList
            .find(CheckableButton, {plain: true})!
            .find('input', {type: 'checkbox'})!;

          expect(document.activeElement).toBe(
            selectAllCheckableCheckbox.domNode,
          );
        });
      });

      describe('small screen', () => {
        afterEach(() => {
          setDefaultScreen();
        });

        it('keeps focus on the CheckableButton checkbox when selecting', () => {
          setSmallScreen();

          const resourceList = mountWithApp(
            <ResourceList
              items={itemsWithID}
              renderItem={renderItem}
              promotedBulkActions={promotedBulkActions}
            />,
          );

          resourceList.find(Button)!.trigger('onClick');

          const selectAllCheckableButton = resourceList
            .findAll(CheckableButton)
            .find((ele) => !ele.prop('plain'))!;

          selectAllCheckableButton.trigger('onToggleAll');

          const checkBox = selectAllCheckableButton.find('input', {
            type: 'checkbox',
          })!;

          expect(document.activeElement).toBe(checkBox.domNode);
        });

        it('keeps focus on the CheckableButton checkbox when deselecting', () => {
          setSmallScreen();

          const resourceList = mountWithApp(
            <ResourceList
              items={itemsWithID}
              selectedItems={allSelectedIDs}
              renderItem={renderItem}
              promotedBulkActions={promotedBulkActions}
            />,
          );

          const deselectAllCheckableButton = resourceList
            .findAll(CheckableButton)
            .find((ele) => !ele.prop('plain'))!;

          deselectAllCheckableButton.trigger('onToggleAll');

          const checkBox = deselectAllCheckableButton.find('input', {
            type: 'checkbox',
          })!;

          expect(document.activeElement).toBe(checkBox.domNode);
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
      const resourceList = mountWithApp(
        <ResourceList
          items={itemsWithID}
          selectedItems={[]}
          promotedBulkActions={promotedBulkActions}
          renderItem={renderItem}
          onSelectionChange={onSelectionChange}
          resolveItemId={resolveItemId}
        />,
      );
      const firstItem = resourceList.find(ResourceItem);
      firstItem!.findAll('div')[6]!.trigger('onClick', {
        stopPropagation: () => {},
        nativeEvent: {},
      });
      const allItems = resourceList.findAll(ResourceItem);
      const lastItem = allItems[allItems.length - 1];
      lastItem!.findAll('div')[6]!.trigger('onClick', {
        stopPropagation: () => {},
        nativeEvent: {shiftKey: true},
      });
      expect(onSelectionChange).toHaveBeenCalledWith(['5', '6', '7']);
    });

    it('does not select shift selected items if resolveItemId was not provided', () => {
      const onSelectionChange = jest.fn();
      const resourceList = mountWithApp(
        <ResourceList
          items={itemsWithID}
          selectedItems={[]}
          promotedBulkActions={promotedBulkActions}
          renderItem={renderItem}
          onSelectionChange={onSelectionChange}
        />,
      );
      const firstItem = resourceList.find(ResourceItem);
      firstItem!.findAll('div')[6]!.trigger('onClick', {
        stopPropagation: () => {},
        nativeEvent: {},
      });
      const allItems = resourceList.findAll(ResourceItem);
      const lastItem = allItems[allItems.length - 1];
      lastItem!.findAll('div')[6]!.trigger('onClick', {
        stopPropagation: () => {},
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
      const resourceList = mountWithApp(
        <ResourceList
          items={itemsWithID}
          selectedItems={[]}
          promotedBulkActions={promotedBulkActions}
          renderItem={renderItem}
          onSelectionChange={onSelectionChange}
          resolveItemId={resolveItemId}
        />,
      );
      const firstItem = resourceList.find(ResourceItem);
      firstItem!.findAll('div')[6]!.trigger('onClick', {
        stopPropagation: () => {},
        nativeEvent: {},
      });
      const allItems = resourceList.findAll(ResourceItem);
      const lastItem = allItems[allItems.length - 1];
      lastItem!.findAll('div')[6]!.trigger('onClick', {
        stopPropagation: () => {},
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
      const resourceList = mountWithApp(
        <ResourceList
          items={itemsWithID}
          selectedItems={selectedItems}
          promotedBulkActions={promotedBulkActions}
          renderItem={renderItem}
          onSelectionChange={onSelectionChange}
          resolveItemId={resolveItemId}
        />,
      );
      // Sets {lastSelected: 0}
      const firstItem = resourceList.find(ResourceItem);
      firstItem!.findAll('div')[6]!.trigger('onClick', {
        stopPropagation: () => {},
        nativeEvent: {},
      });
      const allItems = resourceList.findAll(ResourceItem);
      const lastItem = allItems[allItems.length - 1];
      lastItem!.findAll('div')[6]!.trigger('onClick', {
        stopPropagation: () => {},
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
      const resourceList = mountWithApp(
        <ResourceList
          items={itemsWithID}
          sortOptions={sortOptions}
          onSortChange={noop}
          renderItem={renderItem}
        />,
      );

      setSmallScreen();
      // eslint-disable-next-line import/no-deprecated
      resourceList.find(EventListener)!.trigger('handler');
      expect(resourceList).toContainReactComponent(Select, {
        labelInline: false,
      });
    });

    it('select mode is turned off on large screen when no items are selected', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={singleItemWithID}
          renderItem={renderItem}
          bulkActions={bulkActions}
          selectedItems={[]}
        />,
      );

      resourceList.find(BulkActions)!.trigger('onSelectModeToggle', true);
      // eslint-disable-next-line import/no-deprecated
      resourceList.find(EventListener)!.trigger('handler');
      expect(resourceList).toContainReactComponent(BulkActions, {
        selectMode: false,
      });
    });
  });

  describe('isFiltered', () => {
    it('renders `selectAllFilteredItems` label if true', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={itemsNoID}
          resourceName={{singular: 'customer', plural: 'customers'}}
          hasMoreItems
          renderItem={renderItem}
          bulkActions={bulkActions}
          isFiltered
        />,
      );

      expect(resourceList).toContainReactComponent(BulkActions, {
        paginatedSelectAllAction: {
          content: 'Select all 2+ customers in this filter',
          onAction: expect.any(Function),
        },
      });
    });

    it('renders `allFilteredItemsSelected` label if true and all items are selected', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={itemsNoID}
          selectedItems={SELECT_ALL_ITEMS}
          resourceName={{singular: 'customer', plural: 'customers'}}
          hasMoreItems
          renderItem={renderItem}
          bulkActions={bulkActions}
          selectable
          isFiltered
        />,
      );

      resourceList.find(BulkActions)!.find(Button)!.trigger('onClick');

      expect(resourceList).toContainReactComponent(BulkActions, {
        paginatedSelectAllText: 'All 2+ customers in this filter are selected.',
      });
    });

    it('renders `selectAllItems` label if not passed', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={itemsNoID}
          resourceName={{singular: 'customer', plural: 'customers'}}
          hasMoreItems
          renderItem={renderItem}
          bulkActions={bulkActions}
        />,
      );

      expect(resourceList).toContainReactComponent(BulkActions, {
        paginatedSelectAllAction: {
          content: 'Select all 2+ customers in your store',
          onAction: expect.any(Function),
        },
      });
    });

    it('renders `allItemsSelected` label if not passed and all items are selected', () => {
      const resourceList = mountWithApp(
        <ResourceList
          items={itemsNoID}
          selectedItems={SELECT_ALL_ITEMS}
          resourceName={{singular: 'customer', plural: 'customers'}}
          hasMoreItems
          renderItem={renderItem}
          bulkActions={bulkActions}
          selectable
        />,
      );

      resourceList.find(BulkActions)!.find(Button)!.trigger('onClick');

      expect(resourceList).toContainReactComponent(BulkActions, {
        paginatedSelectAllText: 'All 2+ customers in your store are selected.',
      });
    });
  });
});

function noop() {}

function renderCustomMarkup(item: any) {
  return <li key={item.id}>{item.title}</li>;
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
