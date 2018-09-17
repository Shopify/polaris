import * as React from 'react';
import {mountWithAppProvider} from '../../../../../../tests/utilities';
import HuePicker from '../HuePicker';

describe('<HuePicker />', () => {
  it('is passed down to AlphaPicker if allowAlpha is true', () => {
    const spy = jest.fn();
    const colorPicker = mountWithAppProvider(
      <HuePicker hue={3} onChange={spy} />,
    );
    colorPicker.simulate('change');
    expect(spy).toHaveBeenCalled;
  });
});
