import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Item} from '../Item';
import {Text} from '../../../../Text';
import {UnstyledLink} from '../../../../UnstyledLink';

describe('<Item />', () => {
  it('adds a style property when the image prop is present', () => {
    const item = mountWithApp(<Item image="some-image.png" />);
    expect(item).toContainReactComponent('span', {
      style: {
        backgroundImage: 'url(some-image.png',
      },
    });
  });

  it('fires onAction callback on click or keypress', () => {
    const mockOnAction = jest.fn();
    const item = mountWithApp(<Item onAction={mockOnAction} />);
    item.find('button')!.trigger('onClick');
    expect(mockOnAction).toHaveBeenCalledTimes(1);
  });

  it('calls onMouseEnter when the mouse enters button', () => {
    const onMouseEnterSpy = jest.fn();
    const button = mountWithApp(<Item onMouseEnter={onMouseEnterSpy} />);
    button.find('button')!.trigger('onMouseEnter');
    expect(onMouseEnterSpy).toHaveBeenCalledTimes(1);
  });

  it('passes the external prop down to the link', () => {
    const item = mountWithApp(<Item external url="https://www.shopify.com" />);
    expect(item).toContainReactComponent(UnstyledLink, {
      external: true,
    });
  });

  it('renders an ellipsis when the ellipsis prop is true', () => {
    const item = mountWithApp(<Item content="Test" ellipsis />);
    expect(item).toContainReactText('Test…');
  });

  it('renders a suffix when the suffix prop is defined', () => {
    const Suffix = () => <span>Suffix</span>;
    const item = mountWithApp(<Item suffix={<Suffix />} />);
    expect(item).toContainReactComponent(Suffix);
  });

  it('renders a prefix when the prefix prop is defined', () => {
    const Prefix = () => <span>Prefix</span>;
    const item = mountWithApp(<Item prefix={<Prefix />} />);
    expect(item).toContainReactComponent(Prefix);
  });

  it('does not render a label when content is undefined and ellipsis is true', () => {
    const item = mountWithApp(<Item ellipsis />);
    expect(item).toContainReactText('');
  });

  it('renders helpText when the helpText prop is defined', () => {
    const helpText = 'Foo';
    const item = mountWithApp(<Item helpText={helpText} />);
    expect(item.find(Text)).toContainReactText(helpText);
  });

  it('passes `accessibilityLabel` to `<button />`', () => {
    const mockAccessibilityLabel = 'mock label';
    const item = mountWithApp(
      <Item accessibilityLabel={mockAccessibilityLabel} onAction={noop} />,
    );
    expect(item).toContainReactComponent('button', {
      'aria-label': mockAccessibilityLabel,
    });
  });

  it('passes `accessibilityLabel` to `<UnstyledLink />`', () => {
    const mockAccessibilityLabel = 'mock label';
    const item = mountWithApp(
      <Item
        accessibilityLabel={mockAccessibilityLabel}
        url="https://www.shopify.com"
      />,
    );
    expect(item).toContainReactComponent(UnstyledLink, {
      'aria-label': mockAccessibilityLabel,
    });
  });

  it('passes `url` as null to `<UnstyledLink />` when disabled', () => {
    const item = mountWithApp(<Item url="https://shopify.com" disabled />);
    expect(item).toContainReactComponent(UnstyledLink, {
      url: null,
    });
  });

  it('passes `onClick` as null to `<UnstyledLink />` when disabled', () => {
    const item = mountWithApp(
      <Item onAction={noop} disabled url="https://shopify.com" />,
    );
    expect(item).toContainReactComponent(UnstyledLink, {
      onClick: null,
    });
  });

  it('truncates content when the truncate prop is true', () => {
    const item = mountWithApp(<Item content="Test" truncate />);
    expect(item).toContainReactComponent(Text, {
      children: 'Test',
      truncate: true,
    });
  });

  it('does not truncate content when the truncate prop is false', () => {
    const item = mountWithApp(<Item content="Test" truncate={false} />);
    expect(item).not.toContainReactComponent(Text, {
      children: 'Test',
      truncate: true,
    });
  });
});

function noop() {}
