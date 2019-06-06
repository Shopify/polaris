import * as React from 'react';
import {ReactWrapper} from 'enzyme';
import {HorizontalDotsMinor} from '@shopify/polaris-icons';
import {mountWithAppProvider, trigger} from 'test-utilities';

import {Button, Popover} from 'components';

// eslint-disable-next-line shopify/strict-component-boundaries
import {
  Item as ActionListItem,
  Section as ActionListSection,
} from '../../ActionList/components';

import RollupActions, {Props} from '../RollupActions';

type Wrapper = ReactWrapper<Props, any>;

describe('<RollupActions />', () => {
  const mockProps: Props = {
    secondaryActions: undefined,
    actionGroups: undefined,
  };

  it('does not render without either `secondaryActions` or `actionGroups`', () => {
    const wrapper = mountWithAppProvider(<RollupActions {...mockProps} />);

    expect(wrapper.find(Popover).exists()).toBe(false);
  });

  describe('secondaryActions', () => {
    it('get rendered as ActionList > Item', () => {
      const secondaryActions: Props['secondaryActions'] = [
        {
          content: 'mock content 1',
          url: 'https://www.google.com',
        },
        {
          content: 'mock content 2',
          url: 'https://www.shopify.ca',
        },
      ];
      const wrapper = mountWithAppProvider(
        <RollupActions {...mockProps} secondaryActions={secondaryActions} />,
      );

      activatePopover(wrapper);

      expect(wrapper.find(ActionListItem)).toHaveLength(
        secondaryActions.length,
      );
    });
  });

  describe('actionGroups', () => {
    it('get rendered as ActionList > Section', () => {
      const actionGroups: Props['actionGroups'] = [
        {
          title: 'mock title 1',
          actions: [
            {
              content: 'mock content 1',
            },
          ],
        },
        {
          title: 'mock title 2',
          actions: [
            {
              content: 'mock content 2',
            },
          ],
        },
      ];

      const wrapper = mountWithAppProvider(
        <RollupActions {...mockProps} actionGroups={actionGroups} />,
      );

      activatePopover(wrapper);

      expect(wrapper.find(ActionListSection)).toHaveLength(actionGroups.length);
    });
  });
});

function findPopoverActivator(wrapper: Wrapper) {
  return wrapper
    .find(Button)
    .filterWhere((button) => button.prop('icon') === HorizontalDotsMinor);
}

function activatePopover(wrapper: Wrapper) {
  const activator = findPopoverActivator(wrapper);
  trigger(activator, 'onClick');
}
