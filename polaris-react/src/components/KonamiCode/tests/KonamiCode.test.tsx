import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {KonamiCode, KONAMI_CODE} from '../KonamiCode';

describe('<KonamiCode />', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    // eslint-disable-next-line no-console
    (console.error as jest.Mock).mockRestore();
  });

  it('calls the handler when the Konami Code is entered', async () => {
    const spy = jest.fn();

    mountWithApp(<KonamiCode handler={spy} />);
    simulateKeySequence(KONAMI_CODE);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('does not call the handler if the code is wrong', () => {
    const spy = jest.fn();
    const reverseKonamiCode = [...KONAMI_CODE].reverse();

    mountWithApp(<KonamiCode handler={spy} />);
    simulateKeySequence(reverseKonamiCode);

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('removes Konami Code listener on unmount', () => {
    const spy = jest.fn();

    mountWithApp(<KonamiCode handler={spy} />).unmount();
    simulateKeySequence(KONAMI_CODE);

    expect(spy).toHaveBeenCalledTimes(0);
  });
});

function simulateKeySequence(keys: number[]) {
  for (const keyCode of keys) {
    dispatchKeydown(keyCode);
  }
}

function dispatchKeydown(keyCode: number) {
  const event: KeyboardEventInit & {keyCode: number} = {keyCode};
  document.dispatchEvent(new KeyboardEvent('keydown', event));
}
