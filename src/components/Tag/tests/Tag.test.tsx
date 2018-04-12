import * as React from 'react';
import {mountWithProvider} from '../../../../tests/utilities';
import Tag from '../Tag';

describe('<Tag />', () => {
  it('onRemove gets called when remove button is clicked', () => {
    const spy = jest.fn();
    const tag = mountWithProvider(<Tag onRemove={spy} />);
    tag.find('button').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
