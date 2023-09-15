import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Portal} from '../../Portal';
import {PositionedOverlay} from '../../PositionedOverlay';
import {HoverCard} from '../HoverCard';

const defaultProps = {
  active: false,
  toggleActive: jest.fn(),
  activator: <div>Activator</div>,
};

describe('<HoverCard />', () => {
  it('renders a portal', () => {
    const popover = mountWithApp(<HoverCard {...defaultProps} />);
    expect(popover).toContainReactComponent(Portal);
  });

  it('renders an activator', () => {
    const popover = mountWithApp(<HoverCard {...defaultProps} active />);
    expect(popover).toContainReactComponent('div', {children: 'Activator'});
  });

  it('renders a positionedOverlay when active is true', () => {
    const popover = mountWithApp(<HoverCard {...defaultProps} active />);
    expect(popover).toContainReactComponent(PositionedOverlay);
  });

  it('doesn’t render a popover when active is false', () => {
    const popover = mountWithApp(<HoverCard {...defaultProps} />);
    expect(popover).not.toContainReactComponent(PositionedOverlay);
  });

  it("passes 'preferredPosition' to PositionedOverlay", () => {
    const popover = mountWithApp(
      <HoverCard preferredPosition="above" {...defaultProps} />,
    );

    expect(popover).toContainReactComponent(PositionedOverlay, {
      preferredPosition: 'above',
    });
  });

  it("passes 'preferredAlignment' to PositionedOverlay", () => {
    const popover = mountWithApp(
      <HoverCard {...defaultProps} preferredAlignment="left" />,
    );

    expect(popover).toContainReactComponent(PositionedOverlay, {
      preferredAlignment: 'left',
    });
  });

  it('has a span as activatorWrapper by default', () => {
    const popover = mountWithApp(<HoverCard {...defaultProps} />);
    expect(popover.children[0].type).toBe('span');
  });

  it('has a div as activatorWrapper when activatorWrapper prop is set to div', () => {
    const popover = mountWithApp(
      <HoverCard {...defaultProps} activatorWrapper="div" />,
    );
    expect(popover.children[0].type).toBe('div');
  });

  it('passes fullWidth to PositionedOverlay', () => {
    const popover = mountWithApp(<HoverCard {...defaultProps} fullWidth />);

    expect(popover).toContainReactComponent(PositionedOverlay, {
      fullWidth: true,
    });
  });

  it("passes 'zIndexOverride' to PositionedOverlay", () => {
    const popover = mountWithApp(
      <HoverCard {...defaultProps} zIndexOverride={100} />,
    );

    expect(popover).toContainReactComponent(PositionedOverlay, {
      zIndexOverride: 100,
    });
  });
});
