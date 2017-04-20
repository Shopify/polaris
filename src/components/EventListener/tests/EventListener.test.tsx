import * as React from 'react';
import {mount} from 'enzyme';
import EventListener from '..';

describe('<EventListener />', () => {
  it('calls handler when the appropriate event is fired', () => {
    const spy = jest.fn();
    mount(<EventListener event="resize" handler={spy} />);
    window.dispatchEvent(new Event('resize'));
    expect(spy).toHaveBeenCalled();
  });

  it('does not call handler when a different event is fired', () => {
    const spy = jest.fn();
    mount(<EventListener event="click" handler={spy} />);
    window.dispatchEvent(new Event('resize'));
    expect(spy).not.toHaveBeenCalled();
  });

  it('removes listener when unmounted', () => {
    const spy = jest.fn();
    mount(<EventListener event="resize" handler={spy} />).unmount();
    window.dispatchEvent(new Event('resize'));
    expect(spy).not.toHaveBeenCalled();
  });
});
