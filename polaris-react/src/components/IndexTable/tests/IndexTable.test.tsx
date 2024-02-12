import React from 'react';
import {mountWithApp} from 'tests/utilities';
import {SortAscendingIcon, SortDescendingIcon} from '@shopify/polaris-icons';

import {getTableHeadingsBySelector} from '../utilities';
import {EmptySearchResult} from '../../EmptySearchResult';
// eslint-disable-next-line import/no-deprecated
import {EventListener} from '../../EventListener';
import {Spinner} from '../../Spinner';
import {Sticky} from '../../Sticky';
import {Checkbox} from '../../Checkbox';
import {Badge} from '../../Badge';
import {Text} from '../../Text';
import {BulkActions} from '../../BulkActions';
import {IndexTable} from '../IndexTable';
import type {IndexTableProps, IndexTableSortDirection} from '../IndexTable';
import {ScrollContainer} from '../components';
import {SelectionType} from '../../../utilities/index-provider';
import {AfterInitialMount} from '../../AfterInitialMount';
import {UnstyledButton} from '../../UnstyledButton';
import {Tooltip} from '../../Tooltip';
import {IndexProvider} from '../../IndexProvider';
import {Pagination} from '../../Pagination';

jest.mock('../utilities', () => ({
  ...jest.requireActual('../utilities'),
  getTableHeadingsBySelector: jest.fn(),
}));

jest.mock('../../../utilities/debounce', () => ({
  ...jest.requireActual('../../../utilities/debounce'),
  debounce: (callback: () => void) => () => {
    callback();
  },
}));

function mockUseBreakpoints(mdUp: boolean) {
  const useBreakpoints: jest.Mock = jest.requireMock(
    '../../../utilities/breakpoints',
  ).useBreakpoints;

  useBreakpoints.mockReturnValue({
    mdUp,
  });
}

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };

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
  return <Component key={item.id} {...item} />;
};

const mockRenderCondensedRow = (item: any) => {
  return <Component key={item.id} {...item} condensed />;
};

describe('<IndexTable>', () => {
  const defaultProps: IndexTableProps = {
    onSelectionChange: () => {},
    itemCount: 0,
    selectedItemsCount: 0,
    headings: mockTableHeadings,
  };

  beforeEach(() => {
    jest.resetAllMocks();
    mockUseBreakpoints(false);

    (getTableHeadingsBySelector as jest.Mock).mockReturnValue([]);
  });

  it('renders an <EmptySearchResult /> if no items are passed', () => {
    const index = mountWithApp(<IndexTable {...defaultProps} itemCount={0} />);

    expect(index).toContainReactComponent(EmptySearchResult);
  });

  it('renders a row for each item using renderItem', () => {
    const index = mountWithApp(
      <IndexTable {...defaultProps} itemCount={mockTableItems.length}>
        {mockTableItems.map(mockRenderRow)}
      </IndexTable>,
    );

    expect(index).toContainReactComponentTimes(Component, 2);
  });

  it('renders a spinner if loading is passed', () => {
    const index = mountWithApp(
      <IndexTable {...defaultProps} loading itemCount={mockTableItems.length}>
        {mockTableItems.map(mockRenderRow)}
      </IndexTable>,
    );

    expect(index).toContainReactComponent(Spinner);
  });

  it('toggles page selection when select all checkbox is changed', () => {
    const onSelectionchangeSpy = jest.fn();
    const resourceName = {
      singular: 'Item',
      plural: 'Items',
    };
    const index = mountWithApp(
      <IndexTable
        {...defaultProps}
        itemCount={mockTableItems.length}
        resourceName={resourceName}
        onSelectionChange={onSelectionchangeSpy}
      >
        {mockTableItems.map(mockRenderRow)}
      </IndexTable>,
    );

    index
      .find(Checkbox, {
        label: `Select all ${resourceName.plural}`,
      })!
      .trigger('onChange', true);

    expect(onSelectionchangeSpy).toHaveBeenCalledWith(SelectionType.Page, true);
  });

  it('passes a bounding element to Sticky', () => {
    const resourceName = {
      singular: 'Item',
      plural: 'Items',
    };
    const index = mountWithApp(
      <IndexTable
        {...defaultProps}
        itemCount={mockTableItems.length}
        resourceName={resourceName}
      >
        {mockTableItems.map(mockRenderRow)}
      </IndexTable>,
    );

    expect(index).toContainReactComponent(Sticky, {
      boundingElement: index.find('table')?.domNode,
    });
  });

  it('applies sticky last column styles when `lastColumnSticky` prop is true', () => {
    const index = mountWithApp(
      <IndexTable {...defaultProps} itemCount={1} lastColumnSticky>
        {mockTableItems.map(mockRenderRow)}
      </IndexTable>,
    );

    expect(index).toContainReactComponent('table', {
      className: 'Table Table-sticky Table-sticky-last',
    });
  });

  describe('ScrollContainer', () => {
    it('updates sticky header scroll left on scoll', () => {
      const updatedScrollLeft = 25;
      const index = mountWithApp(
        <IndexTable {...defaultProps} itemCount={1}>
          {mockTableItems.map(mockRenderRow)}
        </IndexTable>,
      );

      const scrollContainer = index.find(ScrollContainer)!;
      scrollContainer.prop('scrollableContainerRef').current!.scrollLeft =
        updatedScrollLeft;
      scrollContainer!.trigger('onScroll');

      const stickyHeaderElement = index.find('div', {
        className: 'StickyTableHeadings',
      })!;
      const stickyHeaderElementScrollLeft =
        stickyHeaderElement.domNode!.scrollLeft;

      expect(stickyHeaderElementScrollLeft).toBe(updatedScrollLeft);
    });

    it('updates sticky last column styles when scrolled right', () => {
      const index = mountWithApp(
        <IndexTable {...defaultProps} itemCount={1} lastColumnSticky>
          {mockTableItems.map(mockRenderRow)}
        </IndexTable>,
      );

      const scrollContainer = index.find(ScrollContainer);
      scrollContainer!.trigger('onScroll', true, false);

      expect(index).toContainReactComponent('table', {
        className: 'Table Table-scrolling Table-sticky Table-sticky-last',
      });
    });
  });

  describe('resize', function () {
    it('does not update columns if no headings are present', () => {
      const spy = jest.spyOn(window, 'getComputedStyle');

      const headings: IndexTableProps['headings'] = [
        {title: 'Heading one'},
        {title: 'Heading two'},
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
      // eslint-disable-next-line import/no-deprecated
      index.find(EventListener)!.trigger('handler');

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('scroll bar', () => {
    it('sets scrollleft on scroll', () => {
      const updatedScrollLeft = 25;
      const index = mountWithApp(
        <IndexTable {...defaultProps} itemCount={1}>
          {mockTableItems.map(mockRenderRow)}
        </IndexTable>,
      );

      const afterInitialMounts = index.findAll(AfterInitialMount);
      const scrollbar = afterInitialMounts[afterInitialMounts.length - 1].find(
        'div',
        {className: 'ScrollBar'},
      )!;
      const scrollContainer = index.find(ScrollContainer)!;

      scrollbar.domNode!.scrollLeft = updatedScrollLeft;
      scrollbar.trigger('onScroll');
      const scrollContainerScrollLeft = scrollContainer.prop(
        'scrollableContainerRef',
      ).current!.scrollLeft;

      expect(scrollContainerScrollLeft).toBe(updatedScrollLeft);
    });

    it('sets scrollBarContainerHidden class on scroll container when table is not scrollable', () => {
      const index = mountWithApp(
        <IndexTable {...defaultProps} itemCount={1}>
          {mockTableItems.map(mockRenderRow)}
        </IndexTable>,
      );

      const afterInitialMounts = index.findAll(AfterInitialMount);

      expect(
        afterInitialMounts[afterInitialMounts.length - 1],
      ).toContainReactComponent('div', {
        className: expect.stringContaining('scrollBarContainerHidden'),
      });
    });
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

      expect(index).toContainReactComponent(Text, {
        children: title,
        visuallyHidden: true,
      });
    });

    it('renders a sticky last heading if `lastColumnSticky` prop is true and last heading is not hidden', () => {
      const title = 'Heading two';
      const headings: IndexTableProps['headings'] = [
        {title: 'Heading one'},
        {title, hidden: false},
      ];
      const index = mountWithApp(
        <IndexTable
          {...defaultProps}
          itemCount={mockTableItems.length}
          headings={headings}
          lastColumnSticky
        >
          {mockTableItems.map(mockRenderRow)}
        </IndexTable>,
      );

      expect(index).toContainReactComponent('table', {
        className: 'Table Table-sticky Table-sticky-last',
      });
      const lastHeading = index.find('th', {
        className: 'TableHeading TableHeading-last',
      });
      expect(lastHeading).not.toBeNull();
      expect(lastHeading).toContainReactText(title);
    });

    it('does not render a sticky last heading if `lastColumnSticky` prop is true and last heading is hidden', () => {
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
          lastColumnSticky
        >
          {mockTableItems.map(mockRenderRow)}
        </IndexTable>,
      );

      expect(index).toContainReactComponent('table', {
        className: 'Table Table-sticky Table-sticky-last',
      });
      expect(index).toContainReactComponent(Text, {
        children: title,
      });
    });
  });

  describe('BulkActions', () => {
    const originalInnerWidth = window.innerWidth;

    afterEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        value: originalInnerWidth,
      });
    });

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

    it('renders a custom select all string if present', () => {
      const onSelectionChangeSpy = jest.fn();
      const customString = 'Foo bar baz';
      const index = mountWithApp(
        <IndexTable
          {...defaultProps}
          selectable
          hasMoreItems
          selectedItemsCount={1}
          itemCount={2}
          promotedBulkActions={[{content: 'promoted action'}]}
          onSelectionChange={onSelectionChangeSpy}
          paginatedSelectAllActionText={customString}
        >
          {mockTableItems.map(mockRenderRow)}
        </IndexTable>,
      );
      expect(index.find(BulkActions)).toContainReactText(customString);
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

    const width = window.innerWidth;

    afterEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        value: width,
      });
    });

    it('does not render bulk actions', () => {
      const index = mountWithApp(
        <IndexTable {...defaultIndexTableProps} condensed>
          {mockTableItems.map(mockRenderCondensedRow)}
        </IndexTable>,
      );

      expect(index).not.toContainReactComponent(BulkActions);
    });

    it('does not render BulkActions', () => {
      const index = mountWithApp(
        <IndexTable {...defaultIndexTableProps} condensed selectable={false}>
          {mockTableItems.map(mockRenderCondensedRow)}
        </IndexTable>,
      );

      expect(index).not.toContainReactComponent(BulkActions);
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

    it('does not render bulk actions with bulkActions and promotedActions', () => {
      Object.defineProperty(window, 'innerWidth', {
        value: 300,
      });

      const promotedActions = [{content: 'PromotedAction'}];
      const bulkActions = [{content: 'Action'}];

      const index = mountWithApp(
        <IndexTable
          {...defaultIndexTableProps}
          condensed
          hasMoreItems
          bulkActions={bulkActions}
          promotedBulkActions={promotedActions}
        >
          {mockTableItems.map(mockRenderCondensedRow)}
        </IndexTable>,
      );

      expect(index).not.toContainReactComponent(BulkActions);
    });

    it('prevents rows from being selectable', () => {
      const index = mountWithApp(
        <IndexTable {...defaultIndexTableProps} condensed>
          {mockTableItems.map(mockRenderCondensedRow)}
        </IndexTable>,
      );

      expect(index).toContainReactComponent(IndexProvider, {
        selectable: false,
      });
    });
  });

  describe('sorting', () => {
    const mockSortingHeadings: IndexTableProps['headings'] = [
      {title: 'Foo'},
      {title: 'Bar'},
      {title: 'Baz'},
    ];
    const tableItems = [
      {foo: 'Foo1', bar: 'Bar1', baz: 'Baz1'},
      {foo: 'Foo2', bar: 'Bar2', baz: 'Baz2'},
      {foo: 'Foo3', bar: 'Bar3', baz: 'Baz3'},
    ];

    const defaultSortingProps: IndexTableProps = {
      ...defaultProps,
      headings: mockSortingHeadings,
      itemCount: tableItems.length,
      sortable: [true, false, true],
      sortDirection: 'ascending',
      defaultSortDirection: 'descending',
      sortColumnIndex: 0,
      onSort: jest.fn(),
      sortToggleLabels: {
        0: {ascending: 'A-Z', descending: 'Z-A'},
        2: {ascending: 'Newest', descending: 'Oldest'},
      },
    };

    describe('sortable', () => {
      it('adds the sorting buttons to columns that match the indexes of the sortable prop', () => {
        const index = mountWithApp(
          <IndexTable {...defaultSortingProps}>
            {tableItems.map(mockRenderRow)}
          </IndexTable>,
        );

        expect(index.findAll('th')[1]).toContainReactComponent(UnstyledButton);
        expect(index.findAll('th')[2]).not.toContainReactComponent(
          UnstyledButton,
        );
        expect(index.findAll('th')[3]).toContainReactComponent(UnstyledButton);
      });
    });

    describe('sortColumnIndex', () => {
      it('adds the visible icon class to the heading with the index that matches the sortColumnIndex', () => {
        const index = mountWithApp(
          <IndexTable {...defaultSortingProps}>
            {tableItems.map(mockRenderRow)}
          </IndexTable>,
        );
        expect(index.findAll('th')[1]).toContainReactComponent('span', {
          className: expect.stringContaining('TableHeadingSortIcon-visible'),
        });
        expect(index.findAll('th')[3]).not.toContainReactComponent('span', {
          className: expect.stringContaining('TableHeadingSortIcon-visible'),
        });
      });
    });

    describe('sortDirection', () => {
      it.each(['ascending', 'descending'])(
        'will set the icon source correctly for %s direction for the active sortable heading',
        (direction) => {
          const index = mountWithApp(
            <IndexTable
              {...defaultSortingProps}
              sortDirection={direction as IndexTableSortDirection}
            >
              {tableItems.map(mockRenderRow)}
            </IndexTable>,
          );
          const source =
            direction === 'ascending' ? SortAscendingIcon : SortDescendingIcon;

          expect(index.findAll('th')[1]).toContainReactComponent(source);
        },
      );
    });

    describe('defaultSortDirection', () => {
      it.each(['ascending', 'descending'])(
        'will set the icon source correctly for %s direction for the inactive sortable heading',
        (direction) => {
          const index = mountWithApp(
            <IndexTable
              {...defaultSortingProps}
              defaultSortDirection={direction as IndexTableSortDirection}
            >
              {tableItems.map(mockRenderRow)}
            </IndexTable>,
          );
          const source =
            direction === 'ascending' ? SortAscendingIcon : SortDescendingIcon;

          expect(index.findAll('th')[3]).toContainReactComponent(source);
        },
      );

      it('uses column defaultSortDirection instead of table defaultSortDirection', () => {
        const index = mountWithApp(
          <IndexTable
            {...defaultSortingProps}
            defaultSortDirection="ascending"
            headings={[
              {title: 'Foo'},
              {title: 'Bar'},
              {title: 'Baz', defaultSortDirection: 'descending'},
            ]}
          >
            {tableItems.map(mockRenderRow)}
          </IndexTable>,
        );

        expect(index.findAll('th')[3]).toContainReactComponent(
          SortDescendingIcon,
        );
      });
    });

    describe('onSort', () => {
      it('passes the arguments to the callback correctly', () => {
        const onSort = jest.fn();
        const index = mountWithApp(
          <IndexTable {...defaultSortingProps} onSort={onSort}>
            {tableItems.map(mockRenderRow)}
          </IndexTable>,
        );

        index.act(() => {
          index.findAll('th')[1].find(UnstyledButton)?.trigger('onClick');
        });

        expect(onSort).toHaveBeenCalledWith(0, 'descending');
      });
    });

    describe('sortToggleLabels', () => {
      it('renders the toggle label value for the selected index when ascending', () => {
        const index = mountWithApp(
          <IndexTable
            {...defaultSortingProps}
            sortDirection="ascending"
            sortColumnIndex={0}
          >
            {tableItems.map(mockRenderRow)}
          </IndexTable>,
        );

        expect(index.findAll(Tooltip)[0].prop('content')).toBe(
          defaultSortingProps!.sortToggleLabels![0].ascending,
        );
      });

      it('renders the toggle label value for the selected index when descending', () => {
        const index = mountWithApp(
          <IndexTable
            {...defaultSortingProps}
            sortDirection="descending"
            sortColumnIndex={2}
          >
            {tableItems.map(mockRenderRow)}
          </IndexTable>,
        );

        expect(index.findAll(Tooltip)[2].prop('content')).toBe(
          defaultSortingProps!.sortToggleLabels![2].descending,
        );
      });

      it('does not render the toggle label value for the selected index if not sortable', () => {
        const index = mountWithApp(
          <IndexTable
            {...defaultSortingProps}
            sortDirection="descending"
            sortColumnIndex={1}
          >
            {tableItems.map(mockRenderRow)}
          </IndexTable>,
        );
        expect(index.findAll('th')[1]).toContainReactComponent(Tooltip);
        expect(index.findAll('th')[2]).not.toContainReactComponent(Tooltip);
        expect(index.findAll('th')[3]).toContainReactComponent(Tooltip);
      });
    });
  });

  describe('pagination', () => {
    it('does not render Pagination when pagination props are not provided', () => {
      const index = mountWithApp(
        <IndexTable {...defaultProps} pagination={undefined}>
          {mockTableItems.map(mockRenderRow)}
        </IndexTable>,
      );

      expect(index).not.toContainReactComponent(Pagination);
    });

    it('renders Pagination with table type when pagination props are provided', () => {
      const paginationProps = {
        hasNext: true,
      };

      const index = mountWithApp(
        <IndexTable {...defaultProps} pagination={paginationProps}>
          {mockTableItems.map(mockRenderRow)}
        </IndexTable>,
      );

      expect(index).toContainReactComponent(Pagination, {
        type: 'table',
        ...paginationProps,
      });
    });
  });
});
