import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import Tag from '../Tag';

describe('<Tag />', () => {
  it('calls onRemove when remove button is clicked', () => {
    const spy = jest.fn();
    const tag = mountWithAppProvider(<Tag onRemove={spy} />);
    tag.find('button').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
