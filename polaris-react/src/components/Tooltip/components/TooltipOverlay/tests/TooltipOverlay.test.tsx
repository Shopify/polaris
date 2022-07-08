import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {PositionedOverlay} from '../../../../PositionedOverlay';
import {TooltipOverlay} from '../TooltipOverlay';

describe('<TooltipOverlay />', () => {
  const defaultProps = {
    id: 'id',
    active: true,
    onClose: () => {},
    activator: null,
    coordinates: {x: 0, y: 0, cursorX: 0},
  };

  it('does not include aria label by default', () => {
    const activator = document.createElement('button');
    const tooltipOverlay = mountWithApp(
      <TooltipOverlay {...defaultProps} activator={activator}>
        Content
      </TooltipOverlay>,
    );
    expect(tooltipOverlay).not.toContainReactComponent('div', {
      'aria-label': expect.any(String),
    });
  });

  it('includes aria label when accessibilityLabel is provided', () => {
    const accessibilityLabel = 'accessibility label';
    const activator = document.createElement('button');
    const tooltipOverlay = mountWithApp(
      <TooltipOverlay {...defaultProps} activator={activator}>
        Content
      </TooltipOverlay>,
    );
    expect(tooltipOverlay).not.toContainReactComponent('div', {
      'aria-label': accessibilityLabel,
    });
  });

  it('passes the tooltipTransform state to PositionedOverlay as a transform string', () => {
    const activator = document.createElement('button');
    const tooltipOverlay = mountWithApp(
      <TooltipOverlay {...defaultProps} activator={activator}>
        Content
      </TooltipOverlay>,
    );

    expect(tooltipOverlay).toContainReactComponent(PositionedOverlay, {
      transform: expect.any(String),
    });
  });

  it('calculates the tooltip transform position based on the coordinates and the tooltip size', () => {
    const activator = document.createElement('button');
    const activatorRect = {width: 100, height: 0};
    const newCoordinates = {x: 200, y: 200, cursorX: 100};
    const tooltipOverlay = mountWithApp(
      <TooltipOverlay
        {...defaultProps}
        activator={activator}
        coordinates={newCoordinates}
      >
        Content
      </TooltipOverlay>,
    );

    const mockWindowSize = {width: 1299};

    const tooltipRect = {width: 100, height: 100};
    const centerX = activatorRect.width / 2;

    const originalPushSize = tooltipRect.width / 2 + 10;
    const pushSize = originalPushSize - centerX;

    const {x, y, cursorX} = newCoordinates;
    const hasHitRightBorder =
      cursorX + tooltipRect.width + 20 > mockWindowSize.width;
    const transformPositionX = hasHitRightBorder ? x - pushSize : x + pushSize;

    expect(tooltipOverlay).toContainReactComponent(PositionedOverlay, {
      transform: `translate(${transformPositionX}px, ${y}px)`,
    });
  });

  it('calls resize event handler on mount', () => {
    const activator = document.createElement('button');
    const tooltipOverlay = mountWithApp(
      <TooltipOverlay {...defaultProps} activator={activator}>
        Content
      </TooltipOverlay>,
    );

    const handleWindowResize = jest.spyOn(window, 'addEventListener');
    expect(handleWindowResize).not.toHaveBeenCalled();

    const mockWindowSize = {width: 400};
    window.innerWidth = mockWindowSize.width;

    tooltipOverlay.unmount();

    expect(handleWindowResize).toHaveBeenCalled();

    expect(window.innerWidth).toBe(400);
  });

  it('cleans up the window resize event handler on unmount', () => {
    const activator = document.createElement('button');
    const tooltipOverlay = mountWithApp(
      <TooltipOverlay {...defaultProps} activator={activator}>
        Content
      </TooltipOverlay>,
    );

    const remover = jest.spyOn(window, 'removeEventListener');

    tooltipOverlay.unmount();

    expect(remover).toHaveBeenCalled();
  });
});
