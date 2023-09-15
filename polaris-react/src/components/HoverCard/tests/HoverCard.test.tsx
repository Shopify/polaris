import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Portal} from '../../Portal';
import {PositionedOverlay} from '../../PositionedOverlay';
import {HoverCard} from '../HoverCard';

describe('<HoverCard />', () => {
  it('renders a portal', () => {
    const popover = mountWithApp(
      <HoverCard active={false} activator={<div>Activator</div>} />,
    );
    expect(popover).toContainReactComponent(Portal);
  });

  it('renders an activator', () => {
    const popover = mountWithApp(
      <HoverCard active activator={<div>Activator</div>} />,
    );
    expect(popover).toContainReactComponent('div', {children: 'Activator'});
  });

  it('renders a positionedOverlay when active is true', () => {
    const popover = mountWithApp(
      <HoverCard active activator={<div>Activator</div>} />,
    );
    expect(popover).toContainReactComponent(PositionedOverlay);
  });

  it('doesn’t render a popover when active is false', () => {
    const popover = mountWithApp(
      <HoverCard active={false} activator={<div>Activator</div>} />,
    );
    expect(popover).not.toContainReactComponent(PositionedOverlay);
  });

  it("passes 'preferredPosition' to PositionedOverlay", () => {
    const popover = mountWithApp(
      <HoverCard
        active={false}
        preferredPosition="above"
        activator={<div>Activator</div>}
      />,
    );

    expect(popover).toContainReactComponent(PositionedOverlay, {
      preferredPosition: 'above',
    });
  });

  it("passes 'preferredAlignment' to PositionedOverlay", () => {
    const popover = mountWithApp(
      <HoverCard
        active={false}
        preferredPosition="above"
        activator={<div>Activator</div>}
        preferredAlignment="left"
      />,
    );

    expect(popover).toContainReactComponent(PositionedOverlay, {
      preferredAlignment: 'left',
    });
  });

  it('has a span as activatorWrapper by default', () => {
    const popover = mountWithApp(
      <HoverCard
        active={false}
        preferredPosition="above"
        activator={<div>Activator</div>}
      />,
    );
    expect(popover.children[0].type).toBe('span');
  });

  it('has a span as activatorWrapper when activatorWrapper prop is set to div', () => {
    const popover = mountWithApp(
      <HoverCard
        active={false}
        activatorWrapper="span"
        preferredPosition="above"
        activator={<div>Activator</div>}
      />,
    );
    expect(popover.children[0].type).toBe('div');
  });

  it('passes fullWidth to PositionedOverlay', () => {
    const popover = mountWithApp(
      <HoverCard active={false} fullWidth activator={<div>Activator</div>} />,
    );

    expect(popover).toContainReactComponent(PositionedOverlay, {
      fullWidth: true,
    });
  });

  it("passes 'zIndexOverride' to PositionedOverlay", () => {
    const popover = mountWithApp(
      <HoverCard
        active={false}
        zIndexOverride={100}
        activator={<div>Activator</div>}
      />,
    );

    expect(popover).toContainReactComponent(PositionedOverlay, {
      zIndexOverride: 100,
    });
  });
});
