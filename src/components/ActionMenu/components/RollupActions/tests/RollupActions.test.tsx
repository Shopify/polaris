import React from 'react';
import {HorizontalDotsMinor} from '@shopify/polaris-icons';
import {mountWithApp} from 'test-utilities';
import {Button, Popover} from 'components';

// eslint-disable-next-line @shopify/strict-component-boundaries
import {
  Item as ActionListItem,
  Section as ActionListSection,
} from '../../../../ActionList/components';
import {RollupActions} from '../RollupActions';

describe('<RollupActions />', () => {
  const mockProps = {
    items: undefined,
    sections: undefined,
  };

  it('does not render without either `items` or `sections`', () => {
    const wrapper = mountWithApp(<RollupActions {...mockProps} />);

    expect(wrapper).not.toContainReactComponent(Popover);
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
      const wrapper = mountWithApp(
        <RollupActions {...mockProps} items={mockItems} />,
      );

      wrapper.find(Button, {icon: HorizontalDotsMinor})!.trigger('onClick');

      expect(wrapper.findAll(ActionListItem)).toHaveLength(mockItems.length);
    });

    it('<ActionList /> closes the <Popover /> when `onActionAnyItem` is called', () => {
      const wrapper = mountWithApp(
        <RollupActions {...mockProps} items={mockItems} />,
      );

      wrapper.find(Button, {icon: HorizontalDotsMinor})!.trigger('onClick');

      let popoverComponent = wrapper.find(Popover);
      expect(popoverComponent!).toHaveReactProps({
        active: true,
      });

      const firstActionListItem = wrapper.findAll(ActionListItem)[0];
      firstActionListItem.trigger('onAction');

      popoverComponent = wrapper.find(Popover);
      expect(popoverComponent!).toHaveReactProps({
        active: false,
      });
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
      const wrapper = mountWithApp(
        <RollupActions {...mockProps} sections={mockSections} />,
      );

      wrapper.find(Button, {icon: HorizontalDotsMinor})!.trigger('onClick');

      expect(wrapper.findAll(ActionListSection)).toHaveLength(
        mockSections.length,
      );
    });
  });
});
