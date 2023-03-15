import {mountWithApp} from 'tests/utilities';
import {GlobeMinor} from '@shopify/polaris-icons';

import {Text} from '../../Text';
import {Icon} from '../../Icon';
import {Badge} from '../Badge';

describe('<Badge />', () => {
  it('renders its children', () => {
    const badge = mountWithApp(<Badge>Badge test</Badge>);
    expect(badge.text()).toBe('Badge test');
  });

  it('accepts a status prop and renders a visually hidden label', () => {
    const badge = mountWithApp(<Badge status="success" />);
    expect(badge).toContainReactComponent(Text, {visuallyHidden: true});
  });

  it('accepts a progress prop and renders a visually hidden label', () => {
    const badge = mountWithApp(<Badge progress="incomplete" />);
    expect(badge).toContainReactComponent(Text, {visuallyHidden: true});
  });

  it('renders progress and status labels in the same element', () => {
    const badge = mountWithApp(
      <Badge progress="incomplete" status="attention" />,
    );

    expect(badge).toContainReactComponentTimes(Text, 1, {
      children: 'Attention Incomplete',
      visuallyHidden: true,
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

    expect(badge).toContainReactComponent(Text, {
      children: mockAccessibilityLabel,
      visuallyHidden: true,
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

    expect(badge).not.toContainReactComponent(Text, {
      children: 'Attention Incomplete',
      visuallyHidden: true,
    });
  });

  it('renders default accessibility label when `statusAndProgressLabelOverride` is not provided', () => {
    let badge = mountWithApp(
      <Badge status="attention" progress="incomplete" />,
    );

    expect(badge).toContainReactComponent(Text, {
      children: 'Attention Incomplete',
      visuallyHidden: true,
    });

    badge = mountWithApp(<Badge progress="incomplete" />);

    expect(badge).toContainReactComponent(Text, {
      children: 'Incomplete',
      visuallyHidden: true,
    });

    badge = mountWithApp(<Badge status="attention" />);

    expect(badge).toContainReactComponent(Text, {
      children: 'Attention',
      visuallyHidden: true,
    });

    badge = mountWithApp(<Badge />);

    expect(badge).not.toContainReactComponent(Text, {visuallyHidden: true});
  });
});

describe('<Badge.Pip />', () => {
  it('renders default accessibility label when `statusAndProgressLabelOverride` is not provided', () => {
    let badge = mountWithApp(
      <Badge.Pip status="attention" progress="incomplete" />,
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

    badge = mountWithApp(<Badge.Pip status="attention" />);

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
