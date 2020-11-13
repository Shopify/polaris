import React from 'react';
import {
  EmptySearchResult,
  Spinner,
  Button,
  UnstableBulkActions as BulkActions,
} from '@shopify/polaris';
import {mountWithAppContext as mountWithAppContextLegacy} from '@shopify/polaris-next/test-utilities/legacy';
import {mountWithAppContext} from '@shopify/polaris-next/test-utilities';

import {IndexTable} from '../IndexTable';
import {IndexProvider} from '../../IndexProvider';

const mockTableItems = [
  {
    id: 'item-1',
    title: 'Item 1',
  },
  {
    id: 'item-2',
    title: 'Item 2',
  },
];

const mockTableHeadings = [{title: 'Title'}];

function Component({id, title}: {id: string; title: string}) {
  return (
    <tr key={id}>
      <td>{title}</td>
    </tr>
  );
}

const mockRenderRow = (item: any) => {
  return <Component {...item} key={item.id} />;
};

describe('<IndexTable>', () => {
  it('renders an <EmptySearchResult /> if no items are passed', async () => {
    const index = await mountWithAppContextLegacy(
      <IndexProvider itemCount={0} selectedItemsCount={0}>
        <IndexTable headings={mockTableHeadings} />
      </IndexProvider>,
    );

    expect(index).toContainComponent(EmptySearchResult);
  });

  it('renders a row for each item using renderItem', async () => {
    const index = await mountWithAppContextLegacy(
      <IndexProvider itemCount={mockTableItems.length} selectedItemsCount={0}>
        <IndexTable headings={mockTableHeadings}>
          {mockTableItems.map(mockRenderRow)}
        </IndexTable>
      </IndexProvider>,
    );

    expect(index.find(Component)).toHaveLength(2);
  });

  it('renders a spinner if loading is passed', async () => {
    const index = await mountWithAppContextLegacy(
      <IndexProvider
        itemCount={mockTableItems.length}
        selectedItemsCount={0}
        loading
      >
        <IndexTable headings={mockTableHeadings}>
          {mockTableItems.map(mockRenderRow)}
        </IndexTable>
      </IndexProvider>,
    );

    expect(index).toContainComponent(Spinner);
  });

  describe('condensed', () => {
    const zeroSelectionIndexProviderProps = {
      itemCount: mockTableItems.length,
      selectedItemsCount: 0,
    };
    const someSelectionIndexProviderProps = {
      itemCount: mockTableItems.length,
      selectedItemsCount: 1,
    };
    const defaultIndexTableProps = {
      headings: mockTableHeadings,
    };

    it('renders bulk actions when selectable', async () => {
      const index = await mountWithAppContext(
        <IndexProvider {...zeroSelectionIndexProviderProps} condensed>
          <IndexTable {...defaultIndexTableProps}>
            {mockTableItems.map(mockRenderRow)}
          </IndexTable>
        </IndexProvider>,
      );

      index.find(Button, {children: 'Select'})?.trigger('onClick');

      expect(index).toContainReactComponent(BulkActions, {
        selectMode: true,
      });
    });

    it('does not render bulk actions with onSelectModeToggle when condensed is false', async () => {
      const index = await mountWithAppContext(
        <IndexProvider {...someSelectionIndexProviderProps}>
          <IndexTable
            {...defaultIndexTableProps}
            promotedBulkActions={[{content: 'Action'}]}
          >
            {mockTableItems.map(mockRenderRow)}
          </IndexTable>
        </IndexProvider>,
      );

      expect(index).toContainReactComponent(BulkActions, {
        onSelectModeToggle: undefined,
      });
    });

    it('toggles selectable state when the bulk action button is triggered', async () => {
      const index = await mountWithAppContext(
        <IndexProvider {...zeroSelectionIndexProviderProps} condensed>
          <IndexTable {...defaultIndexTableProps}>
            {mockTableItems.map(mockRenderRow)}
          </IndexTable>
        </IndexProvider>,
      );

      index.find(Button, {children: 'Select'})?.trigger('onClick');
      index.find(BulkActions)?.trigger('onSelectModeToggle');

      expect(index).not.toContainReactComponent(BulkActions);
    });

    it('renders sort markup', async () => {
      const id = 'sort';
      const index = await mountWithAppContext(
        <IndexProvider {...zeroSelectionIndexProviderProps} condensed>
          <IndexTable {...defaultIndexTableProps} sort={<div id={id} />}>
            {mockTableItems.map(mockRenderRow)}
          </IndexTable>
        </IndexProvider>,
      );

      expect(index).toContainReactComponent('div', {id});
    });

    it('renders as a list', async () => {
      const index = await mountWithAppContext(
        <IndexProvider {...zeroSelectionIndexProviderProps} condensed>
          <IndexTable {...defaultIndexTableProps}>
            {mockTableItems.map(mockRenderRow)}
          </IndexTable>
        </IndexProvider>,
      );

      expect(index).toContainReactComponent('ul');
    });

    it('leaves small screen select mode when going from condensed to regular', async () => {
      const index = await mountWithAppContext(
        <IndexProvider {...zeroSelectionIndexProviderProps} condensed>
          <IndexTable {...defaultIndexTableProps}>
            {mockTableItems.map(mockRenderRow)}
          </IndexTable>
        </IndexProvider>,
      );

      index.find(Button, {children: 'Select'})?.trigger('onClick');
      index.setProps({condensed: false});

      expect(index).not.toContainReactComponent(BulkActions);
    });
  });
});
