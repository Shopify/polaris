import * as React from 'react';
import {mountWithAppProvider} from '../../../../tests/utilities';
import Tag from '../Tag';

describe('<Tag />', () => {
  it('onRemove gets called when remove button is clicked', () => {
    const spy = jest.fn();
    const tag = mountWithAppProvider(<Tag onRemove={spy} />);
    tag.find('button').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
