import * as React from 'react';
import {shallow} from 'enzyme';
import List from '..';

describe('<List />', () => {
  it('sets the list type to ul when is a bullet list', () => {
    const list = shallow(<List type="bullet">test</List>);
    expect(list.find('ul').exists()).toBeTruthy();
  });

  it('sets the list type to ul when no type is provided', () => {
    const list = shallow(<List>test</List>);
    expect(list.find('ul').exists()).toBeTruthy();
  });

  it('sets the list type to ol when is a number list', () => {
    const list = shallow(<List type="number">test</List>);
    expect(list.find('ol').exists()).toBeTruthy();
  });
});
