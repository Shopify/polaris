import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Box} from '../../Box';
import {Divider} from '../Divider';

describe('<Divider />', () => {
  it('renders with style', () => {
    const divider = mountWithApp(<Divider border="dark" />);

    expect(divider).toContainReactComponent(Box, {
      borderBlockStart: 'dark',
    });
  });

  it('renders with width', () => {
    const divider = mountWithApp(<Divider width="5" />);

    expect(divider).toContainReactComponent(Box, {
      borderBlockStartWidth: '5',
    });
  });
});
