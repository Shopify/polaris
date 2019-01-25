import * as React from 'react';
import * as targets from '@shopify/react-utilities/target';
import {mountWithAppProvider} from 'test-utilities';
import Portal from '../Portal';

jest.mock('react-dom', () => ({
  ...require.requireActual('react-dom'),
  createPortal: jest.fn(),
}));

const {
  createPortal: createPortalSpy,
}: {[key: string]: jest.Mock} = require.requireMock('react-dom');

const actualIsServer = targets.isServer;

function lastSpyCall(spy: jest.Mock) {
  return spy.mock.calls.pop() as any[];
}

function mockIsServer(value: boolean) {
  (targets as any).isServer = value;
}

describe('<Portal />', () => {
  beforeEach(() => {
    createPortalSpy.mockImplementation(() => null);
  });

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

    it('gets removed from the DOM when the component unmounts', () => {
      const removeChildSpy = jest.spyOn(document.body, 'removeChild');
      const portal = mountWithAppProvider(<Portal />);
      portal.unmount();
      expect(removeChildSpy).toHaveBeenCalledWith(expect.any(HTMLDivElement));
      removeChildSpy.mockRestore();
    });
  });

  it('fires onPortalCreated callback when mounted', () => {
    const spy = jest.fn();
    mountWithAppProvider(<Portal onPortalCreated={spy} />);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('has a child ref defined when onPortalCreated callback is called', () => {
    createPortalSpy.mockImplementation(
      require.requireActual('react-dom').createPortal,
    );
    const ref: React.RefObject<HTMLDivElement> = React.createRef();
    const handlePortalCreated = jest.fn(() =>
      expect(ref.current).not.toBeNull(),
    );

    class PortalParent extends React.PureComponent {
      render() {
        return (
          <Portal onPortalCreated={handlePortalCreated}>
            <div ref={ref} />
          </Portal>
        );
      }
    }

    mountWithAppProvider(<PortalParent />);
    expect(handlePortalCreated).toHaveBeenCalledTimes(1);
  });
});
