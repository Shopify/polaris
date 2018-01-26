import * as React from 'react';
import {shallow} from 'enzyme';
import Tooltip from '../Tooltip';
import Link from '../../Link';

describe('<Tooltip />', () => {
  it('renders on mouseenter', () => {
    const tooltip = shallow(
      <Tooltip content="Test">
        <Link>test</Link>
      </Tooltip>,
    );
    tooltip.simulate('mouseEnter');
    expect(tooltip.state('active')).toBe(true);
  });

  it('renders on focus', () => {
    const tooltip = shallow(
      <Tooltip content="Test">
        <Link>test</Link>
      </Tooltip>,
    );
    tooltip.simulate('focus');
    expect(tooltip.state('active')).toBe(true);
  });

  it('unrenders on blur', () => {
    const tooltip = shallow(
      <Tooltip content="Test">
        <Link>test</Link>
      </Tooltip>,
    );
    tooltip.simulate('blur');
    expect(tooltip.state('active')).toBe(false);
  });

  it('unrenders on mouseLeave', () => {
    const tooltip = shallow(
      <Tooltip content="Test">
        <Link>test</Link>
      </Tooltip>,
    );
    tooltip.simulate('mouseLeave');
    expect(tooltip.state('active')).toBe(false);
  });
});
