import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';
import {VisuallyHidden} from 'components';

import {Badge} from '../Badge';

describe('<Badge />', () => {
  it('renders its children', () => {
    const badge = mountWithAppProvider(<Badge>Badge test</Badge>);
    expect(badge.text()).toBe('Badge test');
  });

  it('accepts a status prop and renders a visually hidden label', () => {
    const badge = mountWithAppProvider(<Badge status="success" />);
    expect(badge.find(VisuallyHidden).exists()).toBe(true);
  });

  it('accepts a progress prop and renders a visually hidden label', () => {
    const badge = mountWithAppProvider(<Badge progress="incomplete" />);
    expect(badge.find(VisuallyHidden).exists()).toBe(true);
  });

  it('renders progress and status labels in the same element', () => {
    const badge = mountWithApp(
      <Badge progress="incomplete" status="attention" />,
    );

    expect(badge).toContainReactComponentTimes(VisuallyHidden, 1, {
      children: 'Attention Incomplete',
    });
  });

  it('does not add pip styles when progress is not provided', () => {
    const badge = mountWithApp(<Badge status="attention" />);

    expect(badge).not.toContainReactComponent('span', {
      className: 'Pip',
    });
  });

  it('renders with pip styles when progress is provided', () => {
    const badge = mountWithApp(<Badge progress="incomplete" />);

    expect(badge).toContainReactComponent('span', {
      className: 'Pip',
    });
  });

  it('renders with a custom accessibilityLabel when a `statusAndProgressLabelOverride` is provided', () => {
    const mockAccessibilityLabel = 'mock accessibilityLabel';
    const badge = mountWithApp(
      <Badge
        status="attention"
        progress="incomplete"
        statusAndProgressLabelOverride={mockAccessibilityLabel}
      />,
    );

    expect(badge).toContainReactComponent(VisuallyHidden, {
      children: mockAccessibilityLabel,
    });
  });

  it('does not render progress or status accessibility labels when a `statusAndProgressLabelOverride` is provided', () => {
    const mockAccessibilityLabel = 'mock accessibilityLabel';
    const badge = mountWithApp(
      <Badge
        status="attention"
        progress="incomplete"
        statusAndProgressLabelOverride={mockAccessibilityLabel}
      />,
    );

    expect(badge).not.toContainReactComponent(VisuallyHidden, {
      children: 'Attention Incomplete',
    });
  });
});
