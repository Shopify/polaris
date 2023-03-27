import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {ChoiceList} from '../../../../ChoiceList';
import {Popover} from '../../../../Popover';
import {UnstyledButton} from '../../../../UnstyledButton';
import type {SortButtonChoice} from '../../../types';
import {SortButton} from '..';
import type {SortButtonProps} from '../SortButton';
import {DirectionButton} from '../components';
import {FilterButton} from '../..';

describe('SortButton', () => {
  const choices: SortButtonChoice[] = [
    {
      label: 'Order number',
      value: 'order-number asc',
      directionLabel: 'Ascending',
    },
    {
      label: 'Order number',
      value: 'order-number desc',
      directionLabel: 'Descending',
    },
    {label: 'Customer name', value: 'customer-name asc', directionLabel: 'A-Z'},
    {
      label: 'Customer name',
      value: 'customer-name desc',
      directionLabel: 'Z-A',
    },
    {label: 'Date', value: 'date asc', directionLabel: 'A-Z'},
    {label: 'Date', value: 'date desc', directionLabel: 'Z-A'},
    {
      label: 'Payment status',
      value: 'payment-status asc',
      directionLabel: 'Ascending',
    },
    {
      label: 'Payment status',
      value: 'payment-status desc',
      directionLabel: 'Descending',
    },
    {
      label: 'Fulfillment status',
      value: 'fulfillment-status asc',
      directionLabel: 'A-Z',
    },
    {
      label: 'Fulfillment status',
      value: 'fulfillment-status desc',
      directionLabel: 'Z-A',
    },
    {label: 'Total', value: 'total asc', directionLabel: 'Ascending'},
    {label: 'Total', value: 'total desc', directionLabel: 'Descending'},
  ];

  it('shows the popover on click and hides it on click again', () => {
    const props: SortButtonProps = {
      onChange: jest.fn(),
      choices,
      selected: ['order-number asc'],
    };
    const wrapper = mountWithApp(<SortButton {...props} />);

    wrapper.act(() => {
      wrapper.find(FilterButton)!.trigger('onClick');
    });

    expect(wrapper).toContainReactComponent(Popover, {
      active: true,
    });

    wrapper.act(() => {
      wrapper.find(FilterButton)!.trigger('onClick');
    });

    expect(wrapper).toContainReactComponent(Popover, {
      active: false,
    });
  });

  it('fires the onChange handler when the ChoiceList changes', () => {
    const props: SortButtonProps = {
      onChange: jest.fn(),
      choices,
      selected: ['order-number asc'],
    };
    const wrapper = mountWithApp(<SortButton {...props} />);

    wrapper.act(() => {
      wrapper.find(FilterButton)!.trigger('onClick');
    });

    wrapper.act(() => {
      wrapper.find(ChoiceList)!.trigger('onChange', ['customer-name asc']);
    });

    expect(props.onChange).toHaveBeenCalledWith(['customer-name asc']);
  });

  it('selects ascending', () => {
    const props: SortButtonProps = {
      onChange: jest.fn(),
      choices,
      selected: ['order-number asc'],
    };
    const wrapper = mountWithApp(<SortButton {...props} />);

    wrapper.act(() => {
      wrapper.find(FilterButton)!.trigger('onClick');
    });

    expect(wrapper).toContainReactComponent(DirectionButton, {
      direction: 'asc',
      active: true,
    });
  });

  it('selects descending', () => {
    const props: SortButtonProps = {
      onChange: jest.fn(),
      choices,
      selected: ['order-number desc'],
    };
    const wrapper = mountWithApp(<SortButton {...props} />);

    wrapper.act(() => {
      wrapper.find(FilterButton)!.trigger('onClick');
    });

    expect(wrapper).toContainReactComponent(DirectionButton, {
      direction: 'desc',
      active: true,
    });
  });

  it('invokes onChange when clicking the ascending button', () => {
    const props: SortButtonProps = {
      onChange: jest.fn(),
      choices,
      selected: ['order-number desc'],
    };
    const wrapper = mountWithApp(<SortButton {...props} />);

    wrapper.act(() => {
      wrapper.find(FilterButton)!.trigger('onClick');
    });

    wrapper.act(() => {
      wrapper
        .find(DirectionButton, {direction: 'asc'})!
        .find(UnstyledButton)!
        .trigger('onClick');
    });

    expect(props.onChange).toHaveBeenCalledWith(['order-number asc']);
  });

  it('invokes onChange when clicking the descending button', () => {
    const props: SortButtonProps = {
      onChange: jest.fn(),
      choices,
      selected: ['order-number asc'],
    };
    const wrapper = mountWithApp(<SortButton {...props} />);

    wrapper.act(() => {
      wrapper.find(FilterButton)!.trigger('onClick');
    });

    wrapper.act(() => {
      wrapper
        .find(DirectionButton, {direction: 'desc'})!
        .find(UnstyledButton)!
        .trigger('onClick');
    });

    expect(props.onChange).toHaveBeenCalledWith(['order-number desc']);
  });
});
