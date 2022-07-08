import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {useUniqueId} from '../../../utilities/unique-id';
import {AutoSelection, Listbox} from '../../Listbox';
import {Popover} from '../../Popover';
import {Scrollable} from '../../Scrollable';
import {Search, StopPropagation, SearchEmptyState} from '../components';
import {SearchableListbox} from '../SearchableListbox';

import {noop} from './utilities';

jest.mock('../../../utilities/unique-id', () => ({
  ...jest.requireActual('../../../utilities/unique-id'),
  useUniqueId: jest.fn(),
}));
const useUniqueIdMock = useUniqueId as jest.Mock;

const mockProps = {
  activatorNode: <span>Activator</span>,
  open: true,
  searchValue: '',
  searchLabel: '',
  searchEmptyStateMessage: '',
  onClose: noop,
  onOptionSelect: noop,
  onSearch: noop,
  showSearch: false,
  loading: false,
};

describe('<SearchableListbox />', () => {
  it('renders <Popover /> with base props', () => {
    const searchableListbox = mountWithApp(
      <SearchableListbox {...mockProps} />,
    );

    expect(searchableListbox).toContainReactComponent(Popover, {
      preferredAlignment: 'left',
      active: true,
      onClose: expect.any(Function),
    });
  });

  it.each([true, false])(
    'renders <Popover /> with active prop based on open prop',
    (open) => {
      const searchableListbox = mountWithApp(
        <SearchableListbox {...mockProps} open={open} />,
      );

      expect(searchableListbox).toContainReactComponent(Popover, {
        active: open,
      });
    },
  );

  it('triggers onClose', () => {
    const onCloseSpy = jest.fn();
    const searchableListbox = mountWithApp(
      <SearchableListbox {...mockProps} onClose={onCloseSpy} />,
    );

    searchableListbox.find(Popover)!.trigger('onClose');

    expect(onCloseSpy).toHaveBeenCalled();
  });

  it('renders activatorNode', () => {
    const activator = <button type="button">Activator button</button>;
    const searchableListbox = mountWithApp(
      <SearchableListbox {...mockProps} activatorNode={activator} />,
    );

    expect(searchableListbox).toContainReactComponent('button', {
      type: 'button',
      children: 'Activator button',
    });
  });

  describe('listItems', () => {
    it('renders <ListBox /> with a listId', () => {
      const onOptionSelectSpy = jest.fn();

      const mockCustomListId = 'SearchableListbox';
      useUniqueIdMock.mockReturnValue(mockCustomListId);

      const searchableListbox = mountWithApp(
        <SearchableListbox
          {...mockProps}
          listItems={getMockListItems()}
          onOptionSelect={onOptionSelectSpy}
        />,
      );

      expect(searchableListbox).toContainReactComponent(Listbox, {
        onSelect: onOptionSelectSpy,
        autoSelection: AutoSelection.None,
        customListId: mockCustomListId,
      });
    });

    it('renders <ListBox.Option /> and <ListBox.TextOption />', () => {
      const listItems = getMockListItems();
      const searchableListbox = mountWithApp(
        <SearchableListbox {...mockProps} listItems={listItems} />,
      );

      const [listItem] = listItems;

      expect(searchableListbox).toContainReactComponent(Listbox.Option, {
        value: listItem.value,
        selected: listItem.selected,
      });
      expect(searchableListbox).toContainReactComponent(Listbox.TextOption, {
        selected: listItem.selected,
        children: listItem.children,
      });
    });

    it('calls onScrolledToBottom from <Scrollable />', () => {
      const onScrolledToBottomSpy = jest.fn();
      const searchableListbox = mountWithApp(
        <SearchableListbox
          {...mockProps}
          open
          onScrolledToBottom={onScrolledToBottomSpy}
          listItems={getMockListItems()}
        />,
      );

      searchableListbox
        .find(Popover)
        ?.find(Scrollable, {onScrolledToBottom: onScrolledToBottomSpy})!
        .trigger('onScrolledToBottom');

      expect(onScrolledToBottomSpy).toHaveBeenCalled();
    });
  });

  describe('search', () => {
    it('hides <Search /> and fixed <Popover.Pane /> if showSearch is false', () => {
      const searchableListbox = mountWithApp(
        <SearchableListbox {...mockProps} showSearch={false} />,
      );

      expect(searchableListbox).not.toContainReactComponent(Popover.Pane, {
        fixed: true,
      });
      expect(searchableListbox).not.toContainReactComponent(Search);
    });

    it('renders <Search /> in fixed <Popover.Pane /> and <StopPropagation /> with a listId', () => {
      const placeholder = 'placeholder';
      const value = 'value';

      const mockCustomListId = 'SearchableListbox';
      useUniqueIdMock.mockReturnValue(mockCustomListId);

      const searchableListbox = mountWithApp(
        <SearchableListbox
          {...mockProps}
          showSearch
          searchPlaceholder={placeholder}
          searchValue={value}
        />,
      );

      expect(
        searchableListbox
          .find(Popover.Pane, {fixed: true})!
          .find(StopPropagation),
      ).toContainReactComponent(Search, {
        value,
        placeholder,
        listId: mockCustomListId,
      });
    });

    it('sets activeOptionDomId of <Search /> onActiveOptionChange', () => {
      const searchableListbox = mountWithApp(
        <SearchableListbox
          {...mockProps}
          showSearch
          listItems={getMockListItems(2)}
        />,
      );

      const nextOptionId = 'my-option-id';
      searchableListbox
        .find(Listbox)!
        .trigger('onActiveOptionChange', '', nextOptionId);

      expect(searchableListbox).toContainReactComponent(Search, {
        activeOptionDomId: nextOptionId,
      });
    });

    it('triggers onSearch', () => {
      const value = 'test';
      const onSearchSpy = jest.fn();
      const searchableListbox = mountWithApp(
        <SearchableListbox {...mockProps} showSearch onSearch={onSearchSpy} />,
      );

      searchableListbox.find(Search)!.trigger('onSearch', value);

      expect(onSearchSpy).toHaveBeenCalledWith(value);
    });
  });

  describe('<Listbox.Loading />', () => {
    it('renders with accessibility label when loading', () => {
      const label = 'loading spinner';
      const searchableListbox = mountWithApp(
        <SearchableListbox
          {...mockProps}
          loading
          loadingAccessibilityLabel={label}
        />,
      );

      expect(searchableListbox).toContainReactComponent(Listbox.Loading, {
        accessibilityLabel: label,
      });
    });

    it("doesn't render if not loading", () => {
      const searchableListbox = mountWithApp(
        <SearchableListbox {...mockProps} loading={false} />,
      );

      expect(searchableListbox).not.toContainReactComponent(Listbox.Loading);
    });
  });

  describe('footer action', () => {
    it('renders inside <StopPropagation /> when not loading and listItems exist', () => {
      const mockFooterAction = <p>action</p>;
      const searchableListbox = mountWithApp(
        <SearchableListbox
          {...mockProps}
          loading={false}
          footerAction={mockFooterAction}
          listItems={getMockListItems()}
        />,
      );

      expect(searchableListbox.find(Popover.Pane)).toContainReactComponent(
        StopPropagation,
        {
          children: mockFooterAction,
        },
      );
    });

    it("doesn't render if loading", () => {
      const mockFooterAction = <p>action</p>;
      const searchableListbox = mountWithApp(
        <SearchableListbox
          {...mockProps}
          loading
          footerAction={mockFooterAction}
          listItems={getMockListItems()}
        />,
      );

      expect(searchableListbox).not.toContainReactComponent('p', {
        children: mockFooterAction,
      });
    });
  });

  describe('empty state', () => {
    it.each([undefined, []])(
      'renders <SearchEmptyState /> with emptyStateMessage when not loading and list items is %s',
      (listItems) => {
        const mockEmptyStateMessage = 'empty';
        const searchableListbox = mountWithApp(
          <SearchableListbox
            {...mockProps}
            loading={false}
            listItems={listItems}
            searchEmptyStateMessage={mockEmptyStateMessage}
          />,
        );

        expect(searchableListbox).toContainReactComponent(SearchEmptyState, {
          message: mockEmptyStateMessage,
        });
      },
    );

    it("doesn't render <SearchEmptyState /> when loading", () => {
      const searchableListbox = mountWithApp(
        <SearchableListbox
          {...mockProps}
          loading
          listItems={getMockListItems()}
        />,
      );

      expect(searchableListbox).not.toContainReactComponent(SearchEmptyState);
    });

    it("doesn't render <SearchEmptyState /> when listItems exist", () => {
      const searchableListbox = mountWithApp(
        <SearchableListbox
          {...mockProps}
          listItems={getMockListItems()}
          loading={false}
        />,
      );

      expect(searchableListbox).not.toContainReactComponent(SearchEmptyState);
    });
  });
});

function getMockListItems(count = 1, selected = false) {
  return [...Array(count)].map((_, index) => ({
    value: `list item ${index}`,
    children: <p>{`Item ${index}`}</p>,
    selected,
  }));
}
