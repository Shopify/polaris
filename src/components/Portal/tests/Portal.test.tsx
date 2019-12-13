import React from 'react';
import {mount} from 'test-utilities';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {Portal} from '../Portal';
import {portal} from '../../shared';

jest.mock('react-dom', () => ({
  ...require.requireActual('react-dom'),
  createPortal: jest.fn(),
}));

const {
  createPortal: createPortalSpy,
}: {[key: string]: jest.Mock} = require.requireMock('react-dom');

function lastSpyCall(spy: jest.Mock) {
  return spy.mock.calls.pop() as any[];
}

describe('<Portal />', () => {
  beforeEach(() => {
    createPortalSpy.mockImplementation(() => null);
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
        new RegExp(`^${idPrefix}-portal`),
      );
    });

    it('is ignored when not defined', () => {
      mountWithAppProvider(<Portal />);
      const [, portalNode] = lastSpyCall(createPortalSpy);
      expect(portalNode.getAttribute(portal.props[0])).toMatch(/^portal/);
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

  it('sets CSS custom properties on the portal node', () => {
    const setSpy = jest.spyOn(Element.prototype, 'setAttribute');
    const portal = mountWithAppProvider(<Portal />, {
      features: {unstableGlobalTheming: true},
      theme: {
        UNSTABLE_colors: {surface: '#000000'},
      },
    });
    expect(setSpy).toHaveBeenCalledWith(
      'style',
      portal.context().UNSTABLE_cssCustomProperties,
    );
  });

  it('removes CSS custom properties from the portal node', () => {
    const removeSpy = jest.spyOn(Element.prototype, 'removeAttribute');
    mountWithAppProvider(<Portal />);
    expect(removeSpy).toHaveBeenCalledWith('style');
  });
});
