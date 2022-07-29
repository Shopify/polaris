import {mountWithApp} from 'tests/utilities';

import {Portal} from '../Portal';
import {portal} from '../../shared';

jest.mock('react-dom', () => ({
  ...(jest.requireActual('react-dom') as any),
  createPortal: jest.fn(),
}));

const {createPortal: createPortalSpy}: {[key: string]: jest.Mock} =
  jest.requireMock('react-dom');

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

  describe('children', () => {
    it('get passed into the portal creation method', () => {
      const children = <div />;
      mountWithApp(<Portal>{children}</Portal>);
      const [portalNode] = lastSpyCall(createPortalSpy);
      expect(portalNode.props.children).toBe(children);
    });
  });

  describe('idPrefix', () => {
    it('is used to prefix the portal ID', () => {
      const idPrefix = 'test';
      mountWithApp(<Portal idPrefix={idPrefix} />);
      const [portalNode] = lastSpyCall(createPortalSpy);
      expect(portalNode.props[portal.props[0]]).toMatch(
        new RegExp(`^${idPrefix}-Polarisportal`),
      );
    });

    it('is ignored when not defined', () => {
      mountWithApp(<Portal />);
      const [portalNode] = lastSpyCall(createPortalSpy);
      expect(portalNode.props[portal.props[0]]).toMatch(/^Polarisportal/);
    });
  });

  it('fires onPortalCreated callback when mounted', () => {
    const spy = jest.fn();
    mountWithApp(<Portal onPortalCreated={spy} />);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
