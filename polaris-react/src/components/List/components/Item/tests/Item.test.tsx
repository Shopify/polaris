import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Item} from '../Item';

describe('<Item />', () => {
  it('renders its children', () => {
    const item = mountWithApp(<Item>test</Item>);
    expect(item).toContainReactText('test');
  });

  it('renders an li element', () => {
    const item = mountWithApp(<Item>test</Item>);
    expect(item).toContainReactComponent('li');
  });
});
