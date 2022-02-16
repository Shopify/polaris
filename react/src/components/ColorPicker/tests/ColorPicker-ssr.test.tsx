import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Slidable} from '../components';
import {ColorPicker} from '../ColorPicker';

const red = {
  hue: 0,
  saturation: 1,
  brightness: 1,
};

jest.mock('../../../utilities/target', () => ({
  get isServer() {
    return true;
  },
}));

describe('<ColorPicker /> Server-side only', () => {
  it('does not attach the touchmove handler to the window', () => {
    const colorPicker = mountWithApp(
      <ColorPicker color={red} onChange={noop} />,
    );

    colorPicker.find(Slidable)!.find('div')!.trigger('onMouseDown', {
      type: 'mousedown',
      clientX: 1,
      clientY: 1,
    });

    const touch = {clientX: 0, clientY: 0};
    const event = new TouchEvent('touchmove', {
      touches: [touch],
      cancelable: true,
    } as TouchEventInit);
    Object.assign(event, {preventDefault: jest.fn()});

    window.dispatchEvent(event);

    expect(event.preventDefault).toHaveBeenCalledTimes(1);
  });
});

function noop() {}
