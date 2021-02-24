import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {findByTestID, mountWithAppProvider} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';
import {Link} from 'components';

import {Tooltip} from '../Tooltip';
import {TooltipOverlay} from '../components';
import {Key} from '../../../types';

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
    const overlayContent = tooltip.find(TooltipOverlay).find('div');
    expect(overlayContent.exists()).toBe(false);
  });

  it('renders initially when active is true', () => {
    const tooltipActive = mountWithAppProvider(
      <Tooltip content="Inner content" active>
        <Link>link content</Link>
      </Tooltip>,
    );
    const overlayContent = tooltipActive.find(TooltipOverlay).find('div');
    expect(overlayContent.exists()).toBe(true);
  });

  it('passes preventInteraction to TooltipOverlay when dismissOnMouseOut is true', () => {
    const tooltipPreventInteraction = mountWithAppProvider(
      <Tooltip content="Inner content" active dismissOnMouseOut>
        <Link>link content</Link>
      </Tooltip>,
    );
    expect(
      tooltipPreventInteraction.find(TooltipOverlay).prop('preventInteraction'),
    ).toBe(true);
  });

  it('renders on mouseOver', () => {
    wrapperComponent.simulate('mouseOver');
    const overlayContent = tooltip.find(TooltipOverlay).find('div');
    expect(overlayContent.exists()).toBe(true);
  });

  it('renders on focus', () => {
    wrapperComponent.simulate('focus');
    const overlayContent = tooltip.find(TooltipOverlay).find('div');
    expect(overlayContent.exists()).toBe(true);
  });

  it('unrenders its children on blur', () => {
    wrapperComponent.simulate('blur');
    const overlayContent = tooltip.find(TooltipOverlay).find('div');
    expect(overlayContent.exists()).toBe(false);
  });

  it('unrenders its children on mouseLeave', () => {
    wrapperComponent.simulate('mouseLeave');
    const overlayContent = tooltip.find(TooltipOverlay).find('div');
    expect(overlayContent.exists()).toBe(false);
  });

  it('closes itself when escape is pressed on keyup', () => {
    const tooltip = mountWithApp(
      <Tooltip active content="This order has shipping labels.">
        <div>Order #1001</div>
      </Tooltip>,
    );

    tooltip.find('span')!.trigger('onKeyUp', {
      keyCode: Key.Escape,
    });
    expect(tooltip).toContainReactComponent(TooltipOverlay, {
      active: false,
    });
  });

  it('passes accessibility label to TooltipOverlay', () => {
    const accessibilityLabel = 'accessibility label';

    const tooltip = mountWithApp(
      <Tooltip
        accessibilityLabel={accessibilityLabel}
        content="Inner content"
        active
      >
        <Link>link content</Link>
      </Tooltip>,
    );
    expect(tooltip).toContainReactComponent(TooltipOverlay, {
      accessibilityLabel,
    });
  });

  it('does not propagate click to wrappers', () => {
    const spyFn = jest.fn();
    const tooltip = mountWithAppProvider(
      <div onClick={spyFn}>
        <Tooltip content="Inner content">
          <Link>link content</Link>
        </Tooltip>
      </div>,
    );

    const wrapperComponent = findByTestID(tooltip, 'WrapperComponent');
    wrapperComponent.simulate('click');

    expect(spyFn).not.toHaveBeenCalled();
  });
});
