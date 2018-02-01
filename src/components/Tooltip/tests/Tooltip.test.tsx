import * as React from 'react';
import {mount} from 'enzyme';
import Tooltip from '../Tooltip';
import Link from '../../Link';

describe('<Tooltip />', () => {
  it('renders its children', () => {
    const tooltip = mount(
      <Tooltip content="Inner content">
        <Link>link content</Link>
      </Tooltip>,
    );
    expect(tooltip.find('button').exists()).toBe(true);
  });

  it('renders on mouseenter', () => {
    const tooltip = mount(
      <Tooltip content="overlay content">
        <Link>link content</Link>
      </Tooltip>,
    );

    tooltip.simulate('mouseEnter');
    expect(tooltip.find('[role="tooltip"]').exists()).toBe(true);
  });

  it('renders on focus', () => {
    const tooltip = mount(
      <Tooltip content="overlay content">
        <Link>link content</Link>
      </Tooltip>,
    );
    tooltip.simulate('focus');
    expect(tooltip.find('[role="tooltip"]').exists()).toBe(true);
  });

  it('unrenders its children on blur', () => {
    const tooltip = mount(
      <Tooltip content="overlay content">
        <Link>link content</Link>
      </Tooltip>,
    );
    tooltip.simulate('blur');
    expect(tooltip.find('[role="tooltip"]').exists()).toBe(false);
  });

  it('unrenders its children on mouseLeave', () => {
    const tooltip = mount(
      <Tooltip content="overlay content">
        <Link>link content</Link>
      </Tooltip>,
    );
    tooltip.simulate('mouseLeave');
    expect(tooltip.find('[role="tooltip"]').exists()).toBe(false);
  });
});
