import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Slidable} from '../Slidable';

describe('<Slidable />', () => {
  it('does not invoke onChange when on mouse down is not a mouse down event', () => {
    const spy = jest.fn();
    const slidable = mountWithApp(<Slidable onChange={spy} />);
    slidable.find('div')!.trigger('onMouseDown', {});
    expect(spy).not.toHaveBeenCalled();
  });
});
