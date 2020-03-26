import React from 'react';
import {animationFrame} from '@shopify/jest-dom-mocks';
// eslint-disable-next-line no-restricted-imports
import {trigger, mountWithAppProvider} from 'test-utilities/legacy';
import {KeypressListener} from 'components';

import {Dialog} from '../Dialog';

describe('<Dialog>', () => {
  beforeEach(() => {
    animationFrame.mock();
  });

  afterEach(() => {
    animationFrame.restore();
  });

  it('sets CloseKeypressListener when `in` is true', () => {
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

    trigger(dialog.find('FadeUp'), 'onEntered');
    expect(dialog.find('FadeUp').prop('onEntered')).toHaveBeenCalledTimes(1);
  });
});
