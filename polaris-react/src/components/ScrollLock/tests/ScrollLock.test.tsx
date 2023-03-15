import { useState, useCallback } from 'react';
import {mountWithApp} from 'tests/utilities';

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
    function DummyFrame() {
      const [showScrollLock, setScrollLock] = useState(true);
      const setScollLockFalse = useCallback(() => setScrollLock(false), []);

      const scrollLockMarkup = showScrollLock ? <ScrollLock /> : null;

      return (
        <>
          <button onClick={setScollLockFalse} />
          {scrollLockMarkup}
          <ScrollLock />
        </>
      );
    }

    const scrollLockContainer = mountWithApp(<DummyFrame />);
    scrollLockContainer.find('button')!.trigger('onClick');

    expect(document.body.hasAttribute(`${SCROLL_LOCKING_ATTRIBUTE}`)).toBe(
      true,
    );
  });

  it('adds data attribute to the body when it mounts', () => {
    mountWithApp(<ScrollLock />);
    expect(document.body.hasAttribute(`${SCROLL_LOCKING_ATTRIBUTE}`)).toBe(
      true,
    );
  });

  it('removes data attribute from the body when it unmounts', () => {
    const scrollLock = mountWithApp(<ScrollLock />);
    scrollLock.unmount();
    expect(document.body.hasAttribute(`${SCROLL_LOCKING_ATTRIBUTE}`)).toBe(
      false,
    );
  });
});
