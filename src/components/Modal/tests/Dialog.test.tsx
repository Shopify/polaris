import * as React from 'react';
import {mount} from 'enzyme';
import {KeypressListener} from '../../';

import {animationFrame, trigger} from '../../../../tests/utilities';

import {Dialog} from '../components';

describe('<Dialog>', () => {
  beforeEach(() => {
    animationFrame.fake();
  });

  afterEach(() => {
    animationFrame.restore();
  });

  it('renders CloseKeypressListener with correct props when `in` is true', () => {
    const listener = mount(
      <Dialog labelledBy="test" onClose={jest.fn()} in>
        something
      </Dialog>,
    ).find(KeypressListener);

    expect(listener.exists()).toBe(true);
    expect(listener.props()).toMatchSnapshot();
  });

  it('triggers an onEntered prop', () => {
    const dialog = mount(
      <Dialog labelledBy="test" onClose={jest.fn()} onEntered={jest.fn()}>
        something
      </Dialog>,
    );

    trigger(dialog, 'onEntered');
    expect(dialog.prop('onEntered')).toHaveBeenCalledTimes(1);
  });
});
