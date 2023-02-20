import {Icon} from '@shopify/polaris';
import {mockI18n} from '@shopify/react-i18n-next';

import {mountWithAppContext} from 'tests/modern';

import type {TabOptionsList} from '../../../types';
import {SmallScreenTabs} from '..';
import {Tab, CreateViewModal} from '../..';
import Translations from '../../../translations/en.json';

const i18n = mockI18n([Translations]);

describe('Tabs', () => {
  const noop = () => {};
  const items = [
    {
      name: 'All',
      id: 'all',
      index: 0,
      onAction: noop,
    },
    {
      name: 'Unpaid',
      id: 'unpaid',
      index: 1,
      onAction: noop,
      permission: ['rename'] as TabOptionsList,
    },
    {
      name: 'Paid',
      id: 'paid',
      index: 2,
      onAction: noop,
      permissions: ['rename', 'duplicate'] as TabOptionsList,
    },
  ];
  const defaultProps = {
    items,
    onSelect: jest.fn(),
    selected: 0,
    newViewAccessibilityLabel: 'create a new label',
    onSaveNewViewModal: jest.fn(),
    viewNames: items.map(({name}) => name),
    i18n,
  };

  it('passes the isActive prop to the Tab correctly', async () => {
    const wrapper = await mountWithAppContext(
      <SmallScreenTabs {...defaultProps} />,
    );

    expect(wrapper!.find('ul')!.findAll(Tab)[0]!.prop('isActive')).toBe(true);
  });

  describe('callback', () => {
    it('fires onSelect callback when Tab is clicked', async () => {
      const onSelect = jest.fn();
      const wrapper = await mountWithAppContext(
        <SmallScreenTabs {...defaultProps} onSelect={onSelect} />,
      );

      await wrapper.act(async () => {
        wrapper.find('ul')!.findAll(Tab)[0].trigger('onAction', 0);
      });

      expect(onSelect).toHaveBeenCalledWith(0);
    });
  });

  describe('newTab', () => {
    it('does not render the new tab Tab if showNewTab=false', async () => {
      const wrapper = await mountWithAppContext(
        <SmallScreenTabs {...defaultProps} showNewTab={false} />,
      );

      expect(wrapper).not.toContainReactComponent(Tab, {
        name: defaultProps.newViewAccessibilityLabel,
      });
    });

    it('renders the new tab Tab if showNewTab=true', async () => {
      const wrapper = await mountWithAppContext(
        <SmallScreenTabs {...defaultProps} showNewTab />,
      );

      expect(wrapper).toContainReactComponent(Tab, {
        name: defaultProps.newViewAccessibilityLabel,
      });
      expect(wrapper).toContainReactComponent(Icon, {
        accessibilityLabel: defaultProps.newViewAccessibilityLabel,
      });
    });
  });

  it('onSaveNewViewModal gets called correctly', async () => {
    const onSaveNewViewModal = jest.fn();
    const wrapper = await mountWithAppContext(
      <SmallScreenTabs
        {...defaultProps}
        showNewTab
        onSaveNewViewModal={onSaveNewViewModal}
      />,
    );
    await wrapper.act(async () => {
      wrapper
        .find(Tab, {
          name: defaultProps.newViewAccessibilityLabel,
        })
        ?.trigger('onAction');
    });

    expect(wrapper).toContainReactComponent(CreateViewModal, {
      open: true,
    });

    await wrapper.act(async () => {
      wrapper.find(CreateViewModal)!.trigger('onPrimaryAction', 'foo');
    });

    expect(onSaveNewViewModal).toHaveBeenCalledWith('foo');
  });
});
