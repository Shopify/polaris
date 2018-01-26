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
    const button = link.find('button').first();
    expect(button.exists()).toBe(true);
  });

  it('renders an anchor if a url is provided', () => {
    const link = mount(<Link url="MyThing" />);
    const a = link.find('a').first();
    expect(a.exists()).toBe(true);
  });
});
