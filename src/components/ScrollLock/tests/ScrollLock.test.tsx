import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import {SCROLL_LOCKING_ATTRIBUTE} from '../../AppProvider';
import ScrollLock from '../ScrollLock';

describe('ScrollLock', () => {
  it('does not remove the data attribute from the body when two scrolllocks are mounted and one unmounts', () => {
    class DummyFrame extends React.PureComponent {
      state = {
        showScrollLock: true,
      };

      render() {
        const {showScrollLock} = this.state;

        const scrollLockMarkup = showScrollLock ? <ScrollLock /> : null;

        return (
          <React.Fragment>
            {scrollLockMarkup}
            <ScrollLock />
          </React.Fragment>
        );
      }
    }

    const scrollLockContainer = mountWithAppProvider(<DummyFrame />);

    scrollLockContainer.instance().setState({showScrollLock: false});

    expect(document.body.hasAttribute(`${SCROLL_LOCKING_ATTRIBUTE}`)).toBe(
      true,
    );
  });

  it('adds data attribute to the body when it mounts', () => {
    mountWithAppProvider(<ScrollLock />);
    expect(document.body.hasAttribute(`${SCROLL_LOCKING_ATTRIBUTE}`)).toBe(
      true,
    );
  });

  it('removes data attribute from the body when it unmounts', () => {
    const scrollLock = mountWithAppProvider(<ScrollLock />);
    scrollLock.unmount();
    expect(document.body.hasAttribute(`${SCROLL_LOCKING_ATTRIBUTE}`)).toBe(
      false,
    );
  });
});
