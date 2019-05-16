import React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import Search from '../Search';

describe('<Search />', () => {
  it('mounts', () => {
    const search = mountWithAppProvider(<Search />);
    expect(search.exists()).toBe(true);
  });

  it('renders its children', () => {
    const search = mountWithAppProvider(<Search>Hello Polaris</Search>);
    expect(search.text()).toContain('Hello Polaris');
  });

  it('calls onDismiss when search is clicked', () => {
    const spy = jest.fn();
    const search = mountWithAppProvider(<Search onDismiss={spy} />);
    search.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
