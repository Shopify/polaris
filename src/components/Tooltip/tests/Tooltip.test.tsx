import React from 'react';
import {findByTestID, mountWithAppProvider} from 'test-utilities';
import {Link} from 'components';
import Tooltip from '../Tooltip';

describe('<Tooltip />', () => {
  const tooltip = mountWithAppProvider(
    <Tooltip content="Inner content">
      <Link>link content</Link>
    </Tooltip>,
  );

  const wrapperComponent = findByTestID(tooltip, 'WrapperComponent');

  it('renders its children', () => {
    expect(tooltip.find('button').exists()).toBe(true);
  });

  it('does not render initially', () => {
    expect(findByTestID(tooltip, 'TooltipOverlayLabel').exists()).toBe(false);
  });

  it('renders initially when active is true', () => {
    const tooltipActive = mountWithAppProvider(
      <Tooltip content="Inner content" active>
        <Link>link content</Link>
      </Tooltip>,
    );
    expect(findByTestID(tooltipActive, 'TooltipOverlayLabel').exists()).toBe(
      true,
    );
  });

  it('renders on mouseEnter', () => {
    wrapperComponent.simulate('mouseEnter');
    expect(findByTestID(tooltip, 'TooltipOverlayLabel').exists()).toBe(true);
  });

  it('renders on focus', () => {
    wrapperComponent.simulate('focus');
    expect(findByTestID(tooltip, 'TooltipOverlayLabel').exists()).toBe(true);
  });

  it('unrenders its children on blur', () => {
    wrapperComponent.simulate('blur');
    expect(findByTestID(tooltip, 'TooltipOverlayLabel').exists()).toBe(false);
  });

  it('unrenders its children on mouseLeave', () => {
    wrapperComponent.simulate('mouseLeave');
    expect(findByTestID(tooltip, 'TooltipOverlayLabel').exists()).toBe(false);
  });
});
