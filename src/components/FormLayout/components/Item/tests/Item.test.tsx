import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {TextField} from 'components';

import {Item} from '../Item';

describe('<Item />', () => {
  it('renders its children', () => {
    const children = <TextField onChange={noop} label="test" />;
    const item = mountWithAppProvider(<Item>{children}</Item>);
    expect(item.contains(children)).toBe(true);
  });
});

function noop() {}
