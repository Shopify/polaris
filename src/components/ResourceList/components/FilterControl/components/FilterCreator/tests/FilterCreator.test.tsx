import React from 'react';
import {mountWithApp} from 'test-utilities';
import type {CustomRoot} from '@shopify/react-testing';
import {Button, Select, Popover, Form} from 'components';

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
    const filterCreator = mountWithApp(
      <FilterCreator {...mockDefaultProps} onAddFilter={() => {}} />,
    );

    filterCreator
      .find(Select)!
      .trigger('onChange', mockDefaultProps.filters[0].key);

    const activator = filterCreator.find(Button, {children: 'Filter'})!;
    const activatorButton = activator.find('button')!;

    // This any cast is needed as the activator's onFocus actually uses the
    // event argument that gets passed into the onFocus handler, though we type
    // onFocus as accepting no arguments
    (activator as any).trigger('onFocus', {
      target: activatorButton.domNode,
    });
    filterCreator.find(FilterValueSelector)!.trigger('onChange', 'x');

    filterCreator.find(Button, {children: 'Add filter'})!.trigger('onClick');

    expect(document.activeElement).toBe(activatorButton.domNode);
  });

  it('does not focus the activator after adding a filter if focus was never originally received by the by activator', () => {
    const filterCreator = mountWithApp(
      <FilterCreator {...mockDefaultProps} onAddFilter={() => {}} />,
    );

    filterCreator
      .find(Select)!
      .trigger('onChange', mockDefaultProps.filters[0].key);

    const activator = filterCreator.find(Button, {children: 'Filter'})!;

    // This any cast is needed as the activator's onFocus actually uses the
    // event argument that gets passed into the onFocus handler, though we type
    // onFocus as accepting no arguments
    (activator as any).trigger('onFocus', {target: activator!.domNode});

    filterCreator.find(Button, {children: 'Add filter'})!.trigger('onClick');

    expect(document.activeElement).not.toBe(activator.domNode);
  });

  it('renders just a button by default', () => {
    const wrapper = mountWithApp(<FilterCreator {...mockDefaultProps} />);

    expect(wrapper).toContainReactComponentTimes(Button, 1);
    expect(wrapper).toContainReactComponent(Button, {disclosure: true});
    // expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('renders a non-active popover on default', () => {
    const wrapper = mountWithApp(<FilterCreator {...mockDefaultProps} />);

    expect(wrapper).toContainReactComponent(Popover, {active: false});
  });

  it('renders a active popover with a Select on click of the activator button', () => {
    const wrapper = mountWithApp(<FilterCreator {...mockDefaultProps} />);

    activatePopover(wrapper);

    expect(wrapper).toContainReactComponent(Popover, {active: true});
    // expect(findFilterKeySelect(wrapper).exists()).toBe(true);

    expect(wrapper.find(Popover)).toContainReactComponent(Select);
  });

  it('renders a non-active popover after add filter button was clicked and onAddFilter was triggered', () => {
    const onAddFilter = jest.fn();
    const wrapper = mountWithApp(
      <FilterCreator {...mockDefaultProps} onAddFilter={onAddFilter} />,
    );

    activatePopover(wrapper);
    selectFilterKey(wrapper, mockDefaultProps.filters[0].key);
    selectFilterValue(wrapper, 'Bundle');
    clickAddFilter(wrapper);

    expect(onAddFilter).toHaveBeenCalled();
    expect(wrapper).toContainReactComponent(Popover, {active: false});
  });

  it('does not render FilterValueSelector after add filter button was clicked', () => {
    const onAddFilter = jest.fn();
    const wrapper = mountWithApp(
      <FilterCreator {...mockDefaultProps} onAddFilter={onAddFilter} />,
    );

    activatePopover(wrapper);
    selectFilterKey(wrapper, mockDefaultProps.filters[0].key);
    selectFilterValue(wrapper, 'Bundle');

    expect(wrapper).toContainReactComponent(FilterValueSelector);
    clickAddFilter(wrapper);
    expect(wrapper).not.toContainReactComponent(FilterValueSelector);
  });

  it('renders Select with no value after add filter button was clicked', () => {
    const onAddFilter = jest.fn();
    const wrapper = mountWithApp(
      <FilterCreator {...mockDefaultProps} onAddFilter={onAddFilter} />,
    );

    activatePopover(wrapper);
    selectFilterKey(wrapper, mockDefaultProps.filters[0].key);
    selectFilterValue(wrapper, 'Bundle');
    const select = wrapper.findAll(Select)[0];
    expect(select.prop('value')).toBeDefined();
    clickAddFilter(wrapper);
    expect(wrapper).toContainReactComponent(Select, {value: undefined});
  });

  describe('filters', () => {
    it('sets the options when popover is active', () => {
      const wrapper = mountWithApp(<FilterCreator {...mockDefaultProps} />);

      activatePopover(wrapper);
      expect(wrapper.find(Popover)).toContainReactComponent(Select, {
        options: [
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
        ],
      });
    });
  });

  describe('<FilterValueSelector />', () => {
    it('does not render by default', () => {
      const wrapper = mountWithApp(<FilterCreator {...mockDefaultProps} />);

      activatePopover(wrapper);

      expect(wrapper).not.toContainReactComponent(FilterValueSelector);
    });

    it('updates FilterValueSelector when user selects a filter key', () => {
      const wrapper = mountWithApp(<FilterCreator {...mockDefaultProps} />);

      activatePopover(wrapper);
      selectFilterKey(wrapper, mockDefaultProps.filters[1].key);

      expect(wrapper).toContainReactComponent(FilterValueSelector, {
        filter: mockDefaultProps.filters[1],
        value: undefined,
      });
    });

    it('updates value with provided string when user selects a filter value', () => {
      const wrapper = mountWithApp(<FilterCreator {...mockDefaultProps} />);

      activatePopover(wrapper);
      selectFilterKey(wrapper, mockDefaultProps.filters[0].key);
      selectFilterValue(wrapper, 'Bundle');

      expect(wrapper).toContainReactComponent(FilterValueSelector, {
        value: 'Bundle',
      });
    });

    it('updates FilterValueSelector when filter key is updated to existing operator key', () => {
      const wrapper = mountWithApp(<FilterCreator {...mockDefaultProps} />);

      const newOperatorKey = 'times_used_max';

      activatePopover(wrapper);
      selectFilterKey(wrapper, mockDefaultProps.filters[2].key);
      selectFilterValue(wrapper, 'Bundle');

      wrapper
        .find(FilterValueSelector)!
        .trigger('onFilterKeyChange', newOperatorKey);

      expect(wrapper).toContainReactComponent(FilterValueSelector, {
        filterKey: newOperatorKey,
      });
    });
  });

  describe('filter add button', () => {
    it('is enabled when filter key and filter value are both selected', () => {
      const wrapper = mountWithApp(<FilterCreator {...mockDefaultProps} />);

      activatePopover(wrapper);
      selectFilterKey(wrapper, mockDefaultProps.filters[0].key);
      selectFilterValue(wrapper, 'Bundle');

      expect(wrapper.find(Form)).toContainReactComponent(Button, {
        disabled: false,
      });
    });

    it('is disabled when filter key and value are not selected', () => {
      const wrapper = mountWithApp(<FilterCreator {...mockDefaultProps} />);

      activatePopover(wrapper);
      selectFilterKey(wrapper, mockDefaultProps.filters[0].key);

      expect(wrapper.find(Form)).toContainReactComponent(Button, {
        disabled: true,
      });
    });

    it('is disabled when filter value is an empty string', () => {
      const wrapper = mountWithApp(<FilterCreator {...mockDefaultProps} />);

      activatePopover(wrapper);
      selectFilterKey(wrapper, mockDefaultProps.filters[0].key);
      selectFilterValue(wrapper, '');

      expect(wrapper.find(Form)).toContainReactComponent(Button, {
        disabled: true,
      });
    });
  });

  describe('onAddFilter', () => {
    it('gets call with selected filter key & value when both value are valid and add filter button was clicked', () => {
      const onAddFilter = jest.fn();
      const wrapper = mountWithApp(
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

function activatePopover(wrapper: CustomRoot<any, any>) {
  wrapper.find(Button, {disclosure: true})!.trigger('onClick');
}

function selectFilterKey(wrapper: CustomRoot<any, any>, filterKey: string) {
  wrapper.find(Select)!.trigger('onChange', filterKey);
}

function selectFilterValue(wrapper: CustomRoot<any, any>, filterValue: string) {
  wrapper.find(FilterValueSelector)!.trigger('onChange', filterValue);
}

function clickAddFilter(wrapper: CustomRoot<any, any>) {
  wrapper.find(Form)?.find(Button)!.trigger('onClick');
}
