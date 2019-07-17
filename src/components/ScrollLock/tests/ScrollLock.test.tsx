import React from 'react';
import {mountWithAppProvider} from 'test-utilities/legacy';
import {SCROLL_LOCKING_WRAPPER_ATTRIBUTE} from '../../../utilities/scroll-lock-manager';
import ScrollLock from '../ScrollLock';

describe('ScrollLock', () => {
  let scrollSpy: jest.SpyInstance;

  beforeEach(() => {
    scrollSpy = jest.spyOn(window, 'scroll');
    scrollSpy.mockImplementation(() => {});
  });

  afterEach(() => {
    scrollSpy.mockRestore();
  });
  it('does not remove the data attribute from the first child element of the body when two scrolllocks are mounted and one unmounts', () => {
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

    document.body.appendChild(document.createElement('div'));
    const scrollLockContainer = mountWithAppProvider(<DummyFrame />);

    scrollLockContainer.find('button').simulate('click');

    const lockedWrapper = document.querySelector(
      `[${SCROLL_LOCKING_WRAPPER_ATTRIBUTE}]`,
    );

    expect(lockedWrapper).toBeTruthy();
  });

  it('adds data attribute to the first child element of the body when it mounts', () => {
    document.body.appendChild(document.createElement('div'));
    mountWithAppProvider(<ScrollLock />);
    const lockedWrapper = document.querySelector(
      `[${SCROLL_LOCKING_WRAPPER_ATTRIBUTE}]`,
    );
    expect(lockedWrapper).toBeTruthy();
  });

  it('removes data attribute from the first child element of the body when it unmounts', () => {
    document.body.appendChild(document.createElement('div'));
    const scrollLock = mountWithAppProvider(<ScrollLock />);
    scrollLock.unmount();
    const lockedWrapper = document.querySelector(
      `[${SCROLL_LOCKING_WRAPPER_ATTRIBUTE}]`,
    );
    expect(lockedWrapper).toBeFalsy();
  });
});
