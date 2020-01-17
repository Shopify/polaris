import React from 'react';
import {matchMedia} from '@shopify/jest-dom-mocks';
import {Button, Popover, Sheet, Tag, TextField, TextStyle} from 'components';
// eslint-disable-next-line no-restricted-imports
import {
  mountWithAppProvider,
  trigger,
  findByTestID,
  ReactWrapper,
} from 'test-utilities/legacy';

import {Filters, FiltersProps} from '../Filters';
import {ConnectedFilterControl} from '../components';

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

  it('calls the onQueryFocus callback when the query field is focused', () => {
    const onQueryFocus = jest.fn();
    const filters = mountWithAppProvider(
      <Filters {...mockProps} onQueryFocus={onQueryFocus} />,
    );

    trigger(filters.find(TextField), 'onFocus');

    expect(onQueryFocus).toHaveBeenCalledTimes(1);
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
      expect(
        resourceFilters
          .find(Popover)
          .first()
          .props().active,
      ).toBe(true);
      trigger(shortcut, 'onClick');
      expect(
        resourceFilters
          .find(Popover)
          .first()
          .props().active,
      ).toBe(false);
    });

    it('receives the expected props when there are no shortcut filters', () => {
      const resourceFilters = mountWithAppProvider(<Filters {...mockProps} />);

      expect(
        resourceFilters.find(ConnectedFilterControl).props()
          .rightPopoverableActions,
      ).toHaveLength(0);
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
