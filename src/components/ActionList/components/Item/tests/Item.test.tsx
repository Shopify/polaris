import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';
import {UnstyledLink} from 'components';

import {Item} from '../Item';
import {TextStyle} from '../../../../TextStyle';

describe('<Item />', () => {
  it('adds a style property when the image prop is present', () => {
    const item = mountWithAppProvider(<Item image="some-image.png" />);
    const styledItem = item
      .find('span')
      .findWhere((node) => node.prop('style'));
    expect(styledItem.first().prop('style')).toHaveProperty(
      'backgroundImage',
      'url(some-image.png',
    );
  });

  it('fires onAction callback on click or keypress', () => {
    const mockOnAction = jest.fn();
    const item = mountWithAppProvider(<Item onAction={mockOnAction} />);
    item.find('button').simulate('click');
    expect(mockOnAction).toHaveBeenCalledTimes(1);
  });

  it('passes the external prop down to the link', () => {
    const item = mountWithAppProvider(
      <Item external url="https://www.shopify.com" />,
    );
    expect(item.find(UnstyledLink).prop('external')).toBe(true);
  });

  it('renders an ellipsis when the ellipsis prop is true', () => {
    const item = mountWithAppProvider(<Item content="Test" ellipsis />);
    expect(item.text()).toBe('Test…');
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
    const item = mountWithAppProvider(<Item ellipsis />);
    expect(item.text()).toBe('');
  });

  it('renders helpText when the helpText prop is defined', () => {
    const item = mountWithAppProvider(<Item helpText="Foo" />);
    expect(item.find(TextStyle).text()).toBe('Foo');
  });

  it('passes `accessibilityLabel` to `<button />`', () => {
    const mockAccessibilityLabel = 'mock label';
    const item = mountWithAppProvider(
      <Item accessibilityLabel={mockAccessibilityLabel} onAction={noop} />,
    );

    expect(item.find('button').prop('aria-label')).toBe(mockAccessibilityLabel);
  });

  it('passes `accessibilityLabel` to `<UnstyledLink />`', () => {
    const mockAccessibilityLabel = 'mock label';
    const item = mountWithAppProvider(
      <Item
        accessibilityLabel={mockAccessibilityLabel}
        url="https://www.shopify.com"
      />,
    );

    expect(item.find(UnstyledLink).prop('aria-label')).toBe(
      mockAccessibilityLabel,
    );
  });

  it('passes `url` as null to `<UnstyledLink />` when disabled', () => {
    const item = mountWithApp(<Item url="https://shopify.com" disabled />);

    expect(item.find(UnstyledLink)!.prop('url')).toBeNull();
  });

  it('passes `onClick` as null to `<UnstyledLink />` when disabled', () => {
    const item = mountWithApp(
      <Item onAction={noop} disabled url="https://shopify.com" />,
    );

    expect(item.find(UnstyledLink)!.prop('onClick')).toBeNull();
  });
});

function noop() {}
