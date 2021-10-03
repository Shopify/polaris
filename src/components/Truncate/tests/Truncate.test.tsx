import React from 'react';
import {mountWithApp} from 'test-utilities';

import {Truncate} from '../Truncate';

describe('<Truncate />', () => {
  it('renders its children', () => {
    const truncate = mountWithApp(<Truncate>Long text</Truncate>);
    expect(truncate).toContainReactText('Long text');
  });
});
