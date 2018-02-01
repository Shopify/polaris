import * as React from 'react';
import {shallow, mount, ReactWrapper} from 'enzyme';
import {
  trigger,
  findByTestID,
} from '../../../../../../tests/utilities';

import FilterCreator, {Props} from '../FilterCreator';
import FilterValueSelector from '../FilterValueSelector';
import {FilterType} from '../types';
import {
  Button,
  Select,
  Popover,
} from '../../../../';

describe('<FilterCreator />', () => {
  const mockDefaultProps: Props = {
    filters: [
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
        label: 'Tagged with',
        type: FilterType.TextField,
      },
    ],
    resourceName: {
      singular: 'Item',
      plural: 'Items',
    },
  };

  it('renders just a button by default', () => {
    const wrapper = mount(
      <FilterCreator {...mockDefaultProps} />,
    );

    expect(findByTestID(wrapper, 'FilterCreator-FilterActivator').exists())
      .toBe(true);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Select).exists()).toBe(false);
  });

  it('renders a non-active popover on default', () => {
    const wrapper = shallow(
      <FilterCreator {...mockDefaultProps} />,
    );

    expect(wrapper.find(Popover).prop('active')).toBe(false);
  });

  it('renders a active popover with a Select on click of the activator button', () => {
    const wrapper = mount(
      <FilterCreator {...mockDefaultProps} />,
    );

    activatePopover(wrapper);

    expect(wrapper.find(Popover).prop('active')).toBe(true);
    expect(findFilterKeySelect(wrapper).exists()).toBe(true);
  });

  it('renders a non-active popover after add filter button was clicked and onAddFilter was triggered', () => {
    const onAddFilter = jest.fn();
    const wrapper = mount(
      <FilterCreator
        {...mockDefaultProps}
        onAddFilter={onAddFilter}
      />,
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
    const wrapper = mount(
      <FilterCreator
        {...mockDefaultProps}
        onAddFilter={onAddFilter}
      />,
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
    const wrapper = mount(
      <FilterCreator
        {...mockDefaultProps}
        onAddFilter={onAddFilter}
      />,
    );

    activatePopover(wrapper);
    selectFilterKey(wrapper, mockDefaultProps.filters[0].key);
    selectFilterValue(wrapper, 'Bundle');

    expect(wrapper.find(Select).at(0).prop('value')).toBeDefined();
    clickAddFilter(wrapper);
    expect(wrapper.find(Select).at(0).prop('value')).toBeUndefined();
  });

  describe('filters', () => {
    it('has the correct options prop when popover is active', () => {
      const wrapper = mount(
        <FilterCreator {...mockDefaultProps} />,
      );

      activatePopover(wrapper);

      expect(findFilterKeySelect(wrapper).prop('options')).toMatchObject([
        {value: mockDefaultProps.filters[0].key, label: mockDefaultProps.filters[0].label},
        {value: mockDefaultProps.filters[1].key, label: mockDefaultProps.filters[1].label},
      ]);
    });
  });

  describe('<FilterValueSelector />', () => {
    it('does not render by default', () => {
      const wrapper = mount(
        <FilterCreator {...mockDefaultProps} />,
      );

      activatePopover(wrapper);

      expect(wrapper.find(FilterValueSelector).exists())
        .toBe(false);
    });

    it('updates FilterValueSelector when user select a filter key', () => {
      const wrapper = mount(
        <FilterCreator {...mockDefaultProps} />,
      );

      activatePopover(wrapper);
      selectFilterKey(wrapper, mockDefaultProps.filters[0].key);

      expect(wrapper.find(FilterValueSelector).prop('filter'))
        .toMatchObject(mockDefaultProps.filters[0]);
      expect(wrapper.find(FilterValueSelector).prop('value'))
        .toBeUndefined();
    });

    it('updates value correctly when user select a filter value', () => {
      const wrapper = mount(
        <FilterCreator {...mockDefaultProps} />,
      );

      activatePopover(wrapper);
      selectFilterKey(wrapper, mockDefaultProps.filters[0].key);
      selectFilterValue(wrapper, 'Bundle');

      expect(wrapper.find(FilterValueSelector).prop('value'))
        .toBe('Bundle');
    });
  });

  describe('filter add button', () => {
    it('is enabled when filter key and filter value are both selected', () => {
      const wrapper = mount(
        <FilterCreator {...mockDefaultProps} />,
      );

      activatePopover(wrapper);
      selectFilterKey(wrapper, mockDefaultProps.filters[0].key);
      selectFilterValue(wrapper, 'Bundle');

      expect(
        findByTestID(
          wrapper,
          'FilterCreator-AddFilterButton',
        ).prop('disabled'),
      ).toBe(false);
    });

    it('is disabled when filter key and value are not selected', () => {
      const wrapper = mount(
        <FilterCreator {...mockDefaultProps} />,
      );

      activatePopover(wrapper);
      selectFilterKey(wrapper, mockDefaultProps.filters[0].key);

      expect(
        findByTestID(
          wrapper,
          'FilterCreator-AddFilterButton',
        ).prop('disabled'),
      ).toBe(true);
    });

    it('is disabled when filter value is an empty string', () => {
      const wrapper = mount(
        <FilterCreator {...mockDefaultProps} />,
      );

      activatePopover(wrapper);
      selectFilterKey(wrapper, mockDefaultProps.filters[0].key);
      selectFilterValue(wrapper, '');

      expect(
        findByTestID(
          wrapper,
          'FilterCreator-AddFilterButton',
        ).prop('disabled'),
      ).toBe(true);
    });

  });

  describe('onAddFilter', () => {
    it('gets call with selected filter key & value when both value are valid and add filter button was clicked', () => {
      const onAddFilter = jest.fn();
      const wrapper = mount(
        <FilterCreator
          {...mockDefaultProps}
          onAddFilter={onAddFilter}
        />,
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

function activatePopover(wrapper: ReactWrapper<Props, any>) {
  trigger(
    findByTestID(
      wrapper,
      'FilterCreator-FilterActivator',
    ),
    'onClick',
  );
}

function findFilterKeySelect(popover: ReactWrapper<Props, any>) {
  return popover.find(Select);
}

function selectFilterKey(
  wrapper: ReactWrapper<Props, any>,
  filterKey: string,
) {
  trigger(wrapper.find(Select), 'onChange', filterKey);
}

function selectFilterValue(
  wrapper: ReactWrapper<Props, any>,
  filterValue: string,
) {
  trigger(
    wrapper.find(FilterValueSelector),
    'onChange',
    filterValue,
  );
}

function clickAddFilter(wrapper: ReactWrapper<Props, any>) {
  trigger(
    findByTestID(
      wrapper,
      'FilterCreator-AddFilterButton',
    ),
    'onClick',
  );
}
