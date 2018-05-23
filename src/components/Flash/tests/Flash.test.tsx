import * as React from 'react';
import {mount} from 'enzyme';
import * as PropTypes from 'prop-types';

import {noop} from '../../../utilities/other';

import Flash from '../Flash';

describe('<Flash />', () => {
  it('shows the flash with a unique ID on mount', () => {
    const props = {children: 'Hello world!', error: true, onDismiss: noop};
    const {frame} = mountWithContext(<Flash {...props} />);
    expect(frame.showFlash).toHaveBeenCalledWith({
      id: expect.any(String),
      ...props,
    });
  });

  it('hides the flash based on ID on unmount', () => {
    const {flash, frame} = mountWithContext(<Flash onDismiss={noop} />);
    expect(frame.hideFlash).not.toHaveBeenCalled();
    flash.unmount();

    const {id} = frame.showFlash.mock.calls[0][0];
    expect(frame.hideFlash).toHaveBeenCalledWith({id});
  });
});

function mountWithContext(element: React.ReactElement<any>) {
  const frame = {showFlash: jest.fn(), hideFlash: jest.fn()};
  const flash = mount(element, {
    context: {frame},
    childContextTypes: {frame: PropTypes.any},
  });

  return {flash, frame};
}
