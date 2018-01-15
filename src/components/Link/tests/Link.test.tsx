import * as React from 'react';
import {mount} from 'enzyme';
import Link from '../Link';

describe('<Link />', () => {
  it('onClick gets called when clicking', () => {
    const spy = jest.fn();
    const link = mount(<Link url="MyThing" onClick={spy} />);
    link.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
