import React from 'react';
import {mountWithApp} from 'tests/utilities';
import {matchMedia} from '@shopify/jest-dom-mocks';

import {Icon} from '../../Icon';
import type {TabOptionsList} from '../types';
import {Tabs} from '..';
import {Tab, CreateViewModal, TabMeasurer} from '../components';

describe('Tabs', () => {
  beforeEach(() => {
    matchMedia.mock();
  });

  afterEach(() => {
    matchMedia.restore();
  });

  const noop = () => {};
  const tabs = [
    {
      content: 'All',
      id: 'all',
      index: 0,
      onAction: noop,
    },
    {
      content: 'Unpaid',
      id: 'unpaid',
      index: 1,
      onAction: noop,
      permission: ['rename'] as TabOptionsList,
    },
    {
      content: 'Paid',
      id: 'paid',
      index: 2,
      onAction: noop,
      permissions: ['rename', 'duplicate'] as TabOptionsList,
    },
  ];
  const defaultProps = {
    tabs,
    onSelect: jest.fn(),
    selected: 0,
    newViewAccessibilityLabel: 'create a new label',
    onSaveNewViewModal: jest.fn(),
    viewNames: tabs.map(({content}) => content),
    showNewTab: true,
  };

  it('passes the isActive prop to the Tab correctly', () => {
    const wrapper = mountWithApp(<Tabs {...defaultProps} />);

    wrapper.act(() => {
      wrapper.find(TabMeasurer)!.trigger('handleMeasurement', {
        hiddenTabWidths: [82, 160, 150],
        containerWidth: 500,
        disclosureWidth: 0,
      });
    });

    expect(wrapper!.find('ul')!.findAll(Tab)[0]!.prop('isActive')).toBe(true);
  });

  describe('callback', () => {
    it('fires onSelect callback when Tab is clicked', () => {
      const onSelect = jest.fn();
      const wrapper = mountWithApp(
        <Tabs {...defaultProps} onSelect={onSelect} />,
      );

      wrapper.act(() => {
        wrapper.find(TabMeasurer)!.trigger('handleMeasurement', {
          hiddenTabWidths: [82, 160, 150],
          containerWidth: 500,
          disclosureWidth: 0,
        });
      });
      wrapper.act(() => {
        wrapper.find('ul')!.findAll(Tab)[0].trigger('onAction', 0);
      });

      expect(onSelect).toHaveBeenCalledWith(0);
    });
  });

  describe('newTab', () => {
    it('does not render the new tab Tab if showNewTab=false', () => {
      const wrapper = mountWithApp(
        <Tabs {...defaultProps} showNewTab={false} />,
      );

      expect(wrapper).not.toContainReactComponent(Tab, {
        content: defaultProps.newViewAccessibilityLabel,
      });
    });

    it('renders the new tab Tab if showNewTab=true', () => {
      const wrapper = mountWithApp(<Tabs {...defaultProps} showNewTab />);

      expect(wrapper).toContainReactComponent(Tab, {
        content: defaultProps.newViewAccessibilityLabel,
      });
      expect(wrapper).toContainReactComponent(Icon, {
        accessibilityLabel: defaultProps.newViewAccessibilityLabel,
      });
    });
  });

  it('onSaveNewViewModal gets called correctly', () => {
    const onSaveNewViewModal = jest.fn();
    const wrapper = mountWithApp(
      <Tabs
        {...defaultProps}
        showNewTab
        onSaveNewViewModal={onSaveNewViewModal}
      />,
    );
    wrapper.act(() => {
      wrapper
        .find(Tab, {
          content: defaultProps.newViewAccessibilityLabel,
        })
        ?.trigger('onAction');
    });

    expect(wrapper).toContainReactComponent(CreateViewModal, {
      open: true,
    });

    wrapper.act(() => {
      wrapper.find(CreateViewModal)!.trigger('onPrimaryAction', 'foo');
    });

    expect(onSaveNewViewModal).toHaveBeenCalledWith('foo');
  });
});
