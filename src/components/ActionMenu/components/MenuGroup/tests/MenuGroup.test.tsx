import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {
  mountWithAppProvider,
  trigger,
  ReactWrapper,
} from 'test-utilities/legacy';
import {Popover, ActionList, Button} from 'components';

import {MenuGroup} from '../MenuGroup';

describe('<MenuGroup />', () => {
  const mockProps = {
    title: 'title',
    actions: [{content: 'mock content 1'}],
    active: undefined,
    onOpen: noop,
    onClose: noop,
  };

  describe('<Popover />', () => {
    it('passes `details`', () => {
      const mockDetails = 'mock details';
      const wrapper = mountWithAppProvider(
        <MenuGroup {...mockProps} details={mockDetails} />,
      );
      const popoverContents = getPopoverContents(wrapper);

      expect(popoverContents.text()).toContain(mockDetails);
    });

    it('passes `active`', () => {
      const wrapper = mountWithAppProvider(<MenuGroup {...mockProps} active />);

      expect(wrapper.find(Popover).prop('active')).toBeTruthy();
    });

    it('passes `actions` into the <ActionList />', () => {
      const mockActions = [
        {content: 'mock content 1'},
        {content: 'mock content 2'},
      ];
      const wrapper = mountWithAppProvider(
        <MenuGroup {...mockProps} actions={mockActions} />,
      );
      const popoverContents = getPopoverContents(wrapper);

      expect(popoverContents.find(ActionList).prop('items')).toStrictEqual(
        mockActions,
      );
    });

    it('triggers `onClose` after the <Popover /> closes', () => {
      const onCloseSpy = jest.fn();
      const wrapper = mountWithAppProvider(
        <MenuGroup {...mockProps} onClose={onCloseSpy} />,
      );

      trigger(wrapper.find(Popover), 'onClose');

      expect(onCloseSpy).toHaveBeenCalledTimes(1);
    });

    it('triggers `onClose` after an action', () => {
      const mockTitle = 'mock title';
      const onCloseSpy = jest.fn();
      const wrapper = mountWithAppProvider(
        <MenuGroup
          {...mockProps}
          title={mockTitle}
          active
          onClose={onCloseSpy}
        />,
      );

      trigger(wrapper.find(ActionList), 'onActionAnyItem');

      expect(onCloseSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('uses Button instead as subcomponents', () => {
    const wrapper = mountWithAppProvider(<MenuGroup {...mockProps} />);

    expect(wrapper.find(Button)).toHaveLength(1);
  });
});

function noop() {}

function getPopoverContents(menuGroup: ReactWrapper) {
  return mountWithAppProvider(
    <div>{menuGroup.find(Popover).prop('children')}</div>,
  );
}
