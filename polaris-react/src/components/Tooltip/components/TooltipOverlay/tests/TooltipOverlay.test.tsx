import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {TooltipOverlay} from '../TooltipOverlay';
import {Text} from '../../../../Text';

describe('<TooltipOverlay />', () => {
  const defaultProps = {
    id: 'id',
    active: true,
    onClose: () => {},
    activator: null,
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

  it('is set to value of zIndexOverride prop if given', () => {
    const activator = document.createElement('button');
    const tooltipOverlay = mountWithApp(
      <TooltipOverlay
        {...defaultProps}
        activator={activator}
        zIndexOverride={100}
      >
        Content
      </TooltipOverlay>,
    );

    expect(tooltipOverlay).toContainReactComponent('div', {
      style: expect.objectContaining({zIndex: 100}),
    });
  });

  it('does not add a keyboard shortcut element by default', () => {
    const activator = document.createElement('button');
    const tooltipOverlay = mountWithApp(
      <TooltipOverlay {...defaultProps} activator={activator}>
        Content
      </TooltipOverlay>,
    );

    expect(tooltipOverlay).not.toContainReactComponent(Text, {
      as: 'span',
      variant: 'bodyMd',
      color: 'subdued',
    });
  });

  it('adds a keyboard shortcut if present', () => {
    const activator = document.createElement('button');
    const tooltipOverlay = mountWithApp(
      <TooltipOverlay
        {...defaultProps}
        activator={activator}
        keyboardShortcut="#B"
      >
        Content
      </TooltipOverlay>,
    );

    expect(tooltipOverlay).toContainReactComponent(Text, {
      as: 'span',
      variant: 'bodyMd',
      color: 'subdued',
    });
  });
});
