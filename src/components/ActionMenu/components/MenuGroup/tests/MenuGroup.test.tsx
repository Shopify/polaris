import React from 'react';
import {mountWithApp} from 'test-utilities';
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
      const wrapper = mountWithApp(
        <MenuGroup {...mockProps} details={mockDetails} />,
      );

      const popoverContents = mountWithApp(
        <div>{wrapper.find(Popover)!.prop('children')}</div>,
      );

      expect(popoverContents).toContainReactText(mockDetails);
    });

    it('passes `active`', () => {
      const wrapper = mountWithApp(<MenuGroup {...mockProps} active />);

      expect(wrapper).toContainReactComponent(Popover, {
        active: true,
      });
    });

    it('passes `actions` into the <ActionList />', () => {
      const mockActions = [
        {content: 'mock content 1'},
        {content: 'mock content 2'},
      ];
      const wrapper = mountWithApp(
        <MenuGroup {...mockProps} actions={mockActions} />,
      );
      const popoverContents = mountWithApp(
        <div>{wrapper.find(Popover)!.prop('children')}</div>,
      );

      expect(popoverContents).toContainReactComponent(ActionList, {
        items: mockActions,
      });
    });

    it('triggers `onClose` after the <Popover /> closes', () => {
      const onCloseSpy = jest.fn();
      const wrapper = mountWithApp(
        <MenuGroup {...mockProps} onClose={onCloseSpy} />,
      );

      wrapper.find(Popover)!.trigger('onClose');

      expect(onCloseSpy).toHaveBeenCalledTimes(1);
    });

    it('triggers `onClose` after an action', () => {
      const mockTitle = 'mock title';
      const onCloseSpy = jest.fn();
      const wrapper = mountWithApp(
        <MenuGroup
          {...mockProps}
          title={mockTitle}
          active
          onClose={onCloseSpy}
        />,
      );

      wrapper.find(ActionList)!.trigger('onActionAnyItem');

      expect(onCloseSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('uses Button instead as subcomponents', () => {
    const wrapper = mountWithApp(<MenuGroup {...mockProps} />);

    expect(wrapper.findAll(Button)).toHaveLength(1);
  });
});

function noop() {}
