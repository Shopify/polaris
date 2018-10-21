import * as React from 'react';
import {animationFrame, trigger, mountWithAppProvider} from 'test-utilities';
import {KeypressListener} from 'components';
import Dialog from '../Dialog';

describe('<Dialog>', () => {
  beforeEach(() => {
    animationFrame.fake();
  });

  afterEach(() => {
    animationFrame.restore();
  });

  it('renders CloseKeypressListener with correct props when `in` is true', () => {
    const listener = mountWithAppProvider(
      <Dialog labelledBy="test" onClose={jest.fn()} in>
        something
      </Dialog>,
    ).find(KeypressListener);

    expect(listener.exists()).toBe(true);
  });

  it('triggers an onEntered prop', () => {
    const dialog = mountWithAppProvider(
      <Dialog labelledBy="test" onClose={jest.fn()} onEntered={jest.fn()}>
        something
      </Dialog>,
    );

    trigger(dialog, 'onEntered');
    expect(dialog.prop('onEntered')).toHaveBeenCalledTimes(1);
  });
});
