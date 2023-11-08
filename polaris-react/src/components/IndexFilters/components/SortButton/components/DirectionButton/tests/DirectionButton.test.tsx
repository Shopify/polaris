import React from 'react';
import {ArrowUpMinor, ArrowDownMinor} from '@shopify/polaris-icons';
import {mountWithApp} from 'tests/utilities';

import {UnstyledButton} from '../../../../../../UnstyledButton';
import {Icon} from '../../../../../../Icon';
import {DirectionButton} from '..';
import type {DirectionButtonProps} from '../DirectionButton';

describe('DirectionButton', () => {
  it('renders asc <DirectionButton />', () => {
    const props: DirectionButtonProps = {
      direction: 'asc',
      children: 'Foo',
      active: false,
      value: 'order_number asc',
      onClick: () => {},
    };
    const wrapper = mountWithApp(<DirectionButton {...props} />);

    expect(wrapper).toContainReactComponent(Icon, {
      source: ArrowUpMinor,
    });
  });

  it('renders desc <DirectionButton />', () => {
    const props: DirectionButtonProps = {
      direction: 'desc',
      children: 'Foo',
      active: false,
      value: 'order_number desc',
      onClick: () => {},
    };
    const wrapper = mountWithApp(<DirectionButton {...props} />);

    expect(wrapper).toContainReactComponent(Icon, {
      source: ArrowDownMinor,
    });
  });

  it('renders active <DirectionButton />', () => {
    const props: DirectionButtonProps = {
      direction: 'asc',
      children: 'Foo',
      active: true,
      value: 'order_number asc',
      onClick: () => {},
    };
    const wrapper = mountWithApp(<DirectionButton {...props} />);

    expect(wrapper).toContainReactComponent(Icon, {
      source: ArrowUpMinor,
    });
  });

  describe('callbacks', () => {
    it('fires an onClick callback', () => {
      const props: DirectionButtonProps = {
        direction: 'asc',
        children: 'Foo',
        active: true,
        value: 'order_number asc',
        onClick: jest.fn(),
      };
      const wrapper = mountWithApp(<DirectionButton {...props} />);

      wrapper.act(() => {
        wrapper!.find(UnstyledButton)!.trigger('onClick');
      });

      expect(props.onClick).toHaveBeenCalledWith([props.value]);
    });
  });
});
