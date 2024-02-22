import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {HoverCardOverlay} from '../HoverCardOverlay';
import {PositionedOverlay} from '../../../PositionedOverlay';

const defaultProps = {
  id: 'id',
  active: true,
  onMouseEnter: jest.fn(),
  onMouseLeave: jest.fn(),
  activator: document.createElement('div'),
  dynamic: false,
};

describe('<HoverCardOverlay />', () => {
  it('does not render PositionedOverlay when not active', () => {
    const hoverCardOverlay = mountWithApp(
      <HoverCardOverlay {...defaultProps} active={false}>
        Test
      </HoverCardOverlay>,
    );
    expect(hoverCardOverlay).not.toContainReactComponent(PositionedOverlay);
  });

  it('renders PositionedOverlay when active', () => {
    const hoverCardOverlay = mountWithApp(
      <HoverCardOverlay {...defaultProps}>Test</HoverCardOverlay>,
    );
    expect(hoverCardOverlay).toContainReactComponent(PositionedOverlay, {
      active: true,
    });
  });

  it('passes props through to PositionedOverlay when provided', () => {
    const hoverCardOverlay = mountWithApp(
      <HoverCardOverlay
        {...defaultProps}
        preferredAlignment="left"
        preferredPosition="above"
        zIndexOverride={100}
      >
        Test
      </HoverCardOverlay>,
    );
    expect(hoverCardOverlay).toContainReactComponent(PositionedOverlay, {
      zIndexOverride: 100,
      preferredAlignment: 'left',
      preferredPosition: 'above',
    });
  });

  it('renders its children', () => {
    const hoverCardOverlay = mountWithApp(
      <HoverCardOverlay {...defaultProps}>Test</HoverCardOverlay>,
    );
    expect(hoverCardOverlay).toContainReactText('Test');
  });

  it('sets a min-width if its children have a min-width', () => {
    const children = <div style={{minWidth: '100px'}}>Test</div>;
    const hoverCardOverlay = mountWithApp(
      <HoverCardOverlay {...defaultProps}>{children}</HoverCardOverlay>,
    );

    expect(hoverCardOverlay).toContainReactComponent('div', {
      style: expect.objectContaining({'--pc-hover-card-min-width': '100px'}),
    });
  });
});
