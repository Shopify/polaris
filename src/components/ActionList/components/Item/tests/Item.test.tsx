import React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import {UnstyledLink} from 'components';
import Item from '../Item';
import TextStyle from '../../../../TextStyle';

describe('<Item />', () => {
  it('adds a style property when the image prop is present', () => {
    const item = mountWithAppProvider(<Item image="some-image.png" />);
    const styledItem = item.find('div').findWhere((node) => node.prop('style'));
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

  it('does not render a label when content is undefined and ellipsis is true', () => {
    const item = mountWithAppProvider(<Item ellipsis />);
    expect(item.text()).toBe('');
  });

  it('renders helpText when the helpText prop is defined', () => {
    const item = mountWithAppProvider(<Item helpText="Foo" />);
    expect(item.find(TextStyle).text()).toBe('Foo');
  });
});
