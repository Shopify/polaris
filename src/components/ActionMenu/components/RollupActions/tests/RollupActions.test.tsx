import React from 'react';
import {HorizontalDotsMinor} from '@shopify/polaris-icons';
// eslint-disable-next-line no-restricted-imports
import {
  mountWithAppProvider,
  trigger,
  ReactWrapper,
} from 'test-utilities/legacy';
import {Button, Popover} from 'components';

// eslint-disable-next-line @shopify/strict-component-boundaries
import {
  Item as ActionListItem,
  Section as ActionListSection,
} from '../../../../ActionList/components';
import {RollupActions, RollupActionsProps} from '../RollupActions';

describe('<RollupActions />', () => {
  const mockProps = {
    items: undefined,
    sections: undefined,
  };

  it('does not render without either `items` or `sections`', () => {
    const wrapper = mountWithAppProvider(<RollupActions {...mockProps} />);

    expect(wrapper.find(Popover).exists()).toBe(false);
  });

  describe('items', () => {
    const mockItems = [
      {
        content: 'mock content 1',
        url: 'https://www.google.com',
      },
      {
        content: 'mock content 2',
        url: 'https://www.shopify.ca',
      },
    ];

    it('gets rendered as ActionList > Item', () => {
      const wrapper = mountWithAppProvider(
        <RollupActions {...mockProps} items={mockItems} />,
      );

      activatePopover(wrapper);

      expect(wrapper.find(ActionListItem)).toHaveLength(mockItems.length);
    });

    it('<ActionList /> closes the <Popover /> when `onActionAnyItem` is called', () => {
      const wrapper = mountWithAppProvider(
        <RollupActions {...mockProps} items={mockItems} />,
      );

      activatePopover(wrapper);

      let popoverComponent = wrapper.find(Popover);
      expect(popoverComponent.prop('active')).toBe(true);

      const firstActionListItem = wrapper.find(ActionListItem).first();
      trigger(firstActionListItem, 'onAction');

      popoverComponent = wrapper.find(Popover);
      expect(popoverComponent.prop('active')).toBe(false);
    });
  });

  describe('sections', () => {
    const mockSections = [
      {
        title: 'mock title 1',
        items: [
          {
            content: 'mock content 1',
          },
        ],
      },
      {
        title: 'mock title 2',
        items: [
          {
            content: 'mock content 2',
          },
        ],
      },
    ];

    it('gets rendered as ActionList > Section', () => {
      const wrapper = mountWithAppProvider(
        <RollupActions {...mockProps} sections={mockSections} />,
      );

      activatePopover(wrapper);

      expect(wrapper.find(ActionListSection)).toHaveLength(mockSections.length);
    });
  });
});

function findPopoverActivator(wrapper: ReactWrapper<RollupActionsProps>) {
  return wrapper
    .find(Button)
    .filterWhere((button) => button.prop('icon') === HorizontalDotsMinor);
}

function activatePopover(wrapper: ReactWrapper<RollupActionsProps>) {
  const activator = findPopoverActivator(wrapper);
  trigger(activator, 'onClick');
}
