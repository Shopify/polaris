import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {mountWithAppProvider} from 'tests/utilities';
import {TextField} from 'components';
import Item from '../Item';

describe('<Item />', () => {
  it('renders its children', () => {
    const children = <TextField onChange={noop} label="test" />;
    const item = mountWithAppProvider(<Item>{children}</Item>);
    expect(item.contains(children)).toBe(true);
  });
});
