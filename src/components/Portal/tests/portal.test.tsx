import * as React from 'react';
import {shallow} from 'enzyme';
import Portal from '../Portal';

describe('<Portal />', () => {
  it('renders a div', () => {
    const portal = shallow(<Portal />);
    expect(document.querySelector('[data-portal-id]')).not.toBe(null);
    portal.unmount();
    expect(document.querySelector('[data-portal-id]')).toBe(null);
  });
});
