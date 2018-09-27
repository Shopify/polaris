import * as React from 'react';
import {createPortal} from 'react-dom';
import * as targets from '@shopify/react-utilities/target';
import {mountWithAppProvider} from '../../../../tests/utilities';
import Portal from '../Portal';

jest.mock('react-dom', () => ({
  ...require.requireActual('react-dom'),
  createPortal: jest.fn(() => null),
}));

const createPortalSpy = createPortal as jest.Mock;
const actualIsServer = targets.isServer;

function lastSpyCall(spy: jest.Mock) {
  return spy.mock.calls.pop() as any[];
}

function mockIsServer(value: boolean) {
  (targets as any).isServer = value;
}

describe('<Portal />', () => {
  afterEach(() => {
    mockIsServer(actualIsServer);
  });

  describe('children', () => {
    it('get passed into the portal creation method', () => {
      const children = <div />;
      mountWithAppProvider(<Portal>{children}</Portal>);
      expect(createPortalSpy).toBeCalledWith(children, expect.anything());
    });

    it('dont get rendered when the env is the server', () => {
      mockIsServer(true);
      const children = <div />;
      const portal = mountWithAppProvider(<Portal>{children}</Portal>);
      expect(portal.find(children).exists()).toBeFalsy();
    });
  });

  describe('idPrefix', () => {
    it('is used to prefix the portal ID', () => {
      const idPrefix = 'test';
      mountWithAppProvider(<Portal idPrefix={idPrefix} />);
      const [, portalNode] = lastSpyCall(createPortalSpy);
      expect(portalNode.getAttribute('data-portal-id')).toMatch(
        new RegExp(`^${idPrefix}-portal`),
      );
    });

    it('is ignored when not defined', () => {
      mountWithAppProvider(<Portal />);
      const [, portalNode] = lastSpyCall(createPortalSpy);
      expect(portalNode.getAttribute('data-portal-id')).toMatch(/^portal/);
    });
  });

  describe('DOM node', () => {
    it('gets added to the DOM on mount', () => {
      const appendChildSpy = jest.spyOn(document.body, 'appendChild');
      mountWithAppProvider(<Portal />);
      expect(appendChildSpy).toHaveBeenCalledWith(expect.any(HTMLDivElement));
      appendChildSpy.mockRestore();
    });

    it('doesnt get added when the env is the server', () => {
      mockIsServer(true);
      const appendChildSpy = jest.spyOn(document.body, 'appendChild');
      mountWithAppProvider(<Portal />);
      expect(appendChildSpy).not.toHaveBeenCalled();
      appendChildSpy.mockRestore();
    });

    it('gets removed from the DOM when the component unmounts', () => {
      const removeChildSpy = jest.spyOn(document.body, 'removeChild');
      const portal = mountWithAppProvider(<Portal />);
      portal.unmount();
      expect(removeChildSpy).toHaveBeenCalledWith(expect.any(HTMLDivElement));
      removeChildSpy.mockRestore();
    });
  });
});
