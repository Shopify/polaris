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

  it('renders a button if no url is provided', () => {
    const link = mount(<Link />);
    expect(link.html().indexOf('button')).toEqual(1);
  });

  it('renders an anchor if a url is provided', () => {
    const link = mount(<Link url="MyThing" />);
    expect(link.html().indexOf('a')).toEqual(1);
  });
});
