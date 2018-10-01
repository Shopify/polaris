import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {trigger, mountWithAppProvider} from 'tests/utilities';
import {TextField, Tag, Button} from 'src/components';
import {Provider} from '../../Context';
import {
  Filter,
  FilterType,
  FilterSelect,
  FilterTextField,
  FilterDateSelector,
} from '../types';
import FilterControl, {Props} from '../FilterControl';
import FilterCreator from '../FilterCreator';
import {DateFilterOptions} from '../DateSelector';

describe('<FilterControl />', () => {
  const mockDefaultProps: Props = {
    onSearchChange: noop,
  };

  const mockDefaultContext = {
    selectMode: false,
    resourceName: {
      singular: 'item',
      plural: 'items,',
    },
    selectable: false,
  };

  const mockFilters: Filter[] = [
    {
      key: 'filterKey1',
      label: 'Product type',
      operatorText: 'is',
      type: FilterType.Select,
      options: [
        'Bundle',
        {
          value: 'electronic_value',
          label: 'Electronic',
          disabled: true,
        },
        {
          value: 'beauty_value',
          label: 'Beauty',
        },
      ],
    },
    {
      key: 'filterKey2',
      label: 'Tagged',
      operatorText: 'with',
      type: FilterType.TextField,
    },
  ];

  const mockAppliedFilters = [
    {
      key: 'filterKey1',
      value: 'Bundle',
    },
    {
      key: 'filterKey1',
      value: 'beauty_value',
    },
  ];

  describe('searchValue', () => {
    it('renders with TextField by default', () => {
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl {...mockDefaultProps} />
        </Provider>,
      );

      const searchField = wrapper.find(TextField);
      expect(searchField.exists()).toBe(true);
    });

    it('renders with searchValue as its value', () => {
      const searchValue = 'search value';
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl {...mockDefaultProps} searchValue={searchValue} />
        </Provider>,
      );

      const searchField = wrapper.find(TextField);
      expect(searchField.prop('value')).toBe(searchValue);
    });
  });

  describe('onSearchChange()', () => {
    it('calls onSearchChange with the new searchValue when onChange is triggered', () => {
      const newSearchValue = 'new search value';
      const onSearchChange = jest.fn();
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            onSearchChange={onSearchChange}
          />
        </Provider>,
      );

      trigger(wrapper.find(TextField), 'onChange', newSearchValue);

      expect(onSearchChange).toBeCalledWith(newSearchValue);
    });
  });

  describe('filters', () => {
    it('renders no <FilterCreator /> if there are no filters', () => {
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl {...mockDefaultProps} />
        </Provider>,
      );

      const searchField = wrapper.find(TextField);
      expect(searchField.prop('connectedLeft')).toBeNull();
    });

    it('renders <FilterCreator /> if there is filters', () => {
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl {...mockDefaultProps} filters={mockFilters} />
        </Provider>,
      );

      expect(wrapper.find(FilterCreator).exists()).toBe(true);
    });

    it('renders <FilterCreator /> with filters', () => {
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl {...mockDefaultProps} filters={mockFilters} />
        </Provider>,
      );

      expect(wrapper.find(FilterCreator).prop('filters')).toMatchObject(
        mockFilters,
      );
    });
  });

  describe('onFiltersChange()', () => {
    it('gets call with the new filter when FilterCreator.onAddFilter is triggered', () => {
      const newFilter = {
        key: 'new key',
        value: 'new value',
      };

      const onFiltersChange = jest.fn();
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={mockFilters}
            appliedFilters={mockAppliedFilters}
            onFiltersChange={onFiltersChange}
          />
        </Provider>,
      );

      trigger(wrapper.find(FilterCreator), 'onAddFilter', newFilter);

      expect(onFiltersChange).toBeCalledWith([
        ...mockAppliedFilters,
        newFilter,
      ]);
    });

    it('does not get call if the new filter already exist when FilterCreator.onAddFilter is triggered', () => {
      const newFilter = mockAppliedFilters[0];
      const onFiltersChange = jest.fn();
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={mockFilters}
            appliedFilters={mockAppliedFilters}
            onFiltersChange={onFiltersChange}
          />
        </Provider>,
      );

      trigger(wrapper.find(FilterCreator), 'onAddFilter', newFilter);

      expect(onFiltersChange).not.toBeCalled();
    });
  });

  describe('appliedFilters', () => {
    it('renders the same number of Tag as appliedFilters', () => {
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            appliedFilters={mockAppliedFilters}
          />
        </Provider>,
      );

      const tags = wrapper.find(Tag);
      expect(tags).toHaveLength(mockAppliedFilters.length);
    });

    it('calls onFiltersChange without the applied filter when user click remove on the appliedFilter', () => {
      const onFiltersChange = jest.fn();
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            appliedFilters={mockAppliedFilters}
            onFiltersChange={onFiltersChange}
          />
        </Provider>,
      );

      const tags = wrapper.find(Tag);
      trigger(tags.at(0), 'onRemove', mockAppliedFilters[0].key);

      expect(onFiltersChange).toBeCalledWith([
        ...mockAppliedFilters.slice(1, mockAppliedFilters.length),
      ]);
    });

    it('renders the correct applied filter string when applied filter label exist', () => {
      const appliedFilterLabel = 'shorten electronic';
      const filter: FilterSelect = {
        key: 'filterKey1',
        label: 'Product type',
        operatorText: 'is',
        type: FilterType.Select,
        options: [
          {
            value: 'electronic_value',
            label: 'Electronic',
          },
        ],
      };
      const appliedFilters = {
        key: filter.key,
        value: appliedFilterLabel,
      };
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </Provider>,
      );

      const firstTag = wrapper.find(Tag).at(0);
      expect(firstTag.text()).toBe(
        `${filter.label} ${filter.operatorText} ${appliedFilterLabel}`,
      );
    });

    it('renders the correct applied filter string when filter value exist in FilterSelect as an option string', () => {
      const filterValue = 'Bundle';
      const filter: FilterSelect = {
        key: 'filterKey1',
        label: 'Product type',
        operatorText: 'is',
        type: FilterType.Select,
        options: [filterValue],
      };
      const appliedFilters = {
        key: filter.key,
        value: filterValue,
      };
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </Provider>,
      );

      const firstTag = wrapper.find(Tag).at(0);
      expect(firstTag.text()).toBe(
        `${filter.label} ${filter.operatorText} ${filterValue}`,
      );
    });

    it('renders the correct applied filter string when filter value exist in FilterSelect as an option object', () => {
      const filterValue = 'Electronic';
      const filter: FilterSelect = {
        key: 'filterKey1',
        label: 'Product type',
        operatorText: 'is',
        type: FilterType.Select,
        options: [
          {
            value: 'electronic_value',
            label: filterValue,
          },
        ],
      };
      const appliedFilters = {
        key: filter.key,
        value: filterValue,
      };
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </Provider>,
      );

      const firstTag = wrapper.find(Tag).at(0);
      expect(firstTag.text()).toBe(
        `${filter.label} ${filter.operatorText} ${filterValue}`,
      );
    });

    it('renders the correct applied filter string when filter value cannot be found in FilterSelect options', () => {
      const appliedFilterValue = 'new Bundle';
      const filter: FilterSelect = {
        key: 'filterKey1',
        label: 'Product type',
        operatorText: 'is',
        type: FilterType.Select,
        options: ['Bundle'],
      };
      const appliedFilters = {
        key: filter.key,
        value: appliedFilterValue,
      };
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </Provider>,
      );

      const firstTag = wrapper.find(Tag).at(0);
      expect(firstTag.text()).toBe(
        `${filter.label} ${filter.operatorText} ${appliedFilterValue}`,
      );
    });

    it('renders the correct applied filter string when filter is a FilterTextField', () => {
      const appliedFilterValue = 'new Bundle';
      const filter: FilterTextField = {
        key: 'filterKey2',
        label: 'Tagged',
        operatorText: 'with',
        type: FilterType.TextField,
      };
      const appliedFilters = {
        key: filter.key,
        value: appliedFilterValue,
      };
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </Provider>,
      );

      const firstTag = wrapper.find(Tag).at(0);
      expect(firstTag.text()).toBe(
        `${filter.label} ${filter.operatorText} ${appliedFilterValue}`,
      );
    });

    it.only('renders the correct localized applied filter string when filter is a FilterDateSelector without date predicate', () => {
      const appliedFilterValue = DateFilterOptions.PastWeek;

      const filter: FilterDateSelector = {
        key: 'starts',
        minKey: 'starts_min',
        maxKey: 'starts_max',
        label: 'Starts',
        operatorText: 'is',
        type: FilterType.DateSelector,
      };
      const appliedFilters = {
        key: filter.key,
        value: appliedFilterValue,
      };
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </Provider>,
      );

      const expectedLocalizedLabel = wrapper
        .find(FilterControl)
        .instance()
        .context.polaris.intl.translate(
          'Polaris.ResourceList.DateSelector.FilterLabelForValue.past_week',
        );

      const firstTag = wrapper.find(Tag).at(0);
      expect(firstTag.text()).toBe(
        `${filter.label} ${filter.operatorText} ${expectedLocalizedLabel}`,
      );
    });

    it('renders the correct localized applied filter string when filter is a FilterDateSelector with minimum date predicate (on or after)', () => {
      const selectedDate = '2018-09-16';
      const filter: FilterDateSelector = {
        key: 'starts',
        minKey: 'starts_min',
        maxKey: 'starts_max',
        label: 'Starts',
        operatorText: 'is',
        type: FilterType.DateSelector,
      };
      const appliedFilters = {
        key: filter.minKey,
        value: selectedDate,
      };

      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </Provider>,
      );

      const expectedLocalizedLabel = wrapper
        .find(FilterControl)
        .instance()
        .context.polaris.intl.translate(
          'Polaris.ResourceList.DateSelector.FilterLabelForValue.on_or_after',
          {
            date: new Date(
              selectedDate.replace(/-/g, '/'),
            ).toLocaleDateString(),
          },
        );

      const firstTag = wrapper.find(Tag).at(0);
      expect(firstTag.text()).toBe(`${filter.label} ${expectedLocalizedLabel}`);
    });

    it('renders the correct localized applied filter string when filter is a FilterDateSelector with maximum date predicate (on or before)', () => {
      const selectedDate = '2018-09-16';
      const filter: FilterDateSelector = {
        key: 'starts',
        minKey: 'starts_min',
        maxKey: 'starts_max',
        label: 'Starts',
        operatorText: 'is',
        type: FilterType.DateSelector,
      };
      const appliedFilters = {
        key: filter.maxKey,
        value: selectedDate,
      };
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </Provider>,
      );

      const expectedLocalizedLabel = wrapper
        .find(FilterControl)
        .instance()
        .context.polaris.intl.translate(
          'Polaris.ResourceList.DateSelector.FilterLabelForValue.on_or_before',
          {
            date: new Date(
              selectedDate.replace(/-/g, '/'),
            ).toLocaleDateString(),
          },
        );

      const firstTag = wrapper.find(Tag).at(0);
      expect(firstTag.text()).toBe(`${filter.label} ${expectedLocalizedLabel}`);
    });

    it('renders applied filter value when filter is a FilterDateSelector with invalid date predicate', () => {
      const selectedDate = 'INVALID';
      const filter: FilterDateSelector = {
        key: 'starts',
        minKey: 'starts_min',
        maxKey: 'starts_max',
        label: 'Starts',
        operatorText: 'is',
        type: FilterType.DateSelector,
      };
      const appliedFilters = {
        key: filter.maxKey,
        value: selectedDate,
      };
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </Provider>,
      );

      const expectedLocalizedLabel = wrapper
        .find(FilterControl)
        .instance()
        .context.polaris.intl.translate(
          'Polaris.ResourceList.DateSelector.FilterLabelForValue.on_or_before',
          {
            date: selectedDate,
          },
        );

      const firstTag = wrapper.find(Tag).at(0);
      expect(firstTag.text()).toBe(`${filter.label} ${expectedLocalizedLabel}`);
    });

    it('renders the correct applied filter string when filter uses operators with filter label', () => {
      const appliedFilterValue = '20';
      const appliedFilterKey = 'times_used';
      const appliedFilterLabel = 'is';

      const filter: FilterTextField = {
        key: 'filterKey1',
        label: 'Times used',
        operatorText: [
          {
            optionLabel: 'equal to',
            filterLabel: appliedFilterLabel,
            key: appliedFilterKey,
          },
          {
            optionLabel: 'not equal to',
            filterLabel: 'is not',
            key: 'times_used_not',
          },
        ],
        type: FilterType.TextField,
      };
      const appliedFilters = {
        key: appliedFilterKey,
        value: appliedFilterValue,
      };
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </Provider>,
      );

      const firstTag = wrapper.find(Tag).at(0);

      expect(firstTag.text()).toBe(
        `${filter.label} ${appliedFilterLabel} ${appliedFilterValue}`,
      );
    });

    it('renders the correct applied filter string when filter uses operators without filter label', () => {
      const appliedFilterValue = '20';
      const appliedFilterKey = 'times_used';
      const appliedOperatorOptionLabel = 'equal to';

      const filter: FilterTextField = {
        key: 'filterKey1',
        label: 'Times used',
        operatorText: [
          {
            optionLabel: appliedOperatorOptionLabel,
            key: appliedFilterKey,
          },
          {
            optionLabel: 'not equal to',
            key: 'times_used_not',
          },
        ],
        type: FilterType.TextField,
      };
      const appliedFilters = {
        key: appliedFilterKey,
        value: appliedFilterValue,
      };
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </Provider>,
      );

      const firstTag = wrapper.find(Tag).at(0);

      expect(firstTag.text()).toBe(
        `${filter.label} ${appliedOperatorOptionLabel} ${appliedFilterValue}`,
      );
    });

    it('renders the correct applied filter string when filter key cannot be found', () => {
      const appliedFilterValue = 'new Bundle';
      const appliedFilters = {
        key: 'filter key',
        value: appliedFilterValue,
      };
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[]}
            appliedFilters={[appliedFilters]}
          />
        </Provider>,
      );

      const firstTag = wrapper.find(Tag).at(0);
      expect(firstTag.text()).toBe(appliedFilterValue);
    });
  });

  describe('additionalAction', () => {
    it('renders no connectedRight prop on TextField if there is no additionalAction', () => {
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl {...mockDefaultProps} />
        </Provider>,
      );

      const searchField = wrapper.find(TextField);
      expect(searchField.prop('connectedRight')).toBeNull();
    });

    it('renders Button if there is additionalAction', () => {
      const action = {
        content: 'button label',
        onAction: jest.fn(),
      };
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl {...mockDefaultProps} additionalAction={action} />
        </Provider>,
      );

      expect(wrapper.find(Button).exists()).toBe(true);

      trigger(wrapper.find(Button), 'onClick');
      expect(action.onAction).toBeCalled();
    });
  });
});
