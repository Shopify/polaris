import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {
  trigger,
  findByTestID,
  mountWithAppProvider,
  ReactWrapper,
} from 'test-utilities/legacy';
import {Button, Select, Popover} from 'components';

import {FilterCreator, FilterCreatorProps} from '../FilterCreator';
import {FilterValueSelector} from '../../FilterValueSelector';
import {FilterType} from '../../../types';

jest.mock('../../../../../../Popover/components', () => ({
  PopoverOverlay: function PopoverOverlay({children}: any) {
    return children;
  },
}));

describe('<FilterCreator />', () => {
  const mockDefaultProps: FilterCreatorProps = {
    filters: [
      {
        key: 'filterKey',
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
        label: 'Tagged with',
        type: FilterType.TextField,
      },
      {
        key: 'filterKey3',
        label: 'Times used',
        operatorText: [
          {
            optionLabel: 'less than',
            key: 'times_used_max',
          },
          {
            optionLabel: 'greater than',
            key: 'times_used_min',
          },
        ],
        type: FilterType.TextField,
      },
    ],
    resourceName: {
      singular: 'Item',
      plural: 'Items',
    },
    disabled: false,
  };

  it('focuses the activator after adding a filter', () => {
    const filterCreator = mountWithAppProvider(
      <FilterCreator {...mockDefaultProps} onAddFilter={() => {}} />,
    );
    trigger(
      filterCreator.find(Select),
      'onChange',
      mockDefaultProps.filters[0].key,
    );
    const activator = findByTestID(
      filterCreator,
      'FilterCreator-FilterActivator',
    );
    trigger(activator, 'onFocus', {target: activator.getDOMNode()});
    trigger(filterCreator.find(FilterValueSelector), 'onChange', 'x');
    trigger(
      findByTestID(filterCreator, 'FilterCreator-AddFilterButton'),
      'onClick',
    );

    expect(activator.getDOMNode()).toBe(document.activeElement);
  });

  it('does not focus the activator after adding a filter if focus was never originally received by the by activator', () => {
    const filterCreator = mountWithAppProvider(
      <FilterCreator {...mockDefaultProps} onAddFilter={() => {}} />,
    );
    trigger(
      filterCreator.find(Select),
      'onChange',
      mockDefaultProps.filters[0].key,
    );
    const activator = findByTestID(
      filterCreator,
      'FilterCreator-FilterActivator',
    );
    trigger(activator, 'onFocus');
    trigger(filterCreator.find(FilterValueSelector), 'onChange', 'x');
    trigger(
      findByTestID(filterCreator, 'FilterCreator-AddFilterButton'),
      'onClick',
    );

    expect(activator.getDOMNode()).not.toBe(document.activeElement);
  });

  it('renders just a button by default', () => {
    const wrapper = mountWithAppProvider(
      <FilterCreator {...mockDefaultProps} />,
    );

    expect(
      findByTestID(wrapper, 'FilterCreator-FilterActivator').exists(),
    ).toBe(true);
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('renders a non-active popover on default', () => {
    const wrapper = mountWithAppProvider(
      <FilterCreator {...mockDefaultProps} />,
    );

    expect(wrapper.find(Popover).prop('active')).toBe(false);
  });

  it('renders a active popover with a Select on click of the activator button', () => {
    const wrapper = mountWithAppProvider(
      <FilterCreator {...mockDefaultProps} />,
    );

    activatePopover(wrapper);

    expect(wrapper.find(Popover).prop('active')).toBe(true);
    expect(findFilterKeySelect(wrapper).exists()).toBe(true);
  });

  it('renders a non-active popover after add filter button was clicked and onAddFilter was triggered', () => {
    const onAddFilter = jest.fn();
    const wrapper = mountWithAppProvider(
      <FilterCreator {...mockDefaultProps} onAddFilter={onAddFilter} />,
    );

    activatePopover(wrapper);
    selectFilterKey(wrapper, mockDefaultProps.filters[0].key);
    selectFilterValue(wrapper, 'Bundle');
    clickAddFilter(wrapper);

    expect(onAddFilter).toHaveBeenCalled();
    expect(wrapper.find(Popover).prop('active')).toBe(false);
  });

  it('does not renders FilterValueSelector after add filter button was clicked', () => {
    const onAddFilter = jest.fn();
    const wrapper = mountWithAppProvider(
      <FilterCreator {...mockDefaultProps} onAddFilter={onAddFilter} />,
    );

    activatePopover(wrapper);
    selectFilterKey(wrapper, mockDefaultProps.filters[0].key);
    selectFilterValue(wrapper, 'Bundle');

    expect(wrapper.find(FilterValueSelector).exists()).toBe(true);
    clickAddFilter(wrapper);
    expect(wrapper.find(FilterValueSelector).exists()).toBe(false);
  });

  it('renders Select with no value after add filter button was clicked', () => {
    const onAddFilter = jest.fn();
    const wrapper = mountWithAppProvider(
      <FilterCreator {...mockDefaultProps} onAddFilter={onAddFilter} />,
    );

    activatePopover(wrapper);
    selectFilterKey(wrapper, mockDefaultProps.filters[0].key);
    selectFilterValue(wrapper, 'Bundle');

    expect(wrapper.find(Select).at(0).prop('value')).toBeDefined();
    clickAddFilter(wrapper);
    expect(wrapper.find(Select).at(0).prop('value')).toBeUndefined();
  });

  describe('filters', () => {
    it('sets the options when popover is active', () => {
      const wrapper = mountWithAppProvider(
        <FilterCreator {...mockDefaultProps} />,
      );

      activatePopover(wrapper);

      expect(findFilterKeySelect(wrapper).prop('options')).toMatchObject([
        {
          value: mockDefaultProps.filters[0].key,
          label: mockDefaultProps.filters[0].label,
        },
        {
          value: mockDefaultProps.filters[1].key,
          label: mockDefaultProps.filters[1].label,
        },
        {
          value: mockDefaultProps.filters[2].key,
          label: mockDefaultProps.filters[2].label,
        },
      ]);
    });
  });

  describe('<FilterValueSelector />', () => {
    it('does not render by default', () => {
      const wrapper = mountWithAppProvider(
        <FilterCreator {...mockDefaultProps} />,
      );

      activatePopover(wrapper);

      expect(wrapper.find(FilterValueSelector).exists()).toBe(false);
    });

    it('updates FilterValueSelector when user selects a filter key', () => {
      const wrapper = mountWithAppProvider(
        <FilterCreator {...mockDefaultProps} />,
      );

      activatePopover(wrapper);
      selectFilterKey(wrapper, mockDefaultProps.filters[1].key);

      expect(wrapper.find(FilterValueSelector).prop('filter')).toMatchObject(
        mockDefaultProps.filters[1],
      );
      expect(wrapper.find(FilterValueSelector).prop('value')).toBeUndefined();
    });

    it('updates value with provided string when user selects a filter value', () => {
      const wrapper = mountWithAppProvider(
        <FilterCreator {...mockDefaultProps} />,
      );

      activatePopover(wrapper);
      selectFilterKey(wrapper, mockDefaultProps.filters[0].key);
      selectFilterValue(wrapper, 'Bundle');

      expect(wrapper.find(FilterValueSelector).prop('value')).toBe('Bundle');
    });

    it('updates FilterValueSelector when filter key is updated to existing operator key', () => {
      const wrapper = mountWithAppProvider(
        <FilterCreator {...mockDefaultProps} />,
      );

      const newOperatorKey = 'times_used_max';

      activatePopover(wrapper);
      selectFilterKey(wrapper, mockDefaultProps.filters[2].key);
      selectFilterValue(wrapper, 'Bundle');

      trigger(
        wrapper.find(FilterValueSelector),
        'onFilterKeyChange',
        newOperatorKey,
      );

      expect(wrapper.find(FilterValueSelector).prop('filterKey')).toBe(
        newOperatorKey,
      );
    });
  });

  describe('filter add button', () => {
    it('is enabled when filter key and filter value are both selected', () => {
      const wrapper = mountWithAppProvider(
        <FilterCreator {...mockDefaultProps} />,
      );

      activatePopover(wrapper);
      selectFilterKey(wrapper, mockDefaultProps.filters[0].key);
      selectFilterValue(wrapper, 'Bundle');

      expect(
        findByTestID(wrapper, 'FilterCreator-AddFilterButton').prop('disabled'),
      ).toBe(false);
    });

    it('is disabled when filter key and value are not selected', () => {
      const wrapper = mountWithAppProvider(
        <FilterCreator {...mockDefaultProps} />,
      );

      activatePopover(wrapper);
      selectFilterKey(wrapper, mockDefaultProps.filters[0].key);

      expect(
        findByTestID(wrapper, 'FilterCreator-AddFilterButton').prop('disabled'),
      ).toBe(true);
    });

    it('is disabled when filter value is an empty string', () => {
      const wrapper = mountWithAppProvider(
        <FilterCreator {...mockDefaultProps} />,
      );

      activatePopover(wrapper);
      selectFilterKey(wrapper, mockDefaultProps.filters[0].key);
      selectFilterValue(wrapper, '');

      expect(
        findByTestID(wrapper, 'FilterCreator-AddFilterButton').prop('disabled'),
      ).toBe(true);
    });
  });

  describe('onAddFilter', () => {
    it('gets call with selected filter key & value when both value are valid and add filter button was clicked', () => {
      const onAddFilter = jest.fn();
      const wrapper = mountWithAppProvider(
        <FilterCreator {...mockDefaultProps} onAddFilter={onAddFilter} />,
      );

      activatePopover(wrapper);
      selectFilterKey(wrapper, mockDefaultProps.filters[0].key);
      selectFilterValue(wrapper, 'Bundle');
      clickAddFilter(wrapper);

      expect(onAddFilter).toHaveBeenCalledWith({
        key: mockDefaultProps.filters[0].key,
        value: 'Bundle',
      });
    });
  });
});

function activatePopover(wrapper: ReactWrapper<FilterCreatorProps>) {
  trigger(findByTestID(wrapper, 'FilterCreator-FilterActivator'), 'onClick');
}

function findFilterKeySelect(popover: ReactWrapper<FilterCreatorProps>) {
  return popover.find(Select);
}

function selectFilterKey(
  wrapper: ReactWrapper<FilterCreatorProps>,
  filterKey: string,
) {
  trigger(wrapper.find(Select), 'onChange', filterKey);
}

function selectFilterValue(
  wrapper: ReactWrapper<FilterCreatorProps>,
  filterValue: string,
) {
  trigger(wrapper.find(FilterValueSelector), 'onChange', filterValue);
}

function clickAddFilter(wrapper: ReactWrapper<FilterCreatorProps>) {
  trigger(findByTestID(wrapper, 'FilterCreator-AddFilterButton'), 'onClick');
}
