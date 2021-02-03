import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';

import {EmptySearchResult} from '../../EmptySearchResult';
import {Spinner} from '../../Spinner';
import {Button} from '../../Button';
import {Badge} from '../../Badge';
import {VisuallyHidden} from '../../VisuallyHidden';
import {BulkActions} from '../../BulkActions';
import {IndexTable, IndexTableProps} from '../IndexTable';
import {SelectionType} from '../../../utilities/index-provider';

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

const mockTableHeadings: IndexTableProps['headings'] = [{title: 'Title'}];

function Component({
  id,
  title,
  condensed,
}: {
  id: string;
  title: string;
  condensed?: boolean;
}) {
  const Wrapper = condensed ? 'li' : 'tr';
  const Child = condensed ? 'div' : 'td';

  return (
    <Wrapper key={id}>
      <Child>{title}</Child>
    </Wrapper>
  );
}

const mockRenderRow = (item: any) => {
  return <Component {...item} key={item.id} />;
};

const mockRenderCondensedRow = (item: any) => {
  return <Component {...item} key={item.id} condensed />;
};

describe('<IndexTable>', () => {
  const defaultProps: IndexTableProps = {
    onSelectionChange: () => {},
    itemCount: 0,
    selectedItemsCount: 0,
    headings: mockTableHeadings,
  };

  it('renders an <EmptySearchResult /> if no items are passed', () => {
    const index = mountWithApp(<IndexTable {...defaultProps} itemCount={0} />);

    expect(index).toContainReactComponent(EmptySearchResult);
  });

  it('renders a row for each item using renderItem', () => {
    const index = mountWithAppProvider(
      <IndexTable {...defaultProps} itemCount={mockTableItems.length}>
        {mockTableItems.map(mockRenderRow)}
      </IndexTable>,
    );

    expect(index.find(Component)).toHaveLength(2);
  });

  it('renders a spinner if loading is passed', () => {
    const index = mountWithApp(
      <IndexTable {...defaultProps} loading itemCount={mockTableItems.length}>
        {mockTableItems.map(mockRenderRow)}
      </IndexTable>,
    );

    expect(index).toContainReactComponent(Spinner);
  });

  describe('headings', () => {
    it('renders new headings', () => {
      const headings: IndexTableProps['headings'] = [
        {title: 'Heading one'},
        {title: 'Heading two', new: true},
      ];
      const index = mountWithApp(
        <IndexTable
          {...defaultProps}
          itemCount={mockTableItems.length}
          headings={headings}
        >
          {mockTableItems.map(mockRenderRow)}
        </IndexTable>,
      );

      expect(index).toContainReactComponent(Badge, {children: 'New'});
    });

    it('renders hidden headings', () => {
      const title = 'Heading two';
      const headings: IndexTableProps['headings'] = [
        {title: 'Heading one'},
        {title, hidden: true},
      ];
      const index = mountWithApp(
        <IndexTable
          {...defaultProps}
          itemCount={mockTableItems.length}
          headings={headings}
        >
          {mockTableItems.map(mockRenderRow)}
        </IndexTable>,
      );

      expect(index).toContainReactComponent(VisuallyHidden, {children: title});
    });
  });

  describe('BulkActions', () => {
    it('toggles all resources selected when paginatedSelectionAllAction is triggered', () => {
      const onSelectionChangeSpy = jest.fn();
      const index = mountWithApp(
        <IndexTable
          {...defaultProps}
          selectable
          hasMoreItems
          selectedItemsCount={1}
          itemCount={2}
          promotedBulkActions={[{content: 'promoted action'}]}
          onSelectionChange={onSelectionChangeSpy}
        >
          {mockTableItems.map(mockRenderRow)}
        </IndexTable>,
      );

      index
        .find(BulkActions)!
        .triggerKeypath('paginatedSelectAllAction.onAction');

      expect(onSelectionChangeSpy).toHaveBeenCalledWith(
        SelectionType.All,
        true,
      );
    });

    it('toggles all page resources when onToggleAll is triggered', () => {
      const onSelectionChangeSpy = jest.fn();
      const index = mountWithApp(
        <IndexTable
          {...defaultProps}
          selectable
          hasMoreItems
          selectedItemsCount={1}
          itemCount={2}
          promotedBulkActions={[{content: 'promoted action'}]}
          onSelectionChange={onSelectionChangeSpy}
        >
          {mockTableItems.map(mockRenderRow)}
        </IndexTable>,
      );

      index.find(BulkActions)!.trigger('onToggleAll');

      expect(onSelectionChangeSpy).toHaveBeenCalledWith(
        SelectionType.Page,
        true,
      );
    });
  });

  describe('condensed', () => {
    const defaultIndexTableProps: IndexTableProps = {
      headings: mockTableHeadings,
      itemCount: mockTableItems.length,
      selectedItemsCount: 0,
      onSelectionChange: () => {},
    };

    it('renders bulk actions when selectable', () => {
      const index = mountWithApp(
        <IndexTable {...defaultIndexTableProps} condensed>
          {mockTableItems.map(mockRenderCondensedRow)}
        </IndexTable>,
      );

      index.find(Button, {children: 'Select'})?.trigger('onClick');

      expect(index).toContainReactComponent(BulkActions, {
        selectMode: true,
      });
    });

    it('does not render bulk actions with onSelectModeToggle when condensed is false', () => {
      const index = mountWithApp(
        <IndexTable
          {...defaultIndexTableProps}
          selectedItemsCount={1}
          condensed={false}
          promotedBulkActions={[{content: 'Action'}]}
        >
          {mockTableItems.map(mockRenderRow)}
        </IndexTable>,
      );

      expect(index).toContainReactComponent(BulkActions, {
        onSelectModeToggle: undefined,
      });
    });

    it('toggles selectable state when the bulk action button is triggered', () => {
      const index = mountWithApp(
        <IndexTable {...defaultIndexTableProps} condensed>
          {mockTableItems.map(mockRenderCondensedRow)}
        </IndexTable>,
      );

      index.find(Button, {children: 'Select'})?.trigger('onClick');
      index.find(BulkActions)?.trigger('onSelectModeToggle');

      expect(index).not.toContainReactComponent(BulkActions);
    });

    it('renders sort markup', () => {
      const id = 'sort';
      const index = mountWithApp(
        <IndexTable
          {...defaultIndexTableProps}
          condensed
          sort={<div id={id} />}
        >
          {mockTableItems.map(mockRenderCondensedRow)}
        </IndexTable>,
      );

      expect(index).toContainReactComponent('div', {id});
    });

    it('renders as a list', () => {
      const index = mountWithApp(
        <IndexTable {...defaultIndexTableProps} condensed>
          {mockTableItems.map(mockRenderCondensedRow)}
        </IndexTable>,
      );

      expect(index).toContainReactComponent('ul');
    });

    it('leaves small screen select mode when going from condensed to regular', () => {
      const index = mountWithApp(
        <IndexTable {...defaultIndexTableProps} condensed>
          {mockTableItems.map(mockRenderCondensedRow)}
        </IndexTable>,
      );

      index.find(Button, {children: 'Select'})?.trigger('onClick');
      index.setProps({condensed: false});

      expect(index).not.toContainReactComponent(BulkActions);
    });
  });
});
