import * as React from 'react';
import {TextField, Tag, Button} from '@shopify/polaris';
import {noop} from '@shopify/javascript-utilities/other';
import {mountWithPolarisContext, trigger} from 'tests/utilities';
import FilterControl, {Props} from '..';
import FilterCreator from '../FilterCreator';
import {DateFilterOption} from '../DateSelector';
import {
  Filter,
  FilterType,
  FilterSelect,
  FilterTextField,
  FilterDateSelector,
} from '../types';

describe('<FilterControl />', () => {
  const mockDefaultProps: Props = {
    onSearchChange: noop,
  };

  const mockDefaultContext = {
    resourceName: {
      singlar: 'item',
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
      const wrapper = mountWithPolarisContext(
        <FilterControl {...mockDefaultProps} />,
        {
          context: mockDefaultContext,
        },
      );

      const searchField = wrapper.find(TextField);
      expect(searchField.exists()).toBe(true);
    });

    it('renders with searchValue as its value', () => {
      const searchValue = 'search value';
      const wrapper = mountWithPolarisContext(
        <FilterControl {...mockDefaultProps} searchValue={searchValue} />,
        {
          context: mockDefaultContext,
        },
      );

      const searchField = wrapper.find(TextField);
      expect(searchField.prop('value')).toBe(searchValue);
    });
  });

  describe('onSearchChange()', () => {
    it('calls onSearchChange with the new searchValue when onChange is triggered', () => {
      const newSearchValue = 'new search value';
      const onSearchChange = jest.fn();
      const wrapper = mountWithPolarisContext(
        <FilterControl {...mockDefaultProps} onSearchChange={onSearchChange} />,
        {
          context: mockDefaultContext,
        },
      );

      trigger(wrapper.find(TextField), 'onChange', newSearchValue);

      expect(onSearchChange).toBeCalledWith(newSearchValue);
    });
  });

  describe('filters', () => {
    it('renders no <FilterCreator /> if there are no filters', () => {
      const wrapper = mountWithPolarisContext(
        <FilterControl {...mockDefaultProps} />,
        {
          context: mockDefaultContext,
        },
      );

      const searchField = wrapper.find(TextField);
      expect(searchField.prop('connectedLeft')).toBeNull();
    });

    it('renders <FilterCreator /> if there is filters', () => {
      const wrapper = mountWithPolarisContext(
        <FilterControl {...mockDefaultProps} filters={mockFilters} />,
        {
          context: mockDefaultContext,
        },
      );

      expect(wrapper.find(FilterCreator).exists()).toBe(true);
    });

    it('renders <FilterCreator /> with filters', () => {
      const wrapper = mountWithPolarisContext(
        <FilterControl {...mockDefaultProps} filters={mockFilters} />,
        {
          context: mockDefaultContext,
        },
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
      const wrapper = mountWithPolarisContext(
        <FilterControl
          {...mockDefaultProps}
          filters={mockFilters}
          appliedFilters={mockAppliedFilters}
          onFiltersChange={onFiltersChange}
        />,
        {
          context: mockDefaultContext,
        },
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
      const wrapper = mountWithPolarisContext(
        <FilterControl
          {...mockDefaultProps}
          filters={mockFilters}
          appliedFilters={mockAppliedFilters}
          onFiltersChange={onFiltersChange}
        />,
        {
          context: mockDefaultContext,
        },
      );

      trigger(wrapper.find(FilterCreator), 'onAddFilter', newFilter);

      expect(onFiltersChange).not.toBeCalled();
    });
  });

  describe('appliedFilters', () => {
    it('renders the same number of Tag as appliedFilters', () => {
      const wrapper = mountWithPolarisContext(
        <FilterControl
          {...mockDefaultProps}
          appliedFilters={mockAppliedFilters}
        />,
        {
          context: mockDefaultContext,
        },
      );

      const tags = wrapper.find(Tag);
      expect(tags).toHaveLength(mockAppliedFilters.length);
    });

    it('calls onFiltersChange without the applied filter when user click remove on the appliedFilter', () => {
      const onFiltersChange = jest.fn();
      const wrapper = mountWithPolarisContext(
        <FilterControl
          {...mockDefaultProps}
          appliedFilters={mockAppliedFilters}
          onFiltersChange={onFiltersChange}
        />,
        {
          context: mockDefaultContext,
        },
      );

      const tags = wrapper.find(Tag);
      trigger(tags.at(0), 'onRemove', mockAppliedFilters[0].key);

      expect(onFiltersChange).toBeCalledWith([
        ...mockAppliedFilters.slice(1, mockAppliedFilters.length),
      ]);
    });

    it('renders the applied filter string when applied filter label exists', () => {
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
      const wrapper = mountWithPolarisContext(
        <FilterControl
          {...mockDefaultProps}
          filters={[filter]}
          appliedFilters={[appliedFilters]}
        />,
        {
          context: mockDefaultContext,
        },
      );

      const firstTag = wrapper.find(Tag).at(0);
      expect(firstTag.text()).toBe(
        `${filter.label} ${filter.operatorText} ${appliedFilterLabel}`,
      );
    });

    it('renders the applied filter string when filter value exist in FilterSelect as an option string', () => {
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
      const wrapper = mountWithPolarisContext(
        <FilterControl
          {...mockDefaultProps}
          filters={[filter]}
          appliedFilters={[appliedFilters]}
        />,
        {
          context: mockDefaultContext,
        },
      );

      const firstTag = wrapper.find(Tag).at(0);
      expect(firstTag.text()).toBe(
        `${filter.label} ${filter.operatorText} ${filterValue}`,
      );
    });

    it('renders the applied filter string when filter value exist in FilterSelect as an option object', () => {
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
      const wrapper = mountWithPolarisContext(
        <FilterControl
          {...mockDefaultProps}
          filters={[filter]}
          appliedFilters={[appliedFilters]}
        />,
        {
          context: mockDefaultContext,
        },
      );

      const firstTag = wrapper.find(Tag).at(0);
      expect(firstTag.text()).toBe(
        `${filter.label} ${filter.operatorText} ${filterValue}`,
      );
    });

    it('renders the applied filter string when filter value cannot be found in FilterSelect options', () => {
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
      const wrapper = mountWithPolarisContext(
        <FilterControl
          {...mockDefaultProps}
          filters={[filter]}
          appliedFilters={[appliedFilters]}
        />,
        {
          context: mockDefaultContext,
        },
      );

      const firstTag = wrapper.find(Tag).at(0);
      expect(firstTag.text()).toBe(
        `${filter.label} ${filter.operatorText} ${appliedFilterValue}`,
      );
    });

    it('renders the applied filter string when filter is a FilterTextField', () => {
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
      const wrapper = mountWithPolarisContext(
        <FilterControl
          {...mockDefaultProps}
          filters={[filter]}
          appliedFilters={[appliedFilters]}
        />,
        {
          context: mockDefaultContext,
        },
      );

      const firstTag = wrapper.find(Tag).at(0);
      expect(firstTag.text()).toBe(
        `${filter.label} ${filter.operatorText} ${appliedFilterValue}`,
      );
    });

    it('renders the localized applied filter string when filter is a FilterDateSelector without date predicate', () => {
      const appliedFilterValue = DateFilterOption.PastWeek;

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
      const wrapper = mountWithPolarisContext(
        <FilterControl
          {...mockDefaultProps}
          filters={[filter]}
          appliedFilters={[appliedFilters]}
        />,
        {
          context: mockDefaultContext,
        },
      );

      const expectedLocalizedLabel = wrapper
        .instance()
        .context.polaris.intl.translate(
          'Polaris.ResourceList.DateSelector.FilterLabelForValue.past_week',
        );

      const firstTag = wrapper.find(Tag).at(0);
      expect(firstTag.text()).toBe(
        `${filter.label} ${filter.operatorText} ${expectedLocalizedLabel}`,
      );
    });

    it('renders the localized applied filter string when filter is a FilterDateSelector with minimum date predicate (on or after)', () => {
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

      const wrapper = mountWithPolarisContext(
        <FilterControl
          {...mockDefaultProps}
          filters={[filter]}
          appliedFilters={[appliedFilters]}
        />,
        {
          context: mockDefaultContext,
        },
      );

      const expectedLocalizedLabel = wrapper
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

    it('renders the localized applied filter string when filter is a FilterDateSelector with maximum date predicate (on or before)', () => {
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
      const wrapper = mountWithPolarisContext(
        <FilterControl
          {...mockDefaultProps}
          filters={[filter]}
          appliedFilters={[appliedFilters]}
        />,
        {
          context: mockDefaultContext,
        },
      );

      const expectedLocalizedLabel = wrapper
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
      const wrapper = mountWithPolarisContext(
        <FilterControl
          {...mockDefaultProps}
          filters={[filter]}
          appliedFilters={[appliedFilters]}
        />,
        {
          context: mockDefaultContext,
        },
      );

      const expectedLocalizedLabel = wrapper
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

    it('renders the applied filter string when filter uses operators with filter label', () => {
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
      const wrapper = mountWithPolarisContext(
        <FilterControl
          {...mockDefaultProps}
          filters={[filter]}
          appliedFilters={[appliedFilters]}
        />,
        {
          context: mockDefaultContext,
        },
      );

      const firstTag = wrapper.find(Tag).at(0);

      expect(firstTag.text()).toBe(
        `${filter.label} ${appliedFilterLabel} ${appliedFilterValue}`,
      );
    });

    it('renders the applied filter string when filter uses operators without filter label', () => {
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
      const wrapper = mountWithPolarisContext(
        <FilterControl
          {...mockDefaultProps}
          filters={[filter]}
          appliedFilters={[appliedFilters]}
        />,
        {
          context: mockDefaultContext,
        },
      );

      const firstTag = wrapper.find(Tag).at(0);

      expect(firstTag.text()).toBe(
        `${filter.label} ${appliedOperatorOptionLabel} ${appliedFilterValue}`,
      );
    });

    it('renders the applied filter string when filter key cannot be found', () => {
      const appliedFilterValue = 'new Bundle';
      const appliedFilters = {
        key: 'filter key',
        value: appliedFilterValue,
      };
      const wrapper = mountWithPolarisContext(
        <FilterControl
          {...mockDefaultProps}
          filters={[]}
          appliedFilters={[appliedFilters]}
        />,
        {
          context: mockDefaultContext,
        },
      );

      const firstTag = wrapper.find(Tag).at(0);
      expect(firstTag.text()).toBe(appliedFilterValue);
    });
  });

  describe('additionalAction', () => {
    it('renders no connectedRight prop on TextField if there is no additionalAction', () => {
      const wrapper = mountWithPolarisContext(
        <FilterControl {...mockDefaultProps} />,
        {
          context: mockDefaultContext,
        },
      );

      const searchField = wrapper.find(TextField);
      expect(searchField.prop('connectedRight')).toBeNull();
    });

    it('renders Button if there is additionalAction', () => {
      const action = {
        content: 'button label',
        onAction: jest.fn(),
      };
      const wrapper = mountWithPolarisContext(
        <FilterControl {...mockDefaultProps} additionalAction={action} />,
        {
          context: mockDefaultContext,
        },
      );

      expect(wrapper.find(Button).exists()).toBe(true);

      trigger(wrapper.find(Button), 'onClick');
      expect(action.onAction).toBeCalled();
    });
  });
});
