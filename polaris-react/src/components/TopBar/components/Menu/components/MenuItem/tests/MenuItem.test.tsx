import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {UnstyledLink} from '../../../../../../UnstyledLink';
import {MenuItem} from '../MenuItem';
import {TruncateText} from '../../../../../../TruncateText';

describe('<MenuItem />', () => {
  it('fires onAction callback on click or keypress', () => {
    const mockOnAction = jest.fn();
    const item = mountWithApp(<MenuItem onAction={mockOnAction} />);
    item.find('a')!.trigger('onClick');
    expect(mockOnAction).toHaveBeenCalledTimes(1);
  });

  it('passes the external prop down to the link', () => {
    const item = mountWithApp(
      <MenuItem external url="https://www.shopify.com" />,
    );
    expect(item).toContainReactComponent(UnstyledLink, {
      external: true,
    });
  });

  it('renders a suffix when the suffix prop is defined', () => {
    const Suffix = () => <span>Suffix</span>;
    const item = mountWithApp(<MenuItem suffix={<Suffix />} />);
    expect(item).toContainReactComponent(Suffix);
  });

  it('renders a prefix when the prefix prop is defined', () => {
    const Prefix = () => <span>Prefix</span>;
    const item = mountWithApp(<MenuItem prefix={<Prefix />} />);
    expect(item).toContainReactComponent(Prefix);
  });

  it('pases accessibilityLabel to the link', () => {
    const item = mountWithApp(<MenuItem accessibilityLabel="test" />);
    expect(item).toContainReactComponent(UnstyledLink, {
      'aria-label': 'test',
    });
  });

  it('passes url to the link', () => {
    const item = mountWithApp(<MenuItem url="https://shopify.com" />);
    expect(item).toContainReactComponent(UnstyledLink, {
      url: 'https://shopify.com',
    });
  });

  it('truncate content when the truncate prop is true', () => {
    const item = mountWithApp(
      <MenuItem
        content="Test longer than usual string that probably overflows"
        truncate
      />,
    );
    expect(item).toContainReactComponent(TruncateText, {
      children: 'Test longer than usual string that probably overflows',
    });
  });
});
