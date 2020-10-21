import React, {createRef} from 'react';
import {mount, mountWithApp} from 'test-utilities';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {Portal, UNIQUE_CONTAINER_ID} from '../Portal';
import {portal} from '../../shared';

jest.mock('react-dom', () => ({
  ...(jest.requireActual('react-dom') as any),
  createPortal: jest.fn(),
}));

const {
  createPortal: createPortalSpy,
}: {[key: string]: jest.Mock} = jest.requireMock('react-dom');

function lastSpyCall(spy: jest.Mock) {
  return spy.mock.calls.pop() as any[];
}

describe('<Portal />', () => {
  beforeEach(() => {
    createPortalSpy.mockImplementation(() => null);
  });

  afterEach(() => {
    createPortalSpy.mockRestore();
  });

  describe('container', () => {
    it('creates a portal container with the UNIQUE_CONTAINER_ID', () => {
      const appendChildSpy = jest.spyOn(document.body, 'appendChild');
      mountWithApp(<Portal />);
      expect(appendChildSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({
          id: UNIQUE_CONTAINER_ID,
        }),
      );
      appendChildSpy.mockReset();
    });

    it('sets CSS custom properties on the portal node', () => {
      const setSpy = jest.spyOn(Element.prototype, 'setAttribute');
      const portal = mountWithAppProvider(<Portal />, {
        features: {newDesignLanguage: true},
        theme: {
          colors: {surface: '#000000'},
        },
      });

      expect(setSpy).toHaveBeenLastCalledWith(
        'style',
        portal.context().cssCustomProperties,
      );
      setSpy.mockRestore();
    });

    it('removes CSS custom properties from the portal node', () => {
      const removeSpy = jest.spyOn(Element.prototype, 'removeAttribute');
      mountWithAppProvider(<Portal />);
      expect(removeSpy).toHaveBeenCalledWith('style');
    });
  });

  describe('children', () => {
    it('get passed into the portal creation method', () => {
      const children = <div />;
      mountWithAppProvider(<Portal>{children}</Portal>);
      expect(createPortalSpy).toHaveBeenCalledWith(children, expect.anything());
    });
  });

  describe('idPrefix', () => {
    it('is used to prefix the portal ID', () => {
      const idPrefix = 'test';
      mountWithAppProvider(<Portal idPrefix={idPrefix} />);
      const [, portalNode] = lastSpyCall(createPortalSpy);
      expect(portalNode.getAttribute(portal.props[0])).toMatch(
        new RegExp(`^${idPrefix}-Polarisportal`),
      );
    });

    it('is ignored when not defined', () => {
      mountWithAppProvider(<Portal />);
      const [, portalNode] = lastSpyCall(createPortalSpy);
      expect(portalNode.getAttribute(portal.props[0])).toMatch(
        /^Polarisportal/,
      );
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
      jest.requireActual('react-dom').createPortal,
    );
    const ref: React.RefObject<HTMLDivElement> = createRef();
    const handlePortalCreated = jest.fn(() =>
      expect(ref.current).not.toBeNull(),
    );

    function PortalParent() {
      return (
        <Portal onPortalCreated={handlePortalCreated}>
          <div ref={ref} />
        </Portal>
      );
    }

    mountWithAppProvider(<PortalParent />);
    expect(handlePortalCreated).toHaveBeenCalledTimes(1);
  });

  it('renders okay when theme context is undefined', () => {
    expect(() => {
      mount(<Portal />);
    }).not.toThrow();
  });
});
