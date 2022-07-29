import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Link} from '../../Link';
import {Tooltip} from '../Tooltip';
import {TooltipOverlay} from '../components';
import {Key} from '../../../types';

describe('<Tooltip />', () => {
  it('renders its children', () => {
    const tooltip = mountWithApp(
      <Tooltip content="Inner content">
        <Link>link content</Link>
      </Tooltip>,
    );

    expect(tooltip).toContainReactComponent('button');
  });

  it('does not render initially', () => {
    const tooltip = mountWithApp(
      <Tooltip content="Inner content">
        <Link>link content</Link>
      </Tooltip>,
    );
    expect(tooltip.find(TooltipOverlay)).not.toContainReactComponent('div');
  });

  it('renders initially when active is true', () => {
    const tooltipActive = mountWithApp(
      <Tooltip content="Inner content" active>
        <Link>link content</Link>
      </Tooltip>,
    );
    expect(tooltipActive.find(TooltipOverlay)).toContainReactComponent('div');
  });

  it('passes preventInteraction to TooltipOverlay when dismissOnMouseOut is true', () => {
    const tooltip = mountWithApp(
      <Tooltip dismissOnMouseOut content="Inner content" active>
        <Link>link content</Link>
      </Tooltip>,
    );
    expect(tooltip).toContainReactComponent(TooltipOverlay, {
      preventInteraction: true,
    });
  });

  it('renders on mouseOver', () => {
    const tooltip = mountWithApp(
      <Tooltip content="Inner content">
        <Link>link content</Link>
      </Tooltip>,
    );

    findWrapperComponent(tooltip)!.trigger('onMouseOver');
    expect(tooltip.find(TooltipOverlay)).toContainReactComponent('div');
  });

  it('renders on focus', () => {
    const tooltip = mountWithApp(
      <Tooltip content="Inner content">
        <Link>link content</Link>
      </Tooltip>,
    );

    findWrapperComponent(tooltip)!.trigger('onFocus');
    expect(tooltip.find(TooltipOverlay)).toContainReactComponent('div');
  });

  it('unrenders its children on blur', () => {
    const tooltip = mountWithApp(
      <Tooltip content="Inner content">
        <Link>link content</Link>
      </Tooltip>,
    );

    findWrapperComponent(tooltip)!.trigger('onBlur');
    expect(tooltip.find(TooltipOverlay)).not.toContainReactComponent('div');
  });

  it('unrenders its children on mouseLeave', () => {
    const tooltip = mountWithApp(
      <Tooltip content="Inner content">
        <Link>link content</Link>
      </Tooltip>,
    );

    findWrapperComponent(tooltip)!.trigger('onMouseLeave');
    expect(tooltip.find(TooltipOverlay)).not.toContainReactComponent('div');
  });

  it('closes itself when escape is pressed on keyup', () => {
    const tooltip = mountWithApp(
      <Tooltip active content="This order has shipping labels.">
        <div>Order #1001</div>
      </Tooltip>,
    );

    findWrapperComponent(tooltip)!.trigger('onKeyUp', {
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
});

function findWrapperComponent(tooltip: any) {
  return tooltip.find('span');
}
