import React from 'react';
import {mountWithApp} from 'tests/utilities';
import {matchMedia} from '@shopify/jest-dom-mocks';

import {Portal} from '../../Portal';
import type {AlphaHoverCardProps} from '../AlphaHoverCard';
import {AlphaHoverCard} from '../AlphaHoverCard';
import {HoverCardOverlay} from '../components';

const defaultProps: AlphaHoverCardProps = {
  children: null,
  active: false,
  content: <div />,
  toggleActive: jest.fn(),
};

jest.mock('../../../utilities/breakpoints', () => ({
  ...jest.requireActual('../../../utilities/breakpoints'),
  useBreakpoints: jest.fn(),
}));

describe('<AlphaHoverCard />', () => {
  beforeEach(() => {
    matchMedia.mock();
    mockUseBreakpoints(true);
  });

  afterEach(() => {
    matchMedia.restore();
    jest.clearAllMocks();
  });

  it('renders a portal when active', () => {
    const hoverCard = mountWithApp<AlphaHoverCardProps>(
      <AlphaHoverCard {...defaultProps} active>
        <div>Activator</div>
      </AlphaHoverCard>,
    );
    expect(hoverCard).toContainReactComponent(Portal);
  });

  it('renders an activator when children are provided', () => {
    const hoverCard = mountWithApp<AlphaHoverCardProps>(
      <AlphaHoverCard {...defaultProps}>
        <div>Activator</div>
      </AlphaHoverCard>,
    );
    expect(hoverCard).toContainReactComponent('div', {children: 'Activator'});
  });

  it('renders the overlay when active is true', () => {
    const hoverCard = mountWithApp(
      <AlphaHoverCard {...defaultProps} active>
        <div>Activator</div>
      </AlphaHoverCard>,
    );
    expect(hoverCard).toContainReactComponent(HoverCardOverlay);
  });

  it('doesn’t render the overlay when active is false', () => {
    const hoverCard = mountWithApp(
      <AlphaHoverCard {...defaultProps}>
        <div>Activator</div>
      </AlphaHoverCard>,
    );
    expect(hoverCard).not.toContainReactComponent(HoverCardOverlay);
  });

  it("passes 'preferredPosition' to HoverCardOverlay", () => {
    const hoverCard = mountWithApp(
      <AlphaHoverCard {...defaultProps} active preferredPosition="above">
        <div>Activator</div>
      </AlphaHoverCard>,
    );

    expect(hoverCard).toContainReactComponent(HoverCardOverlay, {
      preferredPosition: 'above',
    });
  });

  it("passes 'preferredAlignment' to HoverCardOverlay", () => {
    const hoverCard = mountWithApp(
      <AlphaHoverCard {...defaultProps} active preferredAlignment="left">
        <div>Activator</div>
      </AlphaHoverCard>,
    );

    expect(hoverCard).toContainReactComponent(HoverCardOverlay, {
      preferredAlignment: 'left',
    });
  });

  it('has a span as activatorWrapper by default', () => {
    const hoverCard = mountWithApp(
      <AlphaHoverCard {...defaultProps}>
        <div>Activator</div>
      </AlphaHoverCard>,
    );
    expect(hoverCard.children[0].type).toBe('span');
  });

  it('has a div as activatorWrapper when activatorWrapper prop is set to div', () => {
    const hoverCard = mountWithApp(
      <AlphaHoverCard {...defaultProps} activatorWrapper="div">
        <div>Activator</div>
      </AlphaHoverCard>,
    );
    expect(hoverCard.children[0].type).toBe('div');
  });

  it("passes 'zIndexOverride' to HoverCardOverlay", () => {
    const hoverCard = mountWithApp(
      <AlphaHoverCard {...defaultProps} active zIndexOverride={100}>
        <div>Activator</div>
      </AlphaHoverCard>,
    );

    expect(hoverCard).toContainReactComponent(HoverCardOverlay, {
      zIndexOverride: 100,
    });
  });

  it('passes snapToParent to HoverCardOverlay', () => {
    const hoverCard = mountWithApp(
      <AlphaHoverCard {...defaultProps} active snapToParent>
        <div>Activator</div>
      </AlphaHoverCard>,
    );

    expect(hoverCard).toContainReactComponent(HoverCardOverlay, {
      snapToParent: true,
    });
  });

  it('passes content to HoverCardOverlay', () => {
    const hoverCard = mountWithApp(
      <AlphaHoverCard {...defaultProps} active>
        <div>Activator</div>
      </AlphaHoverCard>,
    );

    expect(hoverCard).toContainReactComponent(HoverCardOverlay, {
      children: <div />,
    });
  });

  it('renders an activator wrapper when children are provided', () => {
    const hoverCard = mountWithApp(
      <AlphaHoverCard {...defaultProps}>
        <div>Activator</div>
      </AlphaHoverCard>,
    );

    const wrapper = hoverCard.find('span');

    expect(wrapper?.domNode?.getAttribute('data-hovercard-activator')).toBe(
      'true',
    );
  });

  it('only renders the overlay when activator is provided', () => {
    const hoverCard = mountWithApp(
      <AlphaHoverCard
        {...defaultProps}
        activator={document.createElement('div')}
      />,
    );

    expect(hoverCard).toContainReactComponent(HoverCardOverlay);
    expect(hoverCard).not.toContainReactComponent('span', {
      className: 'ActivatorWrapper',
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
