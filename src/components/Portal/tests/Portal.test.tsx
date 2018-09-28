import * as React from 'react';
import {mountWithAppProvider} from '../../../../tests/utilities';
import Portal from '../Portal';

describe('<Portal />', () => {
  it('renders a div', () => {
    const portal = mountWithAppProvider(<Portal />);
    expect(document.querySelector('[data-portal-id]')).not.toBe(null);
    portal.unmount();
    expect(document.querySelector('[data-portal-id]')).toBe(null);
  });

  it('fires onPortalCreated callback when mounted', () => {
    const spy = jest.fn();
    mountWithAppProvider(<Portal onPortalCreated={spy} />);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('has a child ref defined when onPortalCreated callback is called', () => {
    const ref: React.RefObject<HTMLDivElement> = React.createRef();
    const handlePortalCreated = jest.fn(() =>
      expect(ref.current).not.toBeNull(),
    );

    class PortalParent extends React.Component {
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
