import {Icon, Tooltip} from '@shopify/polaris';
import {mountWithAppContext} from 'tests/modern';

import type {TabOptionsList} from '../types';
import {Tabs} from '..';
import {Tab, CreateViewModal, TabMeasurer} from '../components';

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
    showNewTab: true,
  };

  it('passes the isActive prop to the Tab correctly', async () => {
    const wrapper = await mountWithAppContext(<Tabs {...defaultProps} />);

    await wrapper.act(async () => {
      wrapper.find(TabMeasurer)!.trigger('handleMeasurement', {
        hiddenTabWidths: [82, 160, 150],
        containerWidth: 500,
        disclosureWidth: 0,
      });
    });

    expect(wrapper!.find('ul')!.findAll(Tab)[0]!.prop('isActive')).toBe(true);
  });

  it('does not show a tooltip if disabled is false', async () => {
    const message = 'I am not disabled';
    const wrapper = await mountWithAppContext(
      <Tabs
        {...defaultProps}
        disabled={false}
        disabledTooltipMessage={message}
      />,
    );

    expect(wrapper).not.toContainReactComponent(Tooltip, {content: message});
  });

  it('does not show a tooltip if the tooltip message is undefined', async () => {
    const wrapper = await mountWithAppContext(
      <Tabs {...defaultProps} disabled disabledTooltipMessage={undefined} />,
    );

    expect(wrapper).not.toContainReactComponent(Tooltip, {content: undefined});
  });

  it('shows a tooltip if disabled is true and there is a message', async () => {
    const message = 'I am not disabled';
    const wrapper = await mountWithAppContext(
      <Tabs {...defaultProps} disabled disabledTooltipMessage={message} />,
    );

    expect(wrapper).toContainReactComponent(Tooltip);
  });

  describe('callback', () => {
    it('fires onSelect callback when Tab is clicked', async () => {
      const onSelect = jest.fn();
      const wrapper = await mountWithAppContext(
        <Tabs {...defaultProps} onSelect={onSelect} />,
      );

      await wrapper.act(async () => {
        wrapper.find(TabMeasurer)!.trigger('handleMeasurement', {
          hiddenTabWidths: [82, 160, 150],
          containerWidth: 500,
          disclosureWidth: 0,
        });
      });
      await wrapper.act(async () => {
        wrapper.find('ul')!.findAll(Tab)[0].trigger('onAction', 0);
      });

      expect(onSelect).toHaveBeenCalledWith(0);
    });
  });

  describe('newTab', () => {
    it('does not render the new tab Tab if showNewTab=false', async () => {
      const wrapper = await mountWithAppContext(
        <Tabs {...defaultProps} showNewTab={false} />,
      );

      expect(wrapper).not.toContainReactComponent(Tab, {
        name: defaultProps.newViewAccessibilityLabel,
      });
    });

    it('renders the new tab Tab if showNewTab=true', async () => {
      const wrapper = await mountWithAppContext(
        <Tabs {...defaultProps} showNewTab />,
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
      <Tabs
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
