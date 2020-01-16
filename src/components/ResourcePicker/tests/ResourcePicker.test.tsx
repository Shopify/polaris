import React from 'react';
import {ResourcePicker as AppBridgeResourcePicker} from '@shopify/app-bridge/actions';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {ResourcePicker} from '../ResourcePicker';

describe('<ResourcePicker />', () => {
  describe('with app bridge', () => {
    let appBridgeResourcePickerCreate: jest.SpyInstance;
    const appBridgeResourcePickerMock = {
      subscribe: jest.fn(),
      dispatch: jest.fn(),
      set: jest.fn(),
      unsubscribe: jest.fn(),
    };

    beforeEach(() => {
      appBridgeResourcePickerCreate = jest.spyOn(
        AppBridgeResourcePicker,
        'create',
      );
      appBridgeResourcePickerCreate.mockReturnValue(
        appBridgeResourcePickerMock,
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('does not create an instance of resource picker when app bridge is null', () => {
      mountWithAppProvider(<ResourcePicker resourceType="Product" open />);

      expect(AppBridgeResourcePicker.create).not.toHaveBeenCalled();
    });

    it('creates an instance of resource picker', () => {
      const {appBridge} = mountWithAppBridge(
        <ResourcePicker resourceType="Product" open />,
      );

      expect(AppBridgeResourcePicker.create).toHaveBeenCalledTimes(1);
      expect(AppBridgeResourcePicker.create).toHaveBeenCalledWith(appBridge, {
        resourceType: AppBridgeResourcePicker.ResourceType.Product,
        options: {
          initialQuery: undefined,
          showHidden: true,
          selectMultiple: true,
          showVariants: true,
        },
      });
    });

    it('subscribes the selection callback', () => {
      const onSelection = jest.fn();
      const selectionPayload = {selection: []};
      mountWithAppBridge(
        <ResourcePicker
          resourceType="Product"
          open
          onSelection={onSelection}
        />,
      );

      expect(appBridgeResourcePickerMock.subscribe).toHaveBeenCalledTimes(1);
      const [
        firstArg,
        secondArg,
      ] = appBridgeResourcePickerMock.subscribe.mock.calls[0];
      expect(firstArg).toBe(AppBridgeResourcePicker.Action.SELECT);
      secondArg(selectionPayload);
      expect(onSelection).toHaveBeenCalledTimes(1);
      expect(onSelection).toHaveBeenCalledWith(selectionPayload);
    });

    it('calls the new selection callback when changed', () => {
      const onSelection = jest.fn();
      const selectionPayload = {selection: []};
      const {resourcePicker} = mountWithAppBridge(
        <ResourcePicker resourceType="Product" open />,
      );

      resourcePicker.setProps({onSelection});

      expect(appBridgeResourcePickerMock.unsubscribe).toHaveBeenCalledTimes(1);
      expect(appBridgeResourcePickerMock.subscribe).toHaveBeenCalledTimes(1);

      const [
        firstArg,
        secondArg,
      ] = appBridgeResourcePickerMock.subscribe.mock.calls[0];
      expect(firstArg).toBe(AppBridgeResourcePicker.Action.SELECT);
      secondArg(selectionPayload);
      expect(onSelection).toHaveBeenCalledTimes(1);
      expect(onSelection).toHaveBeenCalledWith(selectionPayload);
    });

    it('subscribes the cancel callback', () => {
      mountWithAppBridge(
        <ResourcePicker resourceType="Product" open onCancel={noop} />,
      );

      expect(appBridgeResourcePickerMock.subscribe).toHaveBeenCalledTimes(1);
      expect(appBridgeResourcePickerMock.subscribe).toHaveBeenLastCalledWith(
        'CANCEL',
        noop,
      );
    });

    it('calls the new cancel callback when changed', () => {
      const onCancel = jest.fn();
      const {resourcePicker} = mountWithAppBridge(
        <ResourcePicker resourceType="Product" open />,
      );

      resourcePicker.setProps({onCancel});

      expect(appBridgeResourcePickerMock.unsubscribe).toHaveBeenCalledTimes(1);
      expect(appBridgeResourcePickerMock.subscribe).toHaveBeenCalledTimes(1);

      const [
        firstArg,
        secondArg,
      ] = appBridgeResourcePickerMock.subscribe.mock.calls[0];
      expect(firstArg).toBe(AppBridgeResourcePicker.Action.CANCEL);
      secondArg();
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it('dispatches an open action on mount', () => {
      mountWithAppBridge(<ResourcePicker resourceType="Product" open />);

      expect(appBridgeResourcePickerMock.dispatch).toHaveBeenCalledTimes(1);
      expect(appBridgeResourcePickerMock.dispatch).toHaveBeenLastCalledWith(
        AppBridgeResourcePicker.Action.OPEN,
      );
    });

    it('does not dispatch an open action on mount', () => {
      mountWithAppBridge(
        <ResourcePicker resourceType="Product" open={false} />,
      );

      expect(appBridgeResourcePickerMock.dispatch).not.toHaveBeenCalled();
    });

    it('calls set when the component updates', () => {
      const {resourcePicker} = mountWithAppBridge(
        <ResourcePicker resourceType="Product" open={false} />,
      );

      resourcePicker.setProps({open: true});
      expect(appBridgeResourcePickerMock.set).toHaveBeenCalledTimes(1);
      expect(appBridgeResourcePickerMock.set).toHaveBeenLastCalledWith({
        initialQuery: undefined,
        showHidden: false,
        selectMultiple: true,
        showVariants: true,
      });
    });

    it('does not call set when props do not change', () => {
      const {resourcePicker} = mountWithAppBridge(
        <ResourcePicker resourceType="Product" open showHidden />,
      );

      resourcePicker.setProps({showHidden: false});
      expect(appBridgeResourcePickerMock.set).toHaveBeenCalledTimes(1);
      resourcePicker.setProps({showHidden: false});
      expect(appBridgeResourcePickerMock.set).toHaveBeenCalledTimes(1);
    });

    it('does not call set when the component updates if there is no picker', () => {
      const resourcePicker = mountWithAppProvider(
        <ResourcePicker resourceType="Product" open={false} />,
      );

      resourcePicker.setProps({open: true});
      expect(appBridgeResourcePickerMock.set).not.toHaveBeenCalled();
    });

    it('dispatches an open action when the open prop changes to true', () => {
      const {resourcePicker} = mountWithAppBridge(
        <ResourcePicker resourceType="Product" open={false} />,
      );

      resourcePicker.setProps({open: true});
      expect(appBridgeResourcePickerMock.dispatch).toHaveBeenCalledTimes(1);
      expect(appBridgeResourcePickerMock.dispatch).toHaveBeenCalledWith(
        AppBridgeResourcePicker.Action.OPEN,
      );
    });

    it('dispatches a close action when the open prop changes to false', () => {
      const {resourcePicker} = mountWithAppBridge(
        <ResourcePicker resourceType="Product" open />,
      );

      // dispatch is called to open the picker when it mounts, so let us clear that
      jest.clearAllMocks();

      resourcePicker.setProps({open: false});
      expect(appBridgeResourcePickerMock.dispatch).toHaveBeenCalledTimes(1);
      expect(appBridgeResourcePickerMock.dispatch).toHaveBeenCalledWith(
        AppBridgeResourcePicker.Action.CLOSE,
      );
    });

    it('unsubscribes on unmount', () => {
      const {resourcePicker} = mountWithAppBridge(
        <ResourcePicker resourceType="Product" open />,
      );

      resourcePicker.unmount();
      expect(appBridgeResourcePickerMock.unsubscribe).toHaveBeenCalledTimes(1);
    });

    it('does nothing on unmount if there is no picker', () => {
      const resourcePicker = mountWithAppProvider(
        <ResourcePicker resourceType="Product" open />,
      );

      resourcePicker.unmount();
      expect(appBridgeResourcePickerMock.unsubscribe).not.toHaveBeenCalled();
    });
  });
});

function noop() {}

function mountWithAppBridge(element: React.ReactElement) {
  const appBridge = {};
  const resourcePicker = mountWithAppProvider(element, {appBridge});

  return {resourcePicker, appBridge};
}
