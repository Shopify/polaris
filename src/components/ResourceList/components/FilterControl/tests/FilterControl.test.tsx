import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {trigger, mountWithAppProvider} from 'test-utilities';
import {TextField, Tag, Button} from 'components';
import {Provider} from '../../Context';
import {
  Filter,
  FilterType,
  FilterSelect,
  FilterTextField,
  FilterDateSelector,
} from '../types';
import FilterControl, {Props} from '../FilterControl';
import {FilterCreator, DateFilterOption} from '../components';

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
      const filterControl = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl {...mockDefaultProps} />
        </Provider>,
      );

      const searchField = filterControl.find(TextField);
      expect(searchField.exists()).toBe(true);
    });

    it('renders with searchValue as its value', () => {
      const searchValue = 'search value';
      const filterControl = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl {...mockDefaultProps} searchValue={searchValue} />
        </Provider>,
      );

      const searchField = filterControl.find(TextField);
      expect(searchField.prop('value')).toBe(searchValue);
    });
  });

  describe('appliedFilters', () => {
    it('renders the same number of Tag as appliedFilters', () => {
      const filterControl = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            appliedFilters={mockAppliedFilters}
          />
        </Provider>,
      );

      const tags = filterControl.find(Tag);
      expect(tags).toHaveLength(mockAppliedFilters.length);
    });

    it('calls onFiltersChange without the applied filter when user clicks remove on the appliedFilter', () => {
      const onFiltersChange = jest.fn();
      const filterControl = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            appliedFilters={mockAppliedFilters}
            onFiltersChange={onFiltersChange}
          />
        </Provider>,
      );

      const tags = filterControl.find(Tag);
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
      const filterControl = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </Provider>,
      );

      const firstTag = filterControl.find(Tag).first();
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
      const filterControl = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </Provider>,
      );

      const firstTag = filterControl.find(Tag).at(0);
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
      const filterControl = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </Provider>,
      );

      const firstTag = filterControl.find(Tag).at(0);
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
      const filterControl = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </Provider>,
      );

      const firstTag = filterControl.find(Tag).at(0);
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
      const filterControl = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </Provider>,
      );

      const firstTag = filterControl.find(Tag).at(0);
      expect(firstTag.text()).toBe(
        `${filter.label} ${filter.operatorText} ${appliedFilterValue}`,
      );
    });

    it('renders the correct localized applied filter string when filter is a FilterDateSelector without date predicate', () => {
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
      const filterControl = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </Provider>,
      );

      const expectedLocalizedLabel = filterControl
        .find(FilterControl)
        .instance()
        .context.polaris.intl.translate(
          'Polaris.ResourceList.DateSelector.FilterLabelForValue.past_week',
        );

      const firstTag = filterControl.find(Tag).at(0);
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

      const filterControl = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </Provider>,
      );

      const expectedLocalizedLabel = filterControl
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

      const firstTag = filterControl.find(Tag).at(0);
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
      const filterControl = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </Provider>,
      );

      const expectedLocalizedLabel = filterControl
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

      const firstTag = filterControl.find(Tag).at(0);
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
      const filterControl = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </Provider>,
      );

      const expectedLocalizedLabel = filterControl
        .find(FilterControl)
        .instance()
        .context.polaris.intl.translate(
          'Polaris.ResourceList.DateSelector.FilterLabelForValue.on_or_before',
          {
            date: selectedDate,
          },
        );

      const firstTag = filterControl.find(Tag).at(0);
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
      const filterControl = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </Provider>,
      );

      const firstTag = filterControl.find(Tag).at(0);

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
      const filterControl = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </Provider>,
      );

      const firstTag = filterControl.find(Tag).at(0);

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
      const filterControl = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[]}
            appliedFilters={[appliedFilters]}
          />
        </Provider>,
      );

      const firstTag = filterControl.find(Tag).at(0);
      expect(firstTag.text()).toBe(appliedFilterValue);
    });

    it('renders a ul element containing an li element', () => {
      const appliedFilterValue = 'new Bundle';
      const appliedFilters = {
        key: 'filter key',
        value: appliedFilterValue,
      };
      const filterControl = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[]}
            appliedFilters={[appliedFilters]}
          />
        </Provider>,
      );
      expect(filterControl.find('ul')).toHaveLength(1);
      expect(filterControl.find('li')).toHaveLength(1);
    });
  });

  describe('additionalAction', () => {
    it('renders no connectedRight prop on TextField if there is no additionalAction', () => {
      const filterControl = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl {...mockDefaultProps} />
        </Provider>,
      );

      const searchField = filterControl.find(TextField);
      expect(searchField.prop('connectedRight')).toBeNull();
    });

    it('renders Button if there is additionalAction', () => {
      const action = {
        content: 'button label',
        onAction: jest.fn(),
      };
      const filterControl = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl {...mockDefaultProps} additionalAction={action} />
        </Provider>,
      );

      expect(filterControl.find(Button).exists()).toBe(true);

      trigger(filterControl.find(Button), 'onClick');
      expect(action.onAction).toBeCalled();
    });
  });

  describe('focused', () => {
    it('passes its value to focus of TextField', () => {
      const filterControl = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl {...mockDefaultProps} focused />
        </Provider>,
      );

      expect(filterControl.find(TextField).prop('focused')).toBe(true);
    });
  });

  describe('filters', () => {
    it('renders no <FilterCreator /> if there are no filters', () => {
      const filterControl = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl {...mockDefaultProps} />
        </Provider>,
      );

      const searchField = filterControl.find(TextField);
      expect(searchField.prop('connectedLeft')).toBeNull();
    });

    it('renders <FilterCreator /> if there is filters', () => {
      const filterControl = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl {...mockDefaultProps} filters={mockFilters} />
        </Provider>,
      );

      expect(filterControl.find(FilterCreator).exists()).toBe(true);
    });

    it('renders <FilterCreator /> with filters', () => {
      const filterControl = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl {...mockDefaultProps} filters={mockFilters} />
        </Provider>,
      );

      expect(filterControl.find(FilterCreator).prop('filters')).toMatchObject(
        mockFilters,
      );
    });
  });

  describe('onSearchBlur()', () => {
    it('gets passed to onBlur of TextField', () => {
      const onSearchBlur = jest.fn();
      const filterControl = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl {...mockDefaultProps} onSearchBlur={onSearchBlur} />
        </Provider>,
      );

      expect(filterControl.find(TextField).prop('onBlur')).toBe(onSearchBlur);
    });

    it('calls onSearchBlur when onBlur is triggered', () => {
      const onSearchBlur = jest.fn();
      const filterControl = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl {...mockDefaultProps} onSearchBlur={onSearchBlur} />
        </Provider>,
      );

      trigger(filterControl.find(TextField), 'onBlur');

      expect(onSearchBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('onSearchChange()', () => {
    it('gets passed to onChange of TextField', () => {
      const onSearchChange = jest.fn();
      const filterControl = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            onSearchChange={onSearchChange}
          />
        </Provider>,
      );

      expect(filterControl.find(TextField).prop('onChange')).toBe(
        onSearchChange,
      );
    });

    it('calls onSearchChange with the new searchValue when onChange is triggered', () => {
      const newSearchValue = 'new search value';
      const onSearchChange = jest.fn();
      const filterControl = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            onSearchChange={onSearchChange}
          />
        </Provider>,
      );

      trigger(filterControl.find(TextField), 'onChange', newSearchValue);

      expect(onSearchChange).toBeCalledWith(newSearchValue);
    });
  });

  describe('onFiltersChange()', () => {
    it('gets call with the new filter when FilterCreator.onAddFilter is triggered', () => {
      const newFilter = {
        key: 'new key',
        value: 'new value',
      };

      const onFiltersChange = jest.fn();
      const filterControl = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={mockFilters}
            appliedFilters={mockAppliedFilters}
            onFiltersChange={onFiltersChange}
          />
        </Provider>,
      );

      trigger(filterControl.find(FilterCreator), 'onAddFilter', newFilter);

      expect(onFiltersChange).toBeCalledWith([
        ...mockAppliedFilters,
        newFilter,
      ]);
    });

    it('does not get called if the new filter already exists when FilterCreator.onAddFilter is triggered', () => {
      const newFilter = mockAppliedFilters[0];
      const onFiltersChange = jest.fn();
      const filterControl = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={mockFilters}
            appliedFilters={mockAppliedFilters}
            onFiltersChange={onFiltersChange}
          />
        </Provider>,
      );

      trigger(filterControl.find(FilterCreator), 'onAddFilter', newFilter);

      expect(onFiltersChange).not.toBeCalled();
    });
  });
});
