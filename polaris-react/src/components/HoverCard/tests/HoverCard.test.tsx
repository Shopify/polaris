import React from 'react';
import {mountWithApp} from 'tests/utilities';
import {matchMedia} from '@shopify/jest-dom-mocks';

import {Portal} from '../../Portal';
import type {HoverCardProps} from '../HoverCard';
import {HoverCard} from '../HoverCard';
import {HoverCardOverlay} from '../components';

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

  it('renders an activator when children are provided', () => {
    const hoverCard = mountWithApp<HoverCardProps>(
      <HoverCard {...defaultProps}>
        <div>Activator</div>
      </HoverCard>,
    );
    expect(hoverCard).toContainReactComponent('div', {children: 'Activator'});
  });

  it('renders the overlay when active is true', () => {
    const hoverCard = mountWithApp(
      <HoverCard {...defaultProps} active>
        <div>Activator</div>
      </HoverCard>,
    );
    expect(hoverCard).toContainReactComponent(HoverCardOverlay);
  });

  it('doesn’t render the overlay when active is false', () => {
    const hoverCard = mountWithApp(
      <HoverCard {...defaultProps}>
        <div>Activator</div>
      </HoverCard>,
    );
    expect(hoverCard).not.toContainReactComponent(HoverCardOverlay);
  });

  it("passes 'preferredPosition' to HoverCardOverlay", () => {
    const hoverCard = mountWithApp(
      <HoverCard {...defaultProps} active preferredPosition="above">
        <div>Activator</div>
      </HoverCard>,
    );

    expect(hoverCard).toContainReactComponent(HoverCardOverlay, {
      preferredPosition: 'above',
    });
  });

  it("passes 'preferredAlignment' to HoverCardOverlay", () => {
    const hoverCard = mountWithApp(
      <HoverCard {...defaultProps} active preferredAlignment="left">
        <div>Activator</div>
      </HoverCard>,
    );

    expect(hoverCard).toContainReactComponent(HoverCardOverlay, {
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

  it("passes 'zIndexOverride' to HoverCardOverlay", () => {
    const hoverCard = mountWithApp(
      <HoverCard {...defaultProps} active zIndexOverride={100}>
        <div>Activator</div>
      </HoverCard>,
    );

    expect(hoverCard).toContainReactComponent(HoverCardOverlay, {
      zIndexOverride: 100,
    });
  });

  it('passes snapToParent to HoverCardOverlay', () => {
    const hoverCard = mountWithApp(
      <HoverCard {...defaultProps} active snapToParent>
        <div>Activator</div>
      </HoverCard>,
    );

    expect(hoverCard).toContainReactComponent(HoverCardOverlay, {
      snapToParent: true,
    });
  });

  it('passes content to HoverCardOverlay', () => {
    const hoverCard = mountWithApp(
      <HoverCard {...defaultProps} active>
        <div>Activator</div>
      </HoverCard>,
    );

    expect(hoverCard).toContainReactComponent(HoverCardOverlay, {
      children: <div />,
    });
  });

  it('renders an activator wrapper when children are provided', () => {
    const hoverCard = mountWithApp(
      <HoverCard {...defaultProps}>
        <div>Activator</div>
      </HoverCard>,
    );

    const wrapper = hoverCard.find('span');

    expect(wrapper?.domNode?.getAttribute('data-hovercard-activator')).toBe(
      'true',
    );
  });

  it('only renders the overlay when activator is provided', () => {
    const hoverCard = mountWithApp(
      <HoverCard {...defaultProps} activator={document.createElement('div')} />,
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
