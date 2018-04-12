import * as React from 'react';
import {mount} from 'enzyme';
import Tag from '../Tag';

describe('<Tag />', () => {
  it('onRemove gets called when remove button is clicked', () => {
    const spy = jest.fn();
    const tag = mount(<Tag onRemove={spy} />);
    tag.find('button').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
