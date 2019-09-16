import React from 'react';
import {mountWithAppProvider} from 'test-utilities/legacy';
import {SCROLL_LOCKING_ATTRIBUTE} from '../../../utilities/scroll-lock-manager';
import {ScrollLock} from '../ScrollLock';

describe('ScrollLock', () => {
  let scrollSpy: jest.SpyInstance;

  beforeEach(() => {
    scrollSpy = jest.spyOn(window, 'scroll');
  });

  afterEach(() => {
    scrollSpy.mockRestore();
  });

  it('does not remove the data attribute from the body when two scrolllocks are mounted and one unmounts', () => {
    class DummyFrame extends React.Component {
      state = {
        showScrollLock: true,
      };

      setScollLockFalse = () => {
        this.setState({showScrollLock: false});
      };

      render() {
        const {showScrollLock} = this.state;

        // eslint-disable-next-line shopify/jest/no-if
        const scrollLockMarkup = showScrollLock ? <ScrollLock /> : null;

        return (
          <React.Fragment>
            <button onClick={this.setScollLockFalse} />
            {scrollLockMarkup}
            <ScrollLock />
          </React.Fragment>
        );
      }
    }

    const scrollLockContainer = mountWithAppProvider(<DummyFrame />);

    scrollLockContainer.find('button').simulate('click');

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
