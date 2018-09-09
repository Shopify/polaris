import * as React from 'react';
import {mountWithAppProvider} from '../../../../../../tests/utilities';
import AlphaPicker from '../AlphaPicker';

const red = {
  hue: 0,
  saturation: 1,
  brightness: 1,
};

describe('<AlphaPicker />', () => {
  it('calls onChange', () => {
    const spy = jest.fn();
    const alphaPicker = mountWithAppProvider(
      <AlphaPicker alpha={0} color={red} onChange={spy} />,
    );
    alphaPicker.simulate('change');
    expect(spy).toHaveBeenCalled;
  });
});
