import * as React from 'react';
import {shallow} from 'enzyme';
import Item from '../Item';
import UnstyledLink from '../../UnstyledLink';

describe('<Item />', () => {
  it('adds a style property when the image prop is present', () => {
    const item = shallow(<Item image="some-image.png" />);
    const styledItem = item.find('div').findWhere((node) => node.prop('style'));
    expect(styledItem.prop('style')).toHaveProperty(
      'backgroundImage',
      'url(some-image.png',
    );
  });

  it('fires onAction callback on click or keypress', () => {
    const mockOnAction = jest.fn();
    const item = shallow(<Item onAction={mockOnAction} />);
    item.find('button').simulate('click');
    expect(mockOnAction).toHaveBeenCalledTimes(1);
  });

  it('passes the external prop down to the link', () => {
    const item = shallow(<Item external url="https://www.shopify.com" />);
    expect(item.find(UnstyledLink).prop('external')).toBe(true);
  });
});
