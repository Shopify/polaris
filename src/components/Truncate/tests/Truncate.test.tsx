import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {Truncate} from '../Truncate';

describe('<Truncate />', () => {
  it('renders its children', () => {
    const truncate = mountWithAppProvider(<Truncate>Long text</Truncate>);
    expect(truncate.contains('Long text')).toBe(true);
  });
});
