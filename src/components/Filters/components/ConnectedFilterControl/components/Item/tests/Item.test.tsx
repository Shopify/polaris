import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider, trigger} from 'test-utilities/legacy';

import {Item} from '../Item';

describe('<Item />', () => {
  it('handles focus', () => {
    const item = mountWithAppProvider(<Item />);

    trigger(item.find('div'), 'onFocus');

    expect(item.find('div').hasClass('Item-focused')).toBe(true);
  });

  it('handles blur', () => {
    const item = mountWithAppProvider(<Item />);

    trigger(item.find('div'), 'onBlur');

    expect(item.find('div').hasClass('Item-focused')).toBe(false);
  });
});
