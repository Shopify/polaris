import * as React from 'react';
import {shallow} from 'enzyme';
import Item from '../Item';

describe('<Item />', () => {
  it('adds a style property when the image prop is present', () => {
    const item = shallow(<Item image="some-image.png" />);
    const styledItem = item.find('div').findWhere((node) => node.prop('style'));
    expect(styledItem.prop('style')).toHaveProperty('backgroundImage', 'url(some-image.png');
  });
});
