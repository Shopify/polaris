import React from 'react';
import {mountWithApp} from 'tests/utilities';
import {matchMedia} from '@shopify/jest-dom-mocks';

import {Portal} from '../../Portal';
import {PositionedOverlay} from '../../PositionedOverlay';
import type {HoverCardProps} from '../HoverCard';
import {HoverCard} from '../HoverCard';

const defaultProps: HoverCardProps = {
  children: null,
  active: false,
  content: <div />,
  toggleActive: jest.fn(),
};

jest.mock('../../../utilities/breakpoints', () => ({
  ...jest.requireActual('../../../utilities/breakpoints'),
  useBreakpoints: jest.fn(),
}));

describe('<HoverCard />', () => {
  beforeEach(() => {
    matchMedia.mock();
    mockUseBreakpoints(true);
  });

  afterEach(() => {
    matchMedia.restore();
    jest.clearAllMocks();
  });

  it('renders a portal when active', () => {
    const hoverCard = mountWithApp<HoverCardProps>(
      <HoverCard {...defaultProps} active>
        <div>Activator</div>
      </HoverCard>,
    );
    expect(hoverCard).toContainReactComponent(Portal);
  });

  it('renders an activator', () => {
    const hoverCard = mountWithApp<HoverCardProps>(
      <HoverCard {...defaultProps}>
        <div>Activator</div>
      </HoverCard>,
    );
    expect(hoverCard).toContainReactComponent('div', {children: 'Activator'});
  });

  it('renders a positionedOverlay when active is true', () => {
    const hoverCard = mountWithApp(
      <HoverCard {...defaultProps} active>
        <div>Activator</div>
      </HoverCard>,
    );
    expect(hoverCard).toContainReactComponent(PositionedOverlay);
  });

  it('doesn’t render a hoverCard when active is false', () => {
    const hoverCard = mountWithApp(
      <HoverCard {...defaultProps}>
        <div>Activator</div>
      </HoverCard>,
    );
    expect(hoverCard).not.toContainReactComponent(PositionedOverlay);
  });

  it("passes 'preferredPosition' to PositionedOverlay", () => {
    const hoverCard = mountWithApp(
      <HoverCard {...defaultProps} active preferredPosition="above">
        <div>Activator</div>
      </HoverCard>,
    );

    expect(hoverCard).toContainReactComponent(PositionedOverlay, {
      preferredPosition: 'above',
    });
  });

  it("passes 'preferredAlignment' to PositionedOverlay", () => {
    const hoverCard = mountWithApp(
      <HoverCard {...defaultProps} active preferredAlignment="left">
        <div>Activator</div>
      </HoverCard>,
    );

    expect(hoverCard).toContainReactComponent(PositionedOverlay, {
      preferredAlignment: 'left',
    });
  });

  it('has a span as activatorWrapper by default', () => {
    const hoverCard = mountWithApp(
      <HoverCard {...defaultProps}>
        <div>Activator</div>
      </HoverCard>,
    );
    expect(hoverCard.children[0].type).toBe('span');
  });

  it('has a div as activatorWrapper when activatorWrapper prop is set to div', () => {
    const hoverCard = mountWithApp(
      <HoverCard {...defaultProps} activatorWrapper="div">
        <div>Activator</div>
      </HoverCard>,
    );
    expect(hoverCard.children[0].type).toBe('div');
  });

  it("passes 'zIndexOverride' to PositionedOverlay", () => {
    const hoverCard = mountWithApp(
      <HoverCard {...defaultProps} active zIndexOverride={100}>
        <div>Activator</div>
      </HoverCard>,
    );

    expect(hoverCard).toContainReactComponent(PositionedOverlay, {
      zIndexOverride: 100,
    });
  });
});

function mockUseBreakpoints(mdUp: boolean) {
  const useBreakpoints: jest.Mock = jest.requireMock(
    '../../../utilities/breakpoints',
  ).useBreakpoints;

  useBreakpoints.mockReturnValue({
    mdUp,
  });
}
