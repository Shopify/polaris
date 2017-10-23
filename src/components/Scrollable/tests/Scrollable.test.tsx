import * as React from 'react';
import { mount } from 'enzyme';
import Scrollable from '../Scrollable';

describe('<Scrollable />', () => {
  it('mounts', () => {
    const mounted = mount(<Scrollable />);
    expect(mounted).toBeTruthy();
  });
});
