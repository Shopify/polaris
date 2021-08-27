import React from 'react';
import {mountWithApp} from 'test-utilities';
import {TextField, Tag, Button} from 'components';

import {ResourceListContext} from '../../../../../utilities/resource-list';
import {
  Filter,
  FilterType,
  FilterSelect,
  FilterTextField,
  FilterDateSelector,
} from '../types';
// eslint-disable-next-line import/no-deprecated
import {FilterControl, FilterControlProps} from '../FilterControl';
import {FilterCreator, DateFilterOption} from '../components';

describe('<FilterControl />', () => {
  const mockDefaultProps: FilterControlProps = {
    onSearchChange: noop,
  };

  const mockDefaultContext = {
    selectMode: false,
    resourceName: {
      singular: 'item',
      plural: 'items',
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
      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl {...mockDefaultProps} />
        </ResourceListContext.Provider>,
      );

      expect(filterControl).toContainReactComponent(TextField);
    });

    it('renders with searchValue as its value', () => {
      const searchValue = 'search value';
      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl {...mockDefaultProps} searchValue={searchValue} />
        </ResourceListContext.Provider>,
      );

      expect(filterControl).toContainReactComponent(TextField, {
        value: searchValue,
      });
    });
  });

  describe('appliedFilters', () => {
    it('renders the same number of Tag as appliedFilters', () => {
      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            appliedFilters={mockAppliedFilters}
          />
        </ResourceListContext.Provider>,
      );

      const tags = filterControl.findAll(Tag);
      expect(tags).toHaveLength(mockAppliedFilters.length);
    });

    it('calls onFiltersChange without the applied filter when user clicks remove on the appliedFilter', () => {
      const onFiltersChange = jest.fn();
      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            appliedFilters={mockAppliedFilters}
            onFiltersChange={onFiltersChange}
          />
        </ResourceListContext.Provider>,
      );

      const tag = filterControl.findAll(Tag)[0];
      tag.trigger('onRemove');

      expect(onFiltersChange).toHaveBeenCalledWith([
        ...mockAppliedFilters.slice(1, mockAppliedFilters.length),
      ]);
    });

    it('renders the provided applied filter string when applied filter label exist', () => {
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
      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </ResourceListContext.Provider>,
      );

      const firstTag = filterControl.findAll(Tag)[0];

      expect(firstTag).toContainReactText(
        `${filter.label} ${filter.operatorText} ${appliedFilterLabel}`,
      );
    });

    it('renders the provided applied filter string when filter value exist in FilterSelect as an option string', () => {
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
      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </ResourceListContext.Provider>,
      );

      const firstTag = filterControl.findAll(Tag)[0];

      expect(firstTag).toContainReactText(
        `${filter.label} ${filter.operatorText} ${filterValue}`,
      );
    });

    it('renders the provided applied filter string when filter value exist in FilterSelect as an option object', () => {
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
      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </ResourceListContext.Provider>,
      );

      const firstTag = filterControl.findAll(Tag)[0];
      expect(firstTag).toContainReactText(
        `${filter.label} ${filter.operatorText} ${filterValue}`,
      );
    });

    it('renders the provided applied filter string when filter value cannot be found in FilterSelect options', () => {
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
      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </ResourceListContext.Provider>,
      );

      const firstTag = filterControl.findAll(Tag)[0];
      expect(firstTag).toContainReactText(
        `${filter.label} ${filter.operatorText} ${appliedFilterValue}`,
      );
    });

    it('renders the provided applied filter string when filter is a FilterTextField', () => {
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
      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </ResourceListContext.Provider>,
      );

      const firstTag = filterControl.findAll(Tag)[0];
      expect(firstTag).toContainReactText(
        `${filter.label} ${filter.operatorText} ${appliedFilterValue}`,
      );
    });

    it('renders the provided localized applied filter string when filter is a FilterDateSelector without date predicate', () => {
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
      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </ResourceListContext.Provider>,
      );

      const firstTag = filterControl.findAll(Tag)[0];
      expect(firstTag).toContainReactText(
        `${filter.label} ${filter.operatorText} in the last week`,
      );
    });

    it('renders the provided localized applied filter string when filter is a FilterDateSelector with minimum date predicate (on or after)', () => {
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

      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </ResourceListContext.Provider>,
      );

      const firstTag = filterControl.findAll(Tag)[0];
      expect(firstTag).toContainReactText(`${filter.label} after 9/16/2018`);
    });

    it('renders the provided localized applied filter string when filter is a FilterDateSelector with maximum date predicate (on or before)', () => {
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
      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </ResourceListContext.Provider>,
      );

      const firstTag = filterControl.findAll(Tag)[0];
      expect(firstTag).toContainReactText(`${filter.label} before 9/16/2018`);
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
      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </ResourceListContext.Provider>,
      );

      const firstTag = filterControl.findAll(Tag)[0];
      expect(firstTag).toContainReactText(`${filter.label} before INVALID`);
    });

    it('renders the provided applied filter string when filter uses operators with filter label', () => {
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
      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </ResourceListContext.Provider>,
      );

      const firstTag = filterControl.findAll(Tag)[0];

      expect(firstTag).toContainReactText(
        `${filter.label} ${appliedFilterLabel} ${appliedFilterValue}`,
      );
    });

    it('renders the provided applied filter string when filter uses operators without filter label', () => {
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
      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[filter]}
            appliedFilters={[appliedFilters]}
          />
        </ResourceListContext.Provider>,
      );

      const firstTag = filterControl.findAll(Tag)[0];

      expect(firstTag).toContainReactText(
        `${filter.label} ${appliedOperatorOptionLabel} ${appliedFilterValue}`,
      );
    });

    it('renders the provided applied filter string when filter key cannot be found', () => {
      const appliedFilterValue = 'new Bundle';
      const appliedFilters = {
        key: 'filter key',
        value: appliedFilterValue,
      };
      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[]}
            appliedFilters={[appliedFilters]}
          />
        </ResourceListContext.Provider>,
      );

      const firstTag = filterControl.findAll(Tag)[0];
      expect(firstTag).toContainReactText(appliedFilterValue);
    });

    it('renders a ul element containing an li element', () => {
      const appliedFilterValue = 'new Bundle';
      const appliedFilters = {
        key: 'filter key',
        value: appliedFilterValue,
      };
      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={[]}
            appliedFilters={[appliedFilters]}
          />
        </ResourceListContext.Provider>,
      );
      expect(filterControl.findAll('ul')).toHaveLength(1);
      expect(filterControl.findAll('li')).toHaveLength(1);
    });
  });

  describe('additionalAction', () => {
    it('renders no connectedRight prop on TextField if there is no additionalAction', () => {
      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl {...mockDefaultProps} />
        </ResourceListContext.Provider>,
      );

      expect(filterControl).toContainReactComponent(TextField, {
        connectedRight: null,
      });
    });

    it('renders Button if there is additionalAction', () => {
      const action = {
        content: 'button label',
        onAction: jest.fn(),
      };
      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl {...mockDefaultProps} additionalAction={action} />
        </ResourceListContext.Provider>,
      );

      expect(filterControl).toContainReactComponent(Button);

      filterControl.find(Button)!.trigger('onClick');
      expect(action.onAction).toHaveBeenCalled();
    });
  });

  describe('focused', () => {
    it('passes its value to focus of TextField', () => {
      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl {...mockDefaultProps} focused />
        </ResourceListContext.Provider>,
      );

      expect(filterControl).toContainReactComponent(TextField, {focused: true});
    });
  });

  describe('filters', () => {
    it('renders no <FilterCreator /> if there are no filters', () => {
      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl {...mockDefaultProps} />
        </ResourceListContext.Provider>,
      );

      expect(filterControl).toContainReactComponent(TextField, {
        connectedLeft: null,
      });
    });

    it('renders <FilterCreator /> if there is filters', () => {
      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl {...mockDefaultProps} filters={mockFilters} />
        </ResourceListContext.Provider>,
      );

      expect(filterControl).toContainReactComponent(FilterCreator);
    });

    it('renders <FilterCreator /> with filters', () => {
      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl {...mockDefaultProps} filters={mockFilters} />
        </ResourceListContext.Provider>,
      );

      expect(filterControl).toContainReactComponent(FilterCreator, {
        filters: mockFilters,
      });
    });
  });

  describe('placeholder', () => {
    it('renders default text if no placeholder passed.', () => {
      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl {...mockDefaultProps} filters={mockFilters} />
        </ResourceListContext.Provider>,
      );

      expect(filterControl).toContainReactComponent(TextField, {
        placeholder: 'Search items',
      });
    });

    it('renders the placeholder prop value if provided', () => {
      const placeholder = 'Search by name, email or phone';
      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={mockFilters}
            placeholder={placeholder}
          />
        </ResourceListContext.Provider>,
      );

      expect(filterControl).toContainReactComponent(TextField, {
        placeholder: 'Search by name, email or phone',
      });
    });
  });

  describe('onSearchBlur()', () => {
    it('gets passed to onBlur of TextField', () => {
      const onSearchBlur = jest.fn();
      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl {...mockDefaultProps} onSearchBlur={onSearchBlur} />
        </ResourceListContext.Provider>,
      );

      expect(filterControl).toContainReactComponent(TextField, {
        onBlur: onSearchBlur,
      });
    });

    it('calls onSearchBlur when onBlur is triggered', () => {
      const onSearchBlur = jest.fn();
      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl {...mockDefaultProps} onSearchBlur={onSearchBlur} />
        </ResourceListContext.Provider>,
      );

      filterControl.find(TextField)!.trigger('onBlur');

      expect(onSearchBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('onSearchChange()', () => {
    it('gets passed to onChange of TextField', () => {
      const onSearchChange = jest.fn();
      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            onSearchChange={onSearchChange}
          />
        </ResourceListContext.Provider>,
      );

      expect(filterControl).toContainReactComponent(TextField, {
        onChange: onSearchChange,
      });
    });

    it('calls onSearchChange with the new searchValue when onChange is triggered', () => {
      const newSearchValue = 'new search value';
      const onSearchChange = jest.fn();
      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            onSearchChange={onSearchChange}
          />
        </ResourceListContext.Provider>,
      );

      filterControl.find(TextField)!.trigger('onChange', newSearchValue);

      expect(onSearchChange).toHaveBeenCalledWith(newSearchValue);
    });
  });

  describe('onFiltersChange()', () => {
    it('gets call with the new filter when FilterCreator.onAddFilter is triggered', () => {
      const newFilter = {
        key: 'new key',
        value: 'new value',
      };

      const onFiltersChange = jest.fn();
      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={mockFilters}
            appliedFilters={mockAppliedFilters}
            onFiltersChange={onFiltersChange}
          />
        </ResourceListContext.Provider>,
      );

      filterControl.find(FilterCreator)!.trigger('onAddFilter', newFilter);

      expect(onFiltersChange).toHaveBeenCalledWith([
        ...mockAppliedFilters,
        newFilter,
      ]);
    });

    it('does not get called if the new filter already exists when FilterCreator.onAddFilter is triggered', () => {
      const newFilter = mockAppliedFilters[0];
      const onFiltersChange = jest.fn();
      const filterControl = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <FilterControl
            {...mockDefaultProps}
            filters={mockFilters}
            appliedFilters={mockAppliedFilters}
            onFiltersChange={onFiltersChange}
          />
        </ResourceListContext.Provider>,
      );

      filterControl.find(FilterCreator)!.trigger('onAddFilter', newFilter);

      expect(onFiltersChange).not.toHaveBeenCalled();
    });
  });

  describe('resource name', () => {
    it('will default to the provided translation', () => {
      const filterControl = mountWithApp(
        <FilterControl {...mockDefaultProps} />,
      );

      expect(filterControl).toContainReactComponent(TextField, {
        label: 'Search items',
      });
    });
  });
});

function noop() {}
