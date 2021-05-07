import React from 'react';
import {matchMedia} from '@shopify/jest-dom-mocks';
import {
  Button,
  Popover,
  Sheet,
  Tag,
  TextField,
  TextStyle,
  ButtonProps,
} from 'components';
// eslint-disable-next-line no-restricted-imports
import {
  mountWithAppProvider,
  trigger,
  findByTestID,
  ReactWrapper,
} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';

import {WithinFilterContext} from '../../../utilities/within-filter-context';
import {Filters, FiltersProps} from '../Filters';
import {ConnectedFilterControl, TagsWrapper} from '../components';
import * as focusUtils from '../../../utilities/focus';

const MockFilter = (props: {id: string}) => <div id={props.id} />;
const MockChild = () => <div />;
const mockProps: FiltersProps = {
  onQueryChange: noop,
  onQueryClear: noop,
  onClearAll: noop,
  filters: [
    {
      key: 'filterOne',
      label: 'Filter One',
      filter: <MockFilter id="filterOne" />,
    },
    {
      key: 'filterTwo',
      label: 'Filter Two',
      filter: <MockFilter id="filterTwo" />,
      disabled: true,
    },
    {
      key: 'filterThree',
      label: 'Filter Three',
      filter: <MockFilter id="filterThree" />,
    },
  ],
};

describe('<Filters />', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    matchMedia.mock();
  });

  afterEach(() => {
    matchMedia.restore();
  });

  it('renders WithinFilterContext with a value of true', () => {
    WithinFilterContext;
    const filters = mountWithApp(<Filters {...mockProps} />);

    expect(filters).toContainReactComponentTimes(
      WithinFilterContext.Provider,
      1,
      {
        value: true,
      },
    );
  });

  it('calls the onQueryFocus callback when the query field is focused', () => {
    const onQueryFocus = jest.fn();
    const filters = mountWithAppProvider(
      <Filters {...mockProps} onQueryFocus={onQueryFocus} />,
    );

    trigger(filters.find(TextField), 'onFocus');

    expect(onQueryFocus).toHaveBeenCalledTimes(1);
  });

  it('does not render the TextField when "hideQueryField" is "true"', () => {
    const filters = mountWithAppProvider(
      <Filters {...mockProps} hideQueryField />,
    );

    expect(filters.find(TextField).exists()).toBe(false);
  });

  it('renders the TextField when "hideQueryField" is false', () => {
    const filters = mountWithAppProvider(<Filters {...mockProps} />);

    expect(filters.find(TextField).exists()).toBe(true);
  });

  describe('toggleFilters()', () => {
    it('opens the sheet on toggle button click', () => {
      const resourceFilters = mountWithAppProvider(<Filters {...mockProps} />);

      trigger(findByTestID(resourceFilters, 'SheetToggleButton'), 'onClick');
      jest.runAllTimers();
      expect(resourceFilters.find(Sheet).props().open).toBe(true);
    });

    it('closes the sheet on second toggle button click', () => {
      const resourceFilters = mountWithAppProvider(<Filters {...mockProps} />);

      trigger(findByTestID(resourceFilters, 'SheetToggleButton'), 'onClick');
      trigger(findByTestID(resourceFilters, 'SheetToggleButton'), 'onClick');

      expect(resourceFilters.find(Sheet).props().open).toBe(false);
    });

    describe('isMobile()', () => {
      it('renders a sheet on desktop size with right origin', () => {
        const resourceFilters = mountWithAppProvider(
          <Filters {...mockProps} />,
        );

        expect(resourceFilters.find(Sheet).exists()).toBe(true);
      });

      it('renders a sheet on mobile size with bottom origin', () => {
        matchMedia.setMedia(() => ({matches: true}));
        const resourceFilters = mountWithAppProvider(
          <Filters {...mockProps} />,
        );

        expect(resourceFilters.find(Sheet).exists()).toBe(true);
      });

      it('opens the sheet at mobile size on toggle button click', () => {
        matchMedia.setMedia(() => ({matches: true}));
        const resourceFilters = mountWithAppProvider(
          <Filters {...mockProps} />,
        );

        trigger(findByTestID(resourceFilters, 'SheetToggleButton'), 'onClick');
        expect(resourceFilters.find(Sheet).props().open).toBe(true);
      });

      it('closes the sheet at mobile size on second toggle button click', () => {
        matchMedia.setMedia(() => ({matches: true}));
        const resourceFilters = mountWithAppProvider(
          <Filters {...mockProps} />,
        );

        trigger(findByTestID(resourceFilters, 'SheetToggleButton'), 'onClick');
        trigger(findByTestID(resourceFilters, 'SheetToggleButton'), 'onClick');

        expect(resourceFilters.find(Sheet).props().open).toBe(false);
      });
    });
  });

  describe('toggleFilter()', () => {
    it('opens the filter on toggle button click', () => {
      const resourceFilters = mountWithAppProvider(<Filters {...mockProps} />);

      trigger(findByTestID(resourceFilters, 'SheetToggleButton'), 'onClick');
      trigger(findById(resourceFilters, 'filterOneToggleButton'), 'onClick');

      expect(
        findById(resourceFilters, 'filterOneCollapsible').props().open,
      ).toBe(true);
    });

    it('closes the filter on second toggle button click', () => {
      const resourceFilters = mountWithAppProvider(<Filters {...mockProps} />);

      trigger(findByTestID(resourceFilters, 'SheetToggleButton'), 'onClick');
      trigger(findById(resourceFilters, 'filterTwoToggleButton'), 'onClick');
      trigger(findById(resourceFilters, 'filterTwoToggleButton'), 'onClick');

      expect(
        findById(resourceFilters, 'filterTwoCollapsible').props().open,
      ).toBe(false);
    });

    it('does not close other filters when a filter is toggled', () => {
      const resourceFilters = mountWithAppProvider(<Filters {...mockProps} />);

      trigger(findByTestID(resourceFilters, 'SheetToggleButton'), 'onClick');
      trigger(findById(resourceFilters, 'filterOneToggleButton'), 'onClick');
      trigger(findById(resourceFilters, 'filterThreeToggleButton'), 'onClick');

      expect(
        findById(resourceFilters, 'filterOneCollapsible').props().open,
      ).toBe(true);
      expect(
        findById(resourceFilters, 'filterThreeCollapsible').props().open,
      ).toBe(true);
    });
  });

  describe('<ConnectedFilterControl />', () => {
    const mockPropsWithShortcuts: FiltersProps = {
      onQueryChange: noop,
      onQueryClear: noop,
      onClearAll: noop,
      filters: [
        {
          key: 'filterOne',
          label: 'Filter One',
          filter: <MockFilter id="filterOne" />,
          shortcut: true,
        },
        {
          key: 'filterTwo',
          label: 'Filter Two',
          filter: <MockFilter id="filterTwo" />,
        },
        {
          key: 'filterThree',
          label: 'Filter Three',
          filter: <MockFilter id="filterThree" />,
          shortcut: true,
        },
      ],
    };

    it('renders', () => {
      const resourceFilters = mountWithAppProvider(
        <Filters {...mockPropsWithShortcuts} />,
      );

      expect(resourceFilters.find(ConnectedFilterControl).exists()).toBe(true);
    });

    it('renders children', () => {
      const resourceFilters = mountWithAppProvider(
        <Filters {...mockPropsWithShortcuts}>
          <MockChild />
        </Filters>,
      );

      expect(resourceFilters.find(MockChild).exists()).toBe(true);
    });

    it('receives the expected props when there are shortcut filters', () => {
      const resourceFilters = mountWithAppProvider(
        <Filters {...mockPropsWithShortcuts} />,
      );

      expect(
        resourceFilters.find(ConnectedFilterControl).props()
          .rightPopoverableActions,
      ).toHaveLength(2);
    });

    it('receives the expected props when the query field is hidden', () => {
      const resourceFilters = mountWithAppProvider(
        <Filters {...mockPropsWithShortcuts} hideQueryField />,
      );

      expect(
        resourceFilters.find(ConnectedFilterControl).props().queryFieldHidden,
      ).toBe(true);
    });

    it('forces showing the "More Filters" button if there are filters without shortcuts', () => {
      const resourceFilters = mountWithAppProvider(
        <Filters {...mockPropsWithShortcuts} />,
      );

      expect(
        resourceFilters.find(ConnectedFilterControl).props()
          .forceShowMorefiltersButton,
      ).toBe(true);
    });

    it('does not force showing the "More Filters" button if all the filters have shorcuts', () => {
      const mockPropsWithShortcuts: FiltersProps = {
        onQueryChange: noop,
        onQueryClear: noop,
        onClearAll: noop,
        filters: [
          {
            key: 'filterOne',
            label: 'Filter One',
            filter: <MockFilter id="filterOne" />,
            shortcut: true,
          },
          {
            key: 'filterTwo',
            label: 'Filter Two',
            filter: <MockFilter id="filterTwo" />,
            shortcut: true,
          },
        ],
      };
      const resourceFilters = mountWithAppProvider(
        <Filters {...mockPropsWithShortcuts} />,
      );
      expect(
        resourceFilters.find(ConnectedFilterControl).props()
          .forceShowMorefiltersButton,
      ).toBe(false);
    });

    it('receives shortcut filters with popoverOpen set to false on mount', () => {
      const resourceFilters = mountWithAppProvider(
        <Filters {...mockPropsWithShortcuts} />,
      );

      const rightPopoverableActions = resourceFilters
        .find(ConnectedFilterControl)
        .props().rightPopoverableActions;

      rightPopoverableActions!.forEach((action) => {
        expect(action.popoverOpen).toBe(false);
      });
    });

    it('toggles a shortcut filter', () => {
      const resourceFilters = mountWithAppProvider(
        <Filters {...mockPropsWithShortcuts} />,
      );

      const connected = resourceFilters.find(ConnectedFilterControl).first();
      connected.setState({availableWidth: 999});
      const shortcut = findByTestID(resourceFilters, 'FilterShortcutContainer')
        .find(Button)
        .first();

      trigger(shortcut, 'onClick');
      expect(resourceFilters.find(Popover).first().props().active).toBe(true);
      trigger(shortcut, 'onClick');
      expect(resourceFilters.find(Popover).first().props().active).toBe(false);
    });

    it('receives the expected props when there are no shortcut filters', () => {
      const resourceFilters = mountWithAppProvider(<Filters {...mockProps} />);

      expect(
        resourceFilters.find(ConnectedFilterControl).props()
          .rightPopoverableActions,
      ).toHaveLength(0);
    });

    it('does not render the filter button when no filters are passed in', () => {
      const resourceFilters = mountWithApp(
        <Filters {...mockProps} filters={[]} />,
      );
      expect(resourceFilters).not.toContainReactComponent(Button, {
        testID: 'SheetToggleButton',
      } as ButtonProps);
    });
  });

  describe('appliedFilters', () => {
    it('calls remove callback when tag is clicked', () => {
      const spy = jest.fn();
      const appliedFilters = [{key: 'filterOne', label: 'foo', onRemove: spy}];

      const resourceFilters = mountWithAppProvider(
        <Filters
          {...mockProps}
          queryValue="bar"
          appliedFilters={appliedFilters}
        />,
      );

      const tag = resourceFilters.find(Tag).first();
      const removeButton = tag.find('button').first();

      trigger(removeButton, 'onClick');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('filterOne');
    });

    it('calls remove callback when clear button is clicked', () => {
      const spy = jest.fn();
      const appliedFilters = [{key: 'filterOne', label: 'foo', onRemove: spy}];

      const resourceFilters = mountWithAppProvider(
        <Filters {...mockProps} appliedFilters={appliedFilters} />,
      );

      trigger(findByTestID(resourceFilters, 'SheetToggleButton'), 'onClick');
      trigger(findById(resourceFilters, 'filterOneToggleButton'), 'onClick');
      const collapsible = findById(resourceFilters, 'filterOneCollapsible');
      const clearButton = collapsible.find(Button).last();

      trigger(clearButton, 'onClick');

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('filterOne');
    });

    it('renders a clear button when clearButton is not provided', () => {
      const filters = [
        {key: 'filterOne', label: 'foo', onRemove: () => {}, filter: null},
      ];

      const resourceFilters = mountWithAppProvider(
        <Filters {...mockProps} filters={filters} />,
      );

      trigger(findByTestID(resourceFilters, 'SheetToggleButton'), 'onClick');
      trigger(findById(resourceFilters, 'filterOneToggleButton'), 'onClick');
      const collapsible = findById(resourceFilters, 'filterOneCollapsible');

      expect(collapsible.text().toLowerCase()).toContain('clear');
    });

    it("doesn't renders a clear button when clearButton is not provided", () => {
      const filters = [
        {
          hideClearButton: true,
          key: 'filterOne',
          label: 'foo',
          onRemove: () => {},
          filter: null,
        },
      ];

      const resourceFilters = mountWithAppProvider(
        <Filters {...mockProps} filters={filters} />,
      );

      trigger(findByTestID(resourceFilters, 'SheetToggleButton'), 'onClick');
      trigger(findById(resourceFilters, 'filterOneToggleButton'), 'onClick');
      const collapsible = findById(resourceFilters, 'filterOneCollapsible');

      expect(collapsible.text().toLowerCase()).not.toContain('clear');
    });

    it('tags are not shown if hideTags prop is given', () => {
      const appliedFilters = [{key: 'filterOne', label: 'foo', onRemove: noop}];

      const resourceFilters = mountWithAppProvider(
        <Filters
          {...mockProps}
          queryValue=""
          appliedFilters={appliedFilters}
          hideTags
        />,
      );
      expect(resourceFilters.find(Tag)).toHaveLength(0);
    });

    it('hides the tags container when applied filters are not provided', () => {
      const resourceFilters = mountWithApp(<Filters {...mockProps} />);
      expect(resourceFilters).toContainReactComponent(TagsWrapper, {
        hidden: true,
      });
    });

    it('renders applied filters container with aria live', () => {
      const resourceFilters = mountWithApp(<Filters {...mockProps} />);
      expect(resourceFilters).toContainReactComponent('div', {
        className: 'TagsContainer',
        'aria-live': 'polite',
      });
    });

    it('applied filter count is shown if hideTags prop is given', () => {
      const appliedFilters = [
        {key: 'filterOne', label: 'foo', onRemove: noop},
        {key: 'filterTwo', label: 'bar', onRemove: noop},
      ];

      const resourceFilters = mountWithAppProvider(
        <Filters
          {...mockProps}
          queryValue=""
          appliedFilters={appliedFilters}
          hideTags
        />,
      );
      const rightActionButton = findByTestID(
        resourceFilters,
        'SheetToggleButton',
      );
      expect(rightActionButton.text()).toBe('More filters (2)');
    });

    it('calls clear all callback and shifts focus when clear all filters is clicked to prevent visual loss of focus', () => {
      const focusSpy = jest.spyOn(focusUtils, 'focusFirstFocusableNode');
      const spy = jest.fn();
      const appliedFilters = [{key: 'filterOne', label: 'foo', onRemove: spy}];

      const resourceFilters = mountWithAppProvider(
        <Filters {...mockProps} appliedFilters={appliedFilters} />,
      );
      resourceFilters.setProps({
        onClearAll: () => {
          resourceFilters.setProps({
            appliedFilters: [],
          });
        },
      });

      trigger(findByTestID(resourceFilters, 'SheetToggleButton'), 'onClick');

      let clearAllButton = resourceFilters
        .findWhere((node) => node.prop('children') === 'Clear all filters')
        .first();

      expect(clearAllButton.prop('disabled')).toBeFalsy();

      trigger(clearAllButton, 'onClick');

      clearAllButton = resourceFilters
        .findWhere((node) => node.prop('children') === 'Clear all filters')
        .first();

      expect(clearAllButton.prop('disabled')).toBeTruthy();
      expect(focusSpy).toHaveBeenCalled();
      focusSpy.mockRestore();
    });
  });

  describe('disabled', () => {
    it('disables the search field when true', () => {
      const resourceFilters = mountWithAppProvider(
        <Filters {...mockProps} queryValue="bar" disabled />,
      );

      expect(resourceFilters.find(TextField).prop('disabled')).toBe(true);
    });

    it('disables <ConnectedFilterControl /> when true', () => {
      const resourceFilters = mountWithAppProvider(
        <Filters {...mockProps} disabled />,
      );
      const rightActionButton = findByTestID(
        resourceFilters,
        'SheetToggleButton',
      );

      expect(rightActionButton.prop('disabled')).toBe(true);
    });

    it('passes disabled prop to connected filters', () => {
      const resourceFilters = mountWithAppProvider(
        <Filters {...mockProps} queryValue="bar" disabled />,
      );

      expect(
        resourceFilters.find(ConnectedFilterControl).prop('disabled'),
      ).toBe(true);
    });

    it('subdues each filter headings <Filter /> is mounted with prop disabled as true', () => {
      const resourceFilters = mountWithAppProvider(
        <Filters {...mockProps} disabled />,
      );

      trigger(findByTestID(resourceFilters, 'SheetToggleButton'), 'onClick');

      mockProps.filters.forEach((filter) => {
        const toggleButton = findById(
          resourceFilters,
          `${filter.key}ToggleButton`,
        );

        expect(toggleButton.find(TextStyle).prop('variation')).toBe('subdued');
      });
    });

    it('is passed to <Tag /> with set value', () => {
      const appliedFilters = [{key: 'filterOne', label: 'foo', onRemove: noop}];

      const resourceFilters = mountWithAppProvider(
        <Filters {...mockProps} appliedFilters={appliedFilters} disabled />,
      );

      resourceFilters.find(Tag).forEach((tag) => {
        expect(tag.prop('disabled')).toBe(true);
      });
    });

    describe('individual filters', () => {
      it('subdues disabled filters heading', () => {
        const resourceFilters = mountWithAppProvider(
          <Filters {...mockProps} />,
        );

        trigger(findByTestID(resourceFilters, 'SheetToggleButton'), 'onClick');

        mockProps.filters
          .filter(({disabled}) => disabled)
          .forEach((filter) => {
            const toggleButton = findById(
              resourceFilters,
              `${filter.key}ToggleButton`,
            );

            expect(toggleButton.find(TextStyle).prop('variation')).toBe(
              'subdued',
            );
          });
      });

      it('does not subdue active filters heading', () => {
        const resourceFilters = mountWithAppProvider(
          <Filters {...mockProps} />,
        );

        trigger(findByTestID(resourceFilters, 'SheetToggleButton'), 'onClick');

        mockProps.filters
          .filter(({disabled}) => !disabled)
          .forEach((filter) => {
            const toggleButton = findById(
              resourceFilters,
              `${filter.key}ToggleButton`,
            );

            expect(
              toggleButton.find(TextStyle).prop('variation'),
            ).toBeUndefined();
          });
      });
    });
  });

  describe('helpText', () => {
    it('renders a subdued <TextStyle /> when provided', () => {
      const helpText = 'Important filters information';
      const resourceFilters = mountWithAppProvider(
        <Filters {...mockProps} helpText={helpText} />,
      );

      const helpTextMarkup = findById(resourceFilters, 'FiltersHelpText');
      expect(helpTextMarkup).toHaveLength(1);
      expect(helpTextMarkup.text()).toBe(helpText);
    });

    it('is not rendered when not provided', () => {
      const resourceFilters = mountWithAppProvider(<Filters {...mockProps} />);

      const helpTextMarkup = findById(resourceFilters, 'FiltersHelpText');
      expect(helpTextMarkup).toHaveLength(0);
    });
  });
});

function noop() {}

function findById(wrapper: ReactWrapper, id: string) {
  return wrapper.find(`#${id}`).first();
}
