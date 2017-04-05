import * as React from 'react';
import {shallow} from 'enzyme';
import ContentList from '..';

describe('<ContentList />', () => {
  it('sets the list type to ul when is a bullet list', () => {
    const list = shallow(<ContentList type="bullet">test</ContentList>);
    expect(list.find('ul').exists()).toBeTruthy();
  });

  it('sets the list type to ul when no type is provided', () => {
    const list = shallow(<ContentList>test</ContentList>);
    expect(list.find('ul').exists()).toBeTruthy();
  });

  it('sets the list type to ol when is a number list', () => {
    const list = shallow(<ContentList type="number">test</ContentList>);
    expect(list.find('ol').exists()).toBeTruthy();
  });
});
