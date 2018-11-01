import * as React from 'react';
import {ReactWrapper} from 'enzyme';
import {Popover, ActionList} from 'components';
import {mountWithAppProvider, trigger} from 'test-utilities';
import {noop} from '@shopify/javascript-utilities/other';
import Action from '../../Action';
import ActionGroup from '../ActionGroup';

describe('<ActionGroup />', () => {
  const mockProps = {
    title: '',
    actions: [{}],
    active: false,
    onOpen: noop,
    onClose: noop,
  };

  function getPopoverContents(actionGroup: ReactWrapper) {
    return mountWithAppProvider(
      <div>{actionGroup.find(Popover).prop('children')}</div>,
    );
  }

  describe('title', () => {
    it('is used as the label for the popover activator', () => {
      const title = 'Actions';
      const actionGroup = mountWithAppProvider(
        <ActionGroup {...mockProps} title={title} />,
      );
      expect(actionGroup.find(Action).prop('children')).toBe(title);
    });
  });

  describe('icon', () => {
    it('gets passed into the action', () => {
      const icon = 'save';
      const actionGroup = mountWithAppProvider(
        <ActionGroup {...mockProps} icon={icon} />,
      );
      expect(actionGroup.find(Action).prop('icon')).toBe(icon);
    });
  });

  describe('details', () => {
    it('get shown in the popover', () => {
      const details = 'amazing details';
      const actionGroup = mountWithAppProvider(
        <ActionGroup {...mockProps} details={details} />,
      );
      const popoverContents = getPopoverContents(actionGroup);
      expect(popoverContents.text()).toContain(details);
    });
  });

  describe('actions', () => {
    it('get passed into the actions list', () => {
      const actions = [{}];
      const actionGroup = mountWithAppProvider(
        <ActionGroup {...mockProps} actions={actions} />,
      );
      const popoverContents = getPopoverContents(actionGroup);
      expect(popoverContents.find(ActionList).prop('items')).toEqual(actions);
    });
  });

  describe('active', () => {
    it('gets passed into the popover', () => {
      const actionGroup = mountWithAppProvider(
        <ActionGroup {...mockProps} active />,
      );
      expect(actionGroup.find(Popover).prop('active')).toBeTruthy();
    });
  });

  describe('onOpen()', () => {
    it('passes in the title when it triggers after an action', () => {
      const title = 'Actions';
      const onOpenSpy = jest.fn();
      const actionGroup = mountWithAppProvider(
        <ActionGroup {...mockProps} title={title} onOpen={onOpenSpy} />,
      );
      trigger(actionGroup.find(Action), 'onAction');
      expect(onOpenSpy).toHaveBeenCalledWith(title);
    });
  });

  describe('onClose()', () => {
    it('passes in the title when it triggers after the popover closes', () => {
      const title = 'Actions';
      const onCloseSpy = jest.fn();
      const actionGroup = mountWithAppProvider(
        <ActionGroup {...mockProps} title={title} onClose={onCloseSpy} />,
      );
      trigger(actionGroup.find(Popover), 'onClose');
      expect(onCloseSpy).toHaveBeenCalledWith(title);
    });

    it('passes in the title when it triggers after an action ', () => {
      const title = 'Actions';
      const onCloseSpy = jest.fn();
      const actionGroup = mountWithAppProvider(
        <ActionGroup
          {...mockProps}
          title={title}
          onClose={onCloseSpy}
          active
        />,
      );
      trigger(actionGroup.find(ActionList), 'onActionAnyItem');
      expect(onCloseSpy).toHaveBeenCalledWith(title);
    });
  });
});
