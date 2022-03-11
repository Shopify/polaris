import React from 'react';
import {animationFrame} from '@shopify/jest-dom-mocks';
import {mountWithApp} from 'tests/utilities';

import {KeypressListener} from '../../../../KeypressListener';
import {Dialog} from '../Dialog';

describe('<Dialog>', () => {
  beforeEach(() => {
    animationFrame.mock();
  });

  afterEach(() => {
    animationFrame.restore();
  });

  it('sets CloseKeypressListener when `in` is true', () => {
    const listener = mountWithApp(
      <Dialog labelledBy="test" onClose={noop} in>
        something
      </Dialog>,
    );

    expect(listener).toContainReactComponent(KeypressListener);
  });

  it('triggers an onEntered prop', () => {
    const spy = jest.fn();

    const dialog = mountWithApp(
      <Dialog labelledBy="test" onClose={noop} onEntered={spy}>
        something
      </Dialog>,
    );

    dialog.triggerKeypath('onEntered');

    expect(spy).toHaveBeenCalledTimes(1);
  });
});

function noop() {}
