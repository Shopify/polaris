import * as React from 'react';
import {mountWithAppProvider, trigger} from 'test-utilities';
import Item from '../Item';

describe('<Item />', () => {
  it('handles focus', () => {
    const item = mountWithAppProvider(<Item />);

    trigger(item.childAt(0), 'onFocus');
    expect(item.state().focused).toBe(true);
  });

  it('handles blur', () => {
    const item = mountWithAppProvider(<Item />);

    trigger(item.childAt(0), 'onBlur');

    expect(item.state().focused).toBe(false);
  });
});
