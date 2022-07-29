import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {ActionList} from '../../../../ActionList';
import {Button} from '../../../../Button';
import {Popover} from '../../../../Popover';
import {MenuGroup} from '../MenuGroup';

describe('<MenuGroup />', () => {
  const mockProps = {
    title: 'title',
    actions: [{content: 'mock content 1'}],
    active: undefined,
    onOpen: noop,
    onClose: noop,
    onClick: undefined,
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

    it('passes `sections` into the <ActionList />', () => {
      const mockActions = [
        {content: 'mock action 1'},
        {content: 'mock action 2'},
      ];
      const mockSections = [
        {title: 'section 1', items: [{content: 'mock section 1'}]},
        {title: 'section 2', items: [{content: 'mock section 2'}]},
      ];
      const wrapper = mountWithApp(
        <MenuGroup
          {...mockProps}
          actions={mockActions}
          sections={mockSections}
        />,
      );
      const popoverContents = mountWithApp(
        <div>{wrapper.find(Popover)!.prop('children')}</div>,
      );

      expect(popoverContents).toContainReactComponent(ActionList, {
        items: mockActions,
        sections: mockSections,
      });
    });

    it('triggers `onOpen` when `onClick` is not defined', () => {
      const onOpenSpy = jest.fn();
      const wrapper = mountWithApp(
        <MenuGroup {...mockProps} onOpen={onOpenSpy} />,
      );

      wrapper.find(Button)!.trigger('onClick');
      expect(onOpenSpy).toHaveBeenCalledTimes(1);
    });

    it('triggers `onClick` and triggers onOpen when the callback has called', () => {
      const onClickSpy = jest.fn((x) => x());
      const onOpenSpy = jest.fn();
      const wrapper = mountWithApp(
        <MenuGroup {...mockProps} onClick={onClickSpy} onOpen={onOpenSpy} />,
      );

      wrapper.find(Button)!.trigger('onClick');
      expect(onClickSpy).toHaveBeenCalledTimes(1);
      expect(onOpenSpy).toHaveBeenCalledTimes(1);
    });

    it('triggers `onClick` when the callback has not called', () => {
      const onClickSpy = jest.fn();
      const onOpenSpy = jest.fn();
      const wrapper = mountWithApp(
        <MenuGroup {...mockProps} onClick={onClickSpy} onOpen={onOpenSpy} />,
      );

      wrapper.find(Button)!.trigger('onClick');
      expect(onClickSpy).toHaveBeenCalledTimes(1);
      expect(onOpenSpy).not.toHaveBeenCalledTimes(1);
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
