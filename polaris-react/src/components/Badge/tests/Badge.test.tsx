import React from 'react';
import {mountWithApp} from 'tests/utilities';
import {GlobeMinor} from '@shopify/polaris-icons';

// eslint-disable-next-line import/no-deprecated
import {VisuallyHidden} from '../../VisuallyHidden';
import {Icon} from '../../Icon';
import {Badge} from '../Badge';

describe('<Badge />', () => {
  it('renders its children', () => {
    const badge = mountWithApp(<Badge>Badge test</Badge>);
    expect(badge.text()).toBe('Badge test');
  });

  it('accepts a status prop and renders a visually hidden label', () => {
    const badge = mountWithApp(<Badge status="success" />);
    // eslint-disable-next-line import/no-deprecated
    expect(badge).toContainReactComponent(VisuallyHidden);
  });

  it('accepts a progress prop and renders a visually hidden label', () => {
    const badge = mountWithApp(<Badge progress="incomplete" />);
    // eslint-disable-next-line import/no-deprecated
    expect(badge).toContainReactComponent(VisuallyHidden);
  });

  it('renders progress and status labels in the same element', () => {
    const badge = mountWithApp(
      <Badge progress="incomplete" status="attention" />,
    );

    // eslint-disable-next-line import/no-deprecated
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
      className: 'Pip progressIncomplete',
    });
  });

  it('does not render an icon when icon is not provided', () => {
    const badge = mountWithApp(<Badge status="attention" />);

    expect(badge).not.toContainReactComponent(Icon);
  });

  it('renders an icon when icon is provided', () => {
    const badge = mountWithApp(<Badge icon={GlobeMinor} />);

    expect(badge).toContainReactComponent(Icon, {
      source: GlobeMinor,
    });
  });

  it('prefers the icon to pip styles when both progress and icon are provided', () => {
    const badge = mountWithApp(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <Badge progress="incomplete" icon={GlobeMinor} />,
    );

    expect(badge).toContainReactComponent(Icon, {
      source: GlobeMinor,
    });
    expect(badge).not.toContainReactComponent('span', {
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

    // eslint-disable-next-line import/no-deprecated
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

    // eslint-disable-next-line import/no-deprecated
    expect(badge).not.toContainReactComponent(VisuallyHidden, {
      children: 'Attention Incomplete',
    });
  });

  it('renders default accessibility label when `statusAndProgressLabelOverride` is not provided', () => {
    let badge = mountWithApp(
      <Badge status="attention" progress="incomplete" />,
    );

    // eslint-disable-next-line import/no-deprecated
    expect(badge).toContainReactComponent(VisuallyHidden, {
      children: 'Attention Incomplete',
    });

    badge = mountWithApp(<Badge progress="incomplete" />);

    // eslint-disable-next-line import/no-deprecated
    expect(badge).toContainReactComponent(VisuallyHidden, {
      children: 'Incomplete',
    });

    badge = mountWithApp(<Badge status="attention" />);

    // eslint-disable-next-line import/no-deprecated
    expect(badge).toContainReactComponent(VisuallyHidden, {
      children: 'Attention',
    });

    badge = mountWithApp(<Badge />);

    // eslint-disable-next-line import/no-deprecated
    expect(badge).not.toContainReactComponent(VisuallyHidden);
  });
});

describe('<Badge.Pip />', () => {
  it('renders default accessibility label when `statusAndProgressLabelOverride` is not provided', () => {
    let badge = mountWithApp(
      <Badge.Pip status="attention" progress="incomplete" />,
    );

    // eslint-disable-next-line import/no-deprecated
    expect(badge).toContainReactComponent(VisuallyHidden, {
      children: 'Attention Incomplete',
    });

    badge = mountWithApp(<Badge.Pip progress="partiallyComplete" />);

    // eslint-disable-next-line import/no-deprecated
    expect(badge).toContainReactComponent(VisuallyHidden, {
      children: 'Partially complete',
    });

    badge = mountWithApp(<Badge.Pip status="attention" />);

    // eslint-disable-next-line import/no-deprecated
    expect(badge).toContainReactComponent(VisuallyHidden, {
      children: 'Attention Complete',
    });

    badge = mountWithApp(<Badge.Pip />);

    // eslint-disable-next-line import/no-deprecated
    expect(badge).toContainReactComponent(VisuallyHidden, {
      children: 'Complete',
    });
  });
});
