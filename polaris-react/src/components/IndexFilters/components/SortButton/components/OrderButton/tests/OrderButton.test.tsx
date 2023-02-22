import React from 'react';
import {ArrowUpMinor, ArrowDownMinor} from '@shopify/polaris-icons';
import {mountWithApp} from 'tests/utilities';

import {UnstyledButton} from '../../../../../../UnstyledButton';
import {Icon} from '../../../../../../Icon';
import {OrderButton} from '..';
import type {OrderButtonProps} from '../OrderButton';

describe('OrderButton', () => {
  it('renders asc <OrderButton />', () => {
    const props: OrderButtonProps = {
      direction: 'asc',
      children: 'Foo',
      active: false,
      value: 'order_number asc',
      onClick: () => {},
    };
    const wrapper = mountWithApp(<OrderButton {...props} />);

    expect(wrapper).toContainReactComponent(Icon, {
      source: ArrowUpMinor,
      color: 'base',
    });
  });

  it('renders desc <OrderButton />', () => {
    const props: OrderButtonProps = {
      direction: 'desc',
      children: 'Foo',
      active: false,
      value: 'order_number desc',
      onClick: () => {},
    };
    const wrapper = mountWithApp(<OrderButton {...props} />);

    expect(wrapper).toContainReactComponent(Icon, {
      source: ArrowDownMinor,
      color: 'base',
    });
  });

  it('renders active <OrderButton />', () => {
    const props: OrderButtonProps = {
      direction: 'asc',
      children: 'Foo',
      active: true,
      value: 'order_number asc',
      onClick: () => {},
    };
    const wrapper = mountWithApp(<OrderButton {...props} />);

    expect(wrapper).toContainReactComponent(Icon, {
      source: ArrowUpMinor,
      color: 'interactive',
    });
  });

  describe('callbacks', () => {
    it('fires an onClick callback', () => {
      const props: OrderButtonProps = {
        direction: 'asc',
        children: 'Foo',
        active: true,
        value: 'order_number asc',
        onClick: jest.fn(),
      };
      const wrapper = mountWithApp(<OrderButton {...props} />);

      wrapper.act(() => {
        wrapper!.find(UnstyledButton)!.trigger('onClick');
      });

      expect(props.onClick).toHaveBeenCalledWith([props.value]);
    });
  });
});
