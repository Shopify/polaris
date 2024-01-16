import React from 'react';
import {mountWithApp} from 'tests/utilities';
import {GlobeIcon} from '@shopify/polaris-icons';

import {Text} from '../../Text';
import {Icon} from '../../Icon';
import {Badge} from '../Badge';

describe('<Badge />', () => {
  it('renders its children', () => {
    const badge = mountWithApp(<Badge>Badge test</Badge>);
    expect(badge.text()).toBe('Badge test');
  });

  it('accepts a tone prop and renders a visually hidden label', () => {
    const badge = mountWithApp(<Badge tone="success" />);
    expect(badge).toContainReactComponent(Text, {visuallyHidden: true});
  });

  it('accepts a progress prop and renders a visually hidden label', () => {
    const badge = mountWithApp(<Badge progress="incomplete" />);
    expect(badge).toContainReactComponent(Text, {visuallyHidden: true});
  });

  it('renders progress and tone labels in the same element', () => {
    const badge = mountWithApp(
      <Badge progress="incomplete" tone="attention" />,
    );

    expect(badge).toContainReactComponentTimes(Text, 1, {
      children: 'Attention Incomplete',
      visuallyHidden: true,
    });
  });

  it('does not add pip styles when progress is not provided', () => {
    const badge = mountWithApp(<Badge tone="attention" />);
    expect(badge).not.toContainReactComponent(Icon);
  });

  it('renders with pip styles when progress is provided', () => {
    const badge = mountWithApp(<Badge progress="incomplete" />);

    expect(badge).toContainReactComponent(Icon);
  });

  it('does not render an icon when icon is not provided', () => {
    const badge = mountWithApp(<Badge tone="attention" />);

    expect(badge).not.toContainReactComponent(Icon);
  });

  it('renders an icon when icon is provided', () => {
    const badge = mountWithApp(<Badge icon={GlobeIcon} />);

    expect(badge).toContainReactComponent(Icon, {
      source: GlobeIcon,
    });
  });

  it('prefers the icon to pip styles when both progress and icon are provided', () => {
    const badge = mountWithApp(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <Badge progress="incomplete" icon={GlobeIcon} />,
    );

    expect(badge).toContainReactComponent(Icon, {
      source: GlobeIcon,
    });
    expect(badge).not.toContainReactComponent('span', {
      className: 'Pip',
    });
  });

  it('renders with a custom accessibilityLabel when a `toneAndProgressLabelOverride` is provided', () => {
    const mockAccessibilityLabel = 'mock accessibilityLabel';
    const badge = mountWithApp(
      <Badge
        tone="attention"
        progress="incomplete"
        toneAndProgressLabelOverride={mockAccessibilityLabel}
      />,
    );

    expect(badge).toContainReactComponent(Text, {
      children: mockAccessibilityLabel,
      visuallyHidden: true,
    });
  });

  it('does not render progress or tone accessibility labels when a `toneAndProgressLabelOverride` is provided', () => {
    const mockAccessibilityLabel = 'mock accessibilityLabel';
    const badge = mountWithApp(
      <Badge
        tone="attention"
        progress="incomplete"
        toneAndProgressLabelOverride={mockAccessibilityLabel}
      />,
    );

    expect(badge).not.toContainReactComponent(Text, {
      children: 'Attention Incomplete',
      visuallyHidden: true,
    });
  });

  it('renders default accessibility label when `toneAndProgressLabelOverride` is not provided', () => {
    let badge = mountWithApp(<Badge tone="attention" progress="incomplete" />);

    expect(badge).toContainReactComponent(Text, {
      children: 'Attention Incomplete',
      visuallyHidden: true,
    });

    badge = mountWithApp(<Badge progress="incomplete" />);

    expect(badge).toContainReactComponent(Text, {
      children: 'Incomplete',
      visuallyHidden: true,
    });

    badge = mountWithApp(<Badge tone="attention" />);

    expect(badge).toContainReactComponent(Text, {
      children: 'Attention',
      visuallyHidden: true,
    });

    badge = mountWithApp(<Badge />);

    expect(badge).not.toContainReactComponent(Text, {visuallyHidden: true});
  });
});

describe('<Badge.Pip />', () => {
  it('renders default accessibility label when `toneAndProgressLabelOverride` is not provided', () => {
    let badge = mountWithApp(
      <Badge.Pip tone="attention" progress="incomplete" />,
    );

    expect(badge).toContainReactComponent(Text, {
      children: 'Attention Incomplete',
      visuallyHidden: true,
    });

    badge = mountWithApp(<Badge.Pip progress="partiallyComplete" />);

    expect(badge).toContainReactComponent(Text, {
      children: 'Partially complete',
      visuallyHidden: true,
    });

    badge = mountWithApp(<Badge.Pip tone="attention" />);

    expect(badge).toContainReactComponent(Text, {
      children: 'Attention Complete',
      visuallyHidden: true,
    });

    badge = mountWithApp(<Badge.Pip />);

    expect(badge).toContainReactComponent(Text, {
      children: 'Complete',
      visuallyHidden: true,
    });
  });
});
